const $ = (id) => document.getElementById(id);
const api = '/api/patients';
let patients = [], delId = null;

$('today').textContent = new Date().toLocaleDateString('en-PH', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
function toast(msg) { const t = $('toast'); t.textContent = msg; t.classList.add('show'); setTimeout(() => t.classList.remove('show'), 2200); }

async function loadStats() {
  const s = await (await fetch('/api/stats')).json();
  const pct = (n) => (s.total ? (n / s.total) * 100 : 0);
  $('stats').innerHTML = `
    <div class="stat hero"><span>Total patients</span><b>${s.total}</b>
      <div class="bar"><i style="width:${pct(s.active)}%;background:#fff"></i><i style="width:${pct(s.followup)}%;background:var(--latte)"></i><i style="width:${pct(s.discharged)}%;background:#4a6a2c"></i></div></div>
    <div class="stat"><span>Active</span><b>${s.active}</b></div>
    <div class="stat"><span>Follow-up</span><b>${s.followup}</b></div>
    <div class="stat"><span>Seen today</span><b>${s.today}</b></div>`;
}

async function loadPatients() {
  const qs = new URLSearchParams({ search: $('q').value, status: $('f').value });
  patients = await (await fetch(`${api}?${qs}`)).json();
  $('rows').innerHTML = patients.map((p) => `
    <tr>
      <td><b>${esc(p.full_name)}</b><small>${esc(p.gender)}${p.address ? ' · ' + esc(p.address) : ''}</small></td>
      <td>${p.age}</td><td>${esc(p.phone) || '-'}</td><td>${esc(p.diagnosis) || '-'}</td>
      <td><span class="pill ${p.status}">${p.status}</span></td><td>${p.visit_date}</td>
      <td><div class="row-actions"><button onclick="openForm(${p.id})">Edit</button><button class="rm" onclick="askDelete(${p.id})">Delete</button></div></td>
    </tr>`).join('');
  $('empty').hidden = patients.length > 0;
}
const refresh = () => Promise.all([loadStats(), loadPatients()]);

function openForm(id) {
  const p = patients.find((x) => x.id === id) || { status: 'Active', gender: 'Female', visit_date: new Date().toISOString().slice(0, 10) };
  $('dlgTitle').textContent = id ? 'Edit patient' : 'Add patient';
  $('id').value = id || '';
  ['full_name', 'age', 'gender', 'phone', 'address', 'diagnosis', 'status', 'visit_date'].forEach((k) => ($(k).value = p[k] ?? ''));
  $('err').hidden = true;
  $('dlg').showModal();
}

$('addBtn').onclick = () => openForm();
$('cancel').onclick = () => $('dlg').close();

$('form').onsubmit = async (e) => {
  e.preventDefault();
  const id = $('id').value;
  const body = {};
  ['full_name', 'age', 'gender', 'phone', 'address', 'diagnosis', 'status', 'visit_date'].forEach((k) => (body[k] = $(k).value));
  const res = await fetch(id ? `${api}/${id}` : api, {
    method: id ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
  });
  if (!res.ok) { const d = await res.json(); $('err').textContent = d.error; $('err').hidden = false; return; }
  $('dlg').close(); toast(id ? 'Patient updated' : 'Patient added'); refresh();
};

function askDelete(id) {
  delId = id;
  $('delMsg').textContent = `${patients.find((p) => p.id === id).full_name} will be removed from your records.`;
  $('del').showModal();
}
$('delNo').onclick = () => $('del').close();
$('delYes').onclick = async () => {
  await fetch(`${api}/${delId}`, { method: 'DELETE' });
  $('del').close(); toast('Patient deleted'); refresh();
};

let timer;
$('q').oninput = () => { clearTimeout(timer); timer = setTimeout(loadPatients, 250); };
$('f').onchange = loadPatients;
refresh();
