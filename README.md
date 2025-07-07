# ERP Student Management System

A full-stack ERP system for managing students, attendance, and library modules. Built with:

- 🧠 Backend: Spring Boot (Java)
- 🎨 Frontend: React + Vite + Tailwind CSS
- 🛡️ Authentication: JWT with Role-based access (Admin & Student)

## 📁 Folder Structure

ERP-Student-Management-System/
├── student-management-backend/ # Spring Boot backend
└── student-management-frontend/ # React frontend

## 🚀 Features

### 👨‍🏫 Admin Features
- Secure login (JWT + Spring Security)
- Manage Students (Add, Edit, Delete)
- Attendance marking with course & department filtering
- View attendance reports
- Issue and return library books

### 🎓 Student Features
- Login with credentials given by admin
- View attendance reports
- View profile and notifications
- Responsive dashboard UI

---

## 🛠️ How to Run

### Backend (Spring Boot)
cd student-management-backend
./mvnw spring-boot:run

### Frontend (React)
cd student-management-frontend
npm install
npm run dev

