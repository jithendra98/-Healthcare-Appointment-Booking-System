const express = require('express');
const router = express.Router();
const { book, getMyAppointments, getAllAppointments, updateStatus } = require('../controllers/appointmentController');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

router.post('/book', isAuthenticated, book);
router.get('/my', isAuthenticated, getMyAppointments);
router.get('/all', isAuthenticated, isAdmin, getAllAppointments);
router.put('/:id/status', isAuthenticated, isAdmin, updateStatus);

module.exports = router;
