# 📚 E-Learning Dashboard

A Full-Stack Learning Management System (LMS) for Online Courses

# 🚀 Overview

E-Learning Dashboard is a full-stack web application designed to facilitate online learning. It allows users to browse courses, enroll, track progress, and take quizzes. The platform supports role-based access, enabling students to enroll in courses and admins to manage content efficiently.

## ✨ Features

✅ User Authentication & Authorization

- Secure JWT-based authentication.

- Role-based access control (Admin & Student).

✅ Course Management

- Admins can create, update, and delete courses.

- Students can enroll & track progress.

✅ Quiz & Assessment System

- Each course includes interactive quizzes.

- Tracks quiz responses & performance.

✅ User Profiles & Dashboard

- Users ("Admin") can update their profile & password on Admin Dashboard.

- Students can view their enrolled courses & progress.

✅ Admin Panel

- Admins can manage users, courses, and enrollments.

✅ Modern UI/UX

- Built with React.js & Bootstrap for a clean and responsive interface.

## 🛠️ Tech Stack

### 🌐 Frontend

- React.js with React Router

- Redux for state management

- Bootstrap & Styled Components

### 🔥 Backend

- ASP.NET Core Web API

- Entity Framework Core (EF Core) for ORM

- JWT Authentication

### 🗄️ Database

- Microsoft SQL Server

### 🛠 Development Tools

- Swagger and Postman for API testing

- Visual Studio & VS Code

- Git & GitHub for version control

## 📂 Project Structure

```bash
/FullStackApp
│── /client (React Frontend)
│ ├── /public
│ ├── /src
│ │ ├── /components
│ │ ├── /pages 
│ │ ├── /store (Redux Store)
│ │ ├── /services (API Calls)
│ | ├── /routes
| │ ├── /styles
│ │ ├── App.js
│ │ ├── index.js
│ └── package.json
│
│── /server (ASP.NET Core API)
│ ├── /Controllers
│ ├── /Models
│ ├── /Data (Database Context)
│ ├── /Services
│ ├── /Middleware
│ ├── appsettings.json
│ ├── /DTOs
│ ├── Program.cs
│ └── server.sln
│
│── /database
│ ├── setup.sql (DB Schema and Seed Data)

## 🏗️ Installation & Setup

**🔹 1. Clone the Repository**

```bash
git clone https://github.com/Ash1912/E-Learning-Dashboard.git
cd E-Learning-Dashboard
```

**🔹 2. Backend Setup**

```bash
cd server
# Install .NET dependencies
dotnet restore
# Run the API
dotnet run
```

**🔹 3. Database Setup**

- Update connection string in appsettings.json

- Apply migrations:

```bash
dotnet ef add-migration
dotnet ef database update
```

**🔹 4. Frontend Setup**

```bash
cd client
npm install  # Install dependencies
npm start    # Run React app
```

## 🎯 API Endpoints

### 🔹Authentication

1. POST -> /api/Auth/register -> Register new user

2. POST -> /api/Auth/login -> Login existing user

### 🔹Courses

1. GET -> /api/Course -> Get all Courses

2. POST -> /api/Course -> Admin can add courses

3. GET -> /api/Course/{id} -> Get courses by id

4. PUT -> /api/Course/{id} -> Admin can update courses

5. DELETE -> /api/Course/{id} -> Admin can delete courses

### 🔹Enrollment

1. POST -> /api/Enrollment/toggle-enrollment -> Enroll/Unenroll in a course

2. GET -> /api/Enrollment/{userId} -> Get enrollment according to user id

3. PUT -> /api/Enrollment/update-progress -> Update progress for enrolled user

### 🔹Quiz

1. GET -> /api/Quiz/{courseId} -> Get all Quiz according to course

2. POST -> /api/Quiz/submit -> Submit answer to record response

### 🔹User

1. GET -> /api/User/all -> Get all users on admin profile page

2. GET -> /api/User/{userId} -> Get user by id

3. PUT -> /api/User/update -> Update user

### 🔐 Role-Based Access Control

1. Admin Role : Full CRUD on courses, view users detail and update user details

2. Student Role : Enroll in courses & track progress

## 📸 Screenshots

### 🚀 Screenshots of Key Features

## 🎯 Future Enhancements

- Implement video streaming.
- Add live chat & discussion forums.
- Enable certificate generation after course completion.

## 👨‍💻 Contributors

🔹**Ashish Kumar Mishra**

- Open to contributions! Feel free to fork & contribute.

## 📝 License

This project is open-source under the MIT License.