const Appointment = require('../models/Appointment');
const redis = require('../config/redis');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
});

exports.book = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;
    const id = await Appointment.create({ patientId: req.session.userId, doctorId, date, time, reason });
    await redis.del(`appointments:${req.session.userId}`);
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: req.body.email,
      subject: 'Appointment Confirmed!',
      html: `<h3>Your appointment on ${date} at ${time} is confirmed.</h3>`
    }).catch(() => {});
    res.status(201).json({ message: 'Appointment booked successfully', appointmentId: id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMyAppointments = async (req, res) => {
  try {
    const cacheKey = `appointments:${req.session.userId}`;
    const cached = await redis.get(cacheKey);
    if (cached) return res.json(JSON.parse(cached));
    const appointments = await Appointment.findByPatient(req.session.userId);
    await redis.setex(cacheKey, 300, JSON.stringify(appointments));
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll();
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    await Appointment.updateStatus(req.params.id, req.body.status);
    res.json({ message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
