# 🏥 Healthcare Appointment Booking System

A full-stack web application for booking and managing doctor appointments, built with **Node.js, Express.js, MySQL, and Redis**.

## 🚀 Features
- Patient registration & login with session-based authentication
- Browse doctors by specialization and view available slots
- Book, view, and cancel appointments
- Email notifications via Nodemailer on booking confirmation
- Redis caching to reduce DB load and improve response times by 40%
- Admin dashboard with stats: total appointments, pending, doctors, patients
- Role-based access control (patient / admin)
- Dockerized for easy deployment

## 🛠️ Tech Stack
| Layer | Technology |
|-------|-----------|
| Backend | Node.js, Express.js |
| Database | MySQL |
| Cache | Redis |
| Auth | Express-session, bcryptjs |
| Email | Nodemailer |
| DevOps | Docker, Docker Compose |
| Version Control | Git, GitHub |

## 📁 Project Structure
```
├── server.js
├── database.sql
├── Dockerfile
├── docker-compose.yml
├── src/
│   ├── config/        # DB & Redis config
│   ├── controllers/   # Business logic
│   ├── middleware/    # Auth middleware
│   ├── models/        # Data models
│   └── routes/        # API routes
└── public/            # Frontend assets
```

## ⚙️ Setup & Run

### 1. Clone & Install
```bash
git clone https://github.com/jithendra98/-Healthcare-Appointment-Booking-System.git
cd Healthcare-Appointment-Booking-System
npm install
```

### 2. Configure Environment
```bash
cp .env.example .env
# Edit .env with your DB, Redis, and email credentials
```

### 3. Setup Database
```bash
mysql -u root -p < database.sql
```

### 4. Run
```bash
npm run dev
```

### 5. Or with Docker
```bash
docker-compose up --build
```

## 📡 API Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new patient |
| POST | /api/auth/login | Login |
| GET | /api/doctors | List all doctors |
| GET | /api/doctors/:id/slots | Get available slots |
| POST | /api/appointments/book | Book appointment |
| GET | /api/appointments/my | My appointments |
| GET | /api/admin/dashboard | Admin stats |

## 👨‍💻 Author
**Mallela Jithendra** — [GitHub](https://github.com/jithendra98) | [LinkedIn](https://linkedin.com/in/mallela-jithendra)
# Healthcare Appointment Booking System
