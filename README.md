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
/E-Learning-Dashboard
│── /fullstackapp.client (React Frontend)
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
│── /FullStackApp.Server (ASP.NET Core API)
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
│── /FullStackApp.Database
│ ├── setup.sql (DB Schema and Seed Data)
```

## 🏗️ Installation & Setup

**🔹 1. Clone the Repository**

```bash
git clone https://github.com/Ash1912/E-Learning-Dashboard.git
cd E-Learning-Dashboard
```

**🔹 2. Backend Setup**

```bash
cd FullStackApp.Server
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
cd fullstackapp.client
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

1. For Admin Role 

![image](https://github.com/user-attachments/assets/0e39fc68-66e7-4b4c-bd25-3f79425a4962)

![image](https://github.com/user-attachments/assets/852a301a-68b2-48f4-ab0b-af632b010bbd)

![image](https://github.com/user-attachments/assets/2901eb87-1293-45bb-9e83-fed2945349d1)

![image](https://github.com/user-attachments/assets/759f48e4-359f-4f2a-bf09-b8c518bb923a)

![image](https://github.com/user-attachments/assets/e776b105-e3fb-4284-975c-ad9c1cdb49b4)

![image](https://github.com/user-attachments/assets/7fb6c075-d70d-4199-bf74-203ddbb8bc7c)

![image](https://github.com/user-attachments/assets/e1d671a0-50da-4ae4-825e-ddcb38b51047)

![image](https://github.com/user-attachments/assets/87f43464-eaec-4366-9ac6-2e8b8e1cbd11)

![image](https://github.com/user-attachments/assets/33f16358-ec96-4850-b38a-43fca4553d98)

![image](https://github.com/user-attachments/assets/ab94ebf4-b6b4-4097-9eb0-c3a53b7297cb)

2. For Student Role

![image](https://github.com/user-attachments/assets/89c91dae-e1ae-4fba-b0c9-180859e3290a)

![image](https://github.com/user-attachments/assets/d7f35cff-b7c5-4aab-89fe-bb6ad8c7998f)

![image](https://github.com/user-attachments/assets/acfec3f0-8f5a-42ce-b321-7cb03992b554)

## 🎯 Future Enhancements

- Implement video streaming.
- Add live chat & discussion forums.
- Enable certificate generation after course completion.

## 👨‍💻 Contributors

🔹**Ashish Kumar Mishra**

- Open to contributions! Feel free to fork & contribute.

## 📝 License

This project is open-source under the MIT License.
