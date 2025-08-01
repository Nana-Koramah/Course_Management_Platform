# Course_Management_Platform

This is the backend API for the **Course Management Platform**, developed using Node.js, Express.js, Sequelize ORM, MySQL, and Redis. It supports multiple modules including Course Allocation, Facilitator Activity Tracking, and Student Reflections. The system uses JWT authentication and provides role-based access control for managers, facilitators, and students.

---

##  Features

- ✅ JWT-based Authentication with Role Management (Manager, Facilitator, Student)
- ✅ RESTful API architecture with filtering, pagination, and sorting
- ✅ Course Allocation System with facilitator-module assignments
- ✅ Facilitator Activity Tracker (FAT) with weekly Redis-powered notifications
- ✅ Student Reflection system
- ✅ Sequelize ORM with MySQL integration
- ✅ Redis queue for task scheduling and reminders
- ✅ Unit Testing with Jest
- ✅ Swagger API Documentation

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/your-username/course-management-platform.git
cd course-management-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=course_management
DB_DIALECT=mysql

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

REDIS_HOST=127.0.0.1
REDIS_PORT=6379
```

### 4. Create and migrate the database

Ensure MySQL is running. Then run:

```sql
CREATE DATABASE course_management;
```

Run Sequelize migrations:

```bash
npx sequelize-cli db:migrate
```

### 5. Start the development server

```bash
npm start
```

---

## Database Schema Overview

The system uses Sequelize models to manage relational data. Key entities include:

- **User** – Stores basic auth info (name, email, password, role)
- **Manager** – Extended profile info for managers (FK: `userId`)
- **Facilitator** – Extended profile info for facilitators (FK: `userId`)
- **Student** – Extended profile info for students (FK: `userId`)
- **Cohort** – Academic grouping of students (intake + trimester)
- **Module** – Academic modules/courses
- **Mode** – Delivery mode of the course (e.g., online, in-person)
- **CourseOffering** – Maps modules to cohorts, facilitators, and modes
- **Class** – Represents a specific class or session instance
- **ActivityTracker** – Facilitator logs for weekly activities
- **Reflection** – Student responses/reflections

---

##  Authentication Flow

The app uses JWT for authentication and Sequelize hooks to link `User` records with their respective role-specific tables.

### Registration

- **Endpoint**: `POST /api/auth/register`
- Creates a `User` and an entry in the appropriate role table (e.g. `Facilitator`)

### Login

- **Endpoint**: `POST /api/auth/login`
- Returns a JWT token on successful authentication

### Protected Routes

- Add `Authorization: Bearer <token>` to headers
- Middleware validates JWT and user role

---

##  Unit Testing with Jest

Run tests using:

```bash
npm test
```

### Currently tested models:

-  `Class`
-  `CourseOffering`
-  `Facilitator`

Tests include validation, creation, and associations.

---

## 🔧 Environment Configuration

| Variable         | Description                            |
|------------------|----------------------------------------|
| `PORT`           | Server port                            |
| `DB_HOST`        | MySQL host                             |
| `DB_USER`        | MySQL user                             |
| `DB_PASSWORD`    | MySQL password                         |
| `DB_NAME`        | Database name                          |
| `JWT_SECRET`     | JWT secret                             |
| `JWT_EXPIRES_IN` | Expiration for JWT access tokens       |
| `REDIS_HOST`     | Redis server hostname or IP            |
| `REDIS_PORT`     | Redis port                             |

---

##  API Modules Overview

| Module                    | Description                                              |
|---------------------------|----------------------------------------------------------|
| Authentication            | User registration, login, and JWT management             |
| Manager                   | Manage modules, cohorts, offerings                       |
| Facilitator               | Submit and manage weekly activity logs                   |
| Student                   | Submit reflections, view assigned modules                |
| Course Allocation System  | Assign facilitators and modules to cohorts               |
| Facilitator Tracker (FAT) | Monitors facilitator logs and triggers alerts via Redis  |

---

##  API Documentation

Swagger is used to document all endpoints. After running the server, access:

```
http://localhost:5000/api-docs
```
or find swagger.json in the root of the repository

It includes all routes, models, request/response examples, and error messages.

---

##  Redis Notifications & Cron Jobs

Facilitators must submit logs weekly.

- A cron job checks for missing submissions.
- If overdue, Redis queues a task to notify managers.
- Managers receive a list of non-compliant facilitators.

---

##  Contributing

We welcome contributions! To contribute:

1. Fork the repo
2. Create a feature branch
3. Submit a pull request

Please open an issue for bugs or feature suggestions.

---


### Link to the student reflection website
https://nana-koramah.github.io/Course_Management_Platform/ 