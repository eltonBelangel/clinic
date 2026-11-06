const GENDERS = ['Female', 'Male', 'Other'];
const STATUSES = ['Active', 'Follow-up', 'Discharged'];

/** Validates the request body and attaches clean values to req.patient. */
module.exports = function validatePatient(req, res, next) {
  const b = req.body || {};
  const age = parseInt(b.age, 10);

  if (!b.full_name || !b.full_name.trim()) return res.status(400).json({ error: 'Full name is required.' });
  if (!Number.isInteger(age) || age < 0 || age > 130) return res.status(400).json({ error: 'Enter a valid age (0 to 130).' });
  if (!GENDERS.includes(b.gender)) return res.status(400).json({ error: 'Choose a gender.' });
  if (!STATUSES.includes(b.status)) return res.status(400).json({ error: 'Choose a status.' });
  if (!b.visit_date) return res.status(400).json({ error: 'Visit date is required.' });

  req.patient = [
    b.full_name.trim(), age, b.gender, b.phone || null,
    b.address || null, b.diagnosis || null, b.status, b.visit_date,
  ];
  next();
};
