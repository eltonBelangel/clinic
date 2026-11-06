const express = require('express');
const { getPool } = require('../config/db');

const router = express.Router();

// Dashboard summary numbers
router.get('/', async (req, res, next) => {
  try {
    const [[t]] = await getPool().query(`SELECT
        COUNT(*) AS total,
        SUM(status = 'Active') AS active,
        SUM(status = 'Follow-up') AS followup,
        SUM(status = 'Discharged') AS discharged,
        SUM(visit_date = CURDATE()) AS today
      FROM patients`);
    res.json({
      total: +t.total,
      active: +(t.active || 0),
      followup: +(t.followup || 0),
      discharged: +(t.discharged || 0),
      today: +(t.today || 0),
    });
  } catch (err) { next(err); }
});

module.exports = router;
