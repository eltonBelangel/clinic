const express = require('express');
const { getPool } = require('../config/db');
const validatePatient = require('../middleware/validatePatient');

const router = express.Router();

// READ: list patients (optional ?search= and ?status=)
router.get('/', async (req, res, next) => {
  try {
    const { search = '', status = '' } = req.query;
    const like = `%${search}%`;
    let sql = `SELECT id, full_name, age, gender, phone, address, diagnosis, status,
                      DATE_FORMAT(visit_date, '%Y-%m-%d') AS visit_date
               FROM patients
               WHERE (full_name LIKE ? OR diagnosis LIKE ? OR phone LIKE ?)`;
    const params = [like, like, like];
    if (status) { sql += ' AND status = ?'; params.push(status); }
    sql += ' ORDER BY visit_date DESC, id DESC';
    const [rows] = await getPool().query(sql, params);
    res.json(rows);
  } catch (err) { next(err); }
});

// CREATE
router.post('/', validatePatient, async (req, res, next) => {
  try {
    const [result] = await getPool().query(
      `INSERT INTO patients (full_name, age, gender, phone, address, diagnosis, status, visit_date)
       VALUES (?,?,?,?,?,?,?,?)`, req.patient);
    res.status(201).json({ id: result.insertId });
  } catch (err) { next(err); }
});

// UPDATE
router.put('/:id', validatePatient, async (req, res, next) => {
  try {
    const [result] = await getPool().query(
      `UPDATE patients SET full_name=?, age=?, gender=?, phone=?, address=?, diagnosis=?,
              status=?, visit_date=? WHERE id=?`, [...req.patient, req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Patient not found.' });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

// DELETE
router.delete('/:id', async (req, res, next) => {
  try {
    const [result] = await getPool().query('DELETE FROM patients WHERE id=?', [req.params.id]);
    if (!result.affectedRows) return res.status(404).json({ error: 'Patient not found.' });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

module.exports = router;
