const express = require('express');
const router = express.Router();
const db = require('../config/db');
const redis = require('../config/redis');

router.get('/', async (req, res) => {
  try {
    const cached = await redis.get('doctors:all');
    if (cached) return res.json(JSON.parse(cached));
    const [rows] = await db.execute('SELECT * FROM doctors WHERE is_active = 1');
    await redis.setex('doctors:all', 600, JSON.stringify(rows));
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id/slots', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT * FROM slots WHERE doctor_id = ? AND is_booked = 0 AND slot_date >= CURDATE()',
      [req.params.id]
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
