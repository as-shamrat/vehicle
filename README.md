# 🚗 Vehicle Rental System

A role-based vehicle rental management system designed for administrators and customers.  
It enables user authentication, vehicle listing, booking, and return tracking — providing an efficient rental workflow.

---

## 🌐 Live Demo

🔗 **Live URL:** https://vehicles-rental-system.vercel.app/  
📌 **Project Name:** Vehicle Rental System

---

## 🛠️ Tech Stack

- **Node.js** – runtime environment
- **TypeScript** – type-safe development
- **Express.js** – backend framework
- **PostgreSQL** – relational database
- **bcrypt** – secure password hashing
- **jsonwebtoken (JWT)** – authentication & authorization

---

## ✨ Features

### 🔹 Authentication

- Register and login using JWT-based authentication
- Secure password hashing with bcrypt

### 🔹 User Roles: Admin & Customer

- Admin:

  - Manage vehicles
  - View/manage users
  - View all bookings
  - Mark returned vehicles

- Customer:
  - Browse and book available vehicles
  - View personal bookings
  - Cancel upcoming bookings

### 🔹 Vehicle Management

- Add, update, delete vehicles (Admin only)
- Public access to view available vehicles
- Vehicle availability dynamically updated based on bookings

### 🔹 Booking Management

- Create booking with price auto-calculation:
  - `total = daily_rate × duration`
- Auto update vehicle status on booking
- Admin can mark returns
- System auto-marks completed rentals as returned

---

## 📌 API Endpoints

---

### 🔐 Auth Routes

| Method | Endpoint              | Access | Description                 |
| ------ | --------------------- | ------ | --------------------------- |
| POST   | `/api/v1/auth/signup` | Public | Register new user account   |
| POST   | `/api/v1/auth/signin` | Public | Login and receive JWT token |

---

### 🚗 Vehicle Routes

| Method | Endpoint                      | Access | Description                                 |
| ------ | ----------------------------- | ------ | ------------------------------------------- |
| POST   | `/api/v1/vehicles`            | Admin  | Add new vehicle                             |
| GET    | `/api/v1/vehicles`            | Public | View all vehicles                           |
| GET    | `/api/v1/vehicles/:vehicleId` | Public | View specific vehicle                       |
| PUT    | `/api/v1/vehicles/:vehicleId` | Admin  | Update vehicle details or availability      |
| DELETE | `/api/v1/vehicles/:vehicleId` | Admin  | Delete vehicle (only if no active bookings) |

---

### 👥 User Routes

| Method | Endpoint                | Access         | Description                                          |
| ------ | ----------------------- | -------------- | ---------------------------------------------------- |
| GET    | `/api/v1/users`         | Admin          | View all users                                       |
| PUT    | `/api/v1/users/:userId` | Admin or Owner | Admin: update any user; Customer: update own profile |
| DELETE | `/api/v1/users/:userId` | Admin          | Delete user (only if no active bookings exist)       |

---

### 📦 Booking Routes

| Method | Endpoint                      | Access            | Description                                                                      |
| ------ | ----------------------------- | ----------------- | -------------------------------------------------------------------------------- |
| POST   | `/api/v1/bookings`            | Admin or Customer | Create booking — validates availability, calculates price & marks vehicle booked |
| GET    | `/api/v1/bookings`            | Role-based        | Admin: view all bookings; Customer: view own bookings                            |
| PUT    | `/api/v1/bookings/:bookingId` | Role-based        | Customer: cancel before start; Admin: mark returned                              |

---

## 🚀 Setup & Usage Instructions

### ✔️ Prerequisites

- Node.js & npm
- PostgreSQL database instance

### 🔧 Installation

```bash
git clone <repository-url>
cd vehicles-rental-system
npm install
```

### ⚙️ Environment Variables

Create a `.env` file:

```
PORT=...
DB_CONNECTION_STRING=...
JWT_PRIVATE_KEY=...
```

### ▶️ Run Application

```bash
npm run dev   # development mode
npm run build # production build
npm start     # production mode
```

---

## 📌 Notes

- Admin privileges are required for management actions
- System automatically handles return status after rent period ends

---

## 📄 License

This project is developed for academic/assignment purposes.
