const express = require('express');
const router = express.Router();
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const db = require('../config/db');

router.get('/dashboard', isAuthenticated, isAdmin, async (req, res) => {
  try {
    const [[{ total }]] = await db.execute('SELECT COUNT(*) as total FROM appointments');
    const [[{ pending }]] = await db.execute('SELECT COUNT(*) as pending FROM appointments WHERE status="pending"');
    const [[{ patients }]] = await db.execute('SELECT COUNT(*) as patients FROM users WHERE role="patient"');
    const [[{ doctors }]] = await db.execute('SELECT COUNT(*) as doctors FROM doctors');
    res.json({ total, pending, patients, doctors });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
