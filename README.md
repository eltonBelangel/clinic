# Clinic Patient Records Dashboard

A web dashboard for managing clinic patient records, with full **CRUD** (Create, Read, Update, Delete), live summary cards, search, and status filtering.

**Stack:** Node.js, Express.js, MySQL (`mysql2`), HTML, CSS, JavaScript

## Features
- Add, view, edit, and delete patient records
- Dashboard summary: total patients, active, follow-up, seen today
- Search by name, diagnosis, or phone number
- Filter by status (Active, Follow-up, Discharged)
- Server-side validation and clear error messages
- Responsive layout with a green color theme

## Project structure
```
clinic-patient-records-dashboard/
├── database/
│   ├── schema.sql          # Table definition
│   └── seed.sql            # Sample patients
├── public/                 # Frontend
│   ├── index.html
│   ├── style.css
│   └── app.js
├── scripts/
│   └── seed.js             # npm run seed
├── src/
│   ├── config/db.js        # MySQL connection and auto setup
│   ├── middleware/
│   │   └── validatePatient.js
│   ├── routes/
│   │   ├── patients.js     # CRUD endpoints
│   │   └── stats.js        # Dashboard summary
│   ├── app.js              # Express app
│   └── server.js           # Entry point
├── .env.example
├── package.json
└── README.md
```

## Getting started

### Prerequisites
- Node.js 18 or newer
- MySQL Server running locally (MySQL Server, XAMPP, etc.)

### Installation
```bash
npm install
cp .env.example .env      # Windows: copy .env.example .env
```
Open `.env` and set your MySQL password.

### Run
```bash
npm start
```
Open http://localhost:3000. The database and table are created automatically on first run.

### Optional: load sample data
```bash
npm run seed
```

## API reference
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/patients?search=&status=` | List patients |
| POST | `/api/patients` | Create a patient |
| PUT | `/api/patients/:id` | Update a patient |
| DELETE | `/api/patients/:id` | Delete a patient |
| GET | `/api/stats` | Dashboard summary |
| GET | `/api/health` | Health check |

### Example request body
```json
{
  "full_name": "Maria Santos",
  "age": 34,
  "gender": "Female",
  "phone": "0917-555-0101",
  "address": "Jaro, Iloilo City",
  "diagnosis": "Hypertension",
  "status": "Follow-up",
  "visit_date": "2026-11-06"
}
```

## Database schema
Table `patients`: `id`, `full_name`, `age`, `gender`, `phone`, `address`, `diagnosis`, `status`, `visit_date`, `created_at`.

## License
MIT
