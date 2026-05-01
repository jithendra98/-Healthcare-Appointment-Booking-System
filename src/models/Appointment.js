const db = require('../config/db');

class Appointment {
  static async create({ patientId, doctorId, date, time, reason }) {
    const [result] = await db.execute(
      'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, reason, status) VALUES (?, ?, ?, ?, ?, "pending")',
      [patientId, doctorId, date, time, reason]
    );
    return result.insertId;
  }

  static async findByPatient(patientId) {
    const [rows] = await db.execute(
      `SELECT a.*, d.name as doctor_name, d.specialization 
       FROM appointments a 
       JOIN doctors d ON a.doctor_id = d.id 
       WHERE a.patient_id = ? ORDER BY a.appointment_date DESC`,
      [patientId]
    );
    return rows;
  }

  static async findAll() {
    const [rows] = await db.execute(
      `SELECT a.*, u.name as patient_name, d.name as doctor_name 
       FROM appointments a 
       JOIN users u ON a.patient_id = u.id 
       JOIN doctors d ON a.doctor_id = d.id 
       ORDER BY a.appointment_date DESC`
    );
    return rows;
  }

  static async updateStatus(id, status) {
    await db.execute('UPDATE appointments SET status = ? WHERE id = ?', [status, id]);
  }
}

module.exports = Appointment;
