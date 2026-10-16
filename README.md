# Warrior Fitness API

**Node.js | Express.js | PostgreSQL | Prisma ORM | JWT | REST API | Render**

A deployed RESTful backend application for managing workouts, personalized training plans, and fitness progress. Built with Node.js, Express, PostgreSQL, and Prisma ORM, the API supports secure user authentication, role-based authorization, relational data management, and user-specific access controls.

**[Live API](https://warrior-fitness-service.onrender.com) | [Interactive API Documentation](https://warrior-fitness-service.onrender.com/api-docs) | [GitHub Repository](https://github.com/cpericli/warrior-fitness-api)**

## Overview

Warrior Fitness API is a backend fitness management system that allows users to browse workouts, create personalized training plans, schedule exercises, and track completed workouts.

The application follows a layered architecture that separates HTTP routing, request validation, business logic, and database operations. It uses JWT authentication to protect endpoints and role-based authorization to restrict administrative operations.

The backend is deployed on Render, with interactive Swagger documentation available for exploring and testing API endpoints.

## Key Features

- **Authentication:** User registration and login with JSON Web Tokens (JWT) and bcrypt password hashing.
- **Role-Based Authorization:** Admin and cadet roles with restricted workout management permissions.
- **Workout Management:** Create, retrieve, update, and delete workouts with categories, difficulty levels, and durations.
- **Personalized Training Plans:** Create and manage multi-workout training plans with scheduled exercise days.
- **Fitness Progress Tracking:** Record completed workouts, completion dates, and personal notes.
- **Resource Ownership:** Restrict users to accessing and modifying their own training plans and progress records.
- **Request Validation:** Validate incoming requests and return appropriate HTTP error responses.
- **Interactive Documentation:** Explore and test endpoints through Swagger UI.
- **Cloud Deployment:** Publicly deployed REST API hosted on Render.

## Live Demo

The API is deployed on Render and includes interactive Swagger documentation.

**Live API:** https://warrior-fitness-service.onrender.com

**Swagger UI:** https://warrior-fitness-service.onrender.com/api-docs

Swagger UI allows users to explore endpoints, submit JSON requests, view API responses, and test authenticated operations using JWT bearer tokens.

Some endpoints require authentication, and workout creation, updates, and deletion require administrative permissions.

## System Architecture

```text
                  HTTP Client
                       |
                       v
                 Express Router
                       |
                       v
                    Middleware
             Authentication (JWT)
             Authorization (RBAC)
              Request Validation
                       |
                       v
                   Controllers
                Request Handling
                       |
                       v
                    Services
                 Business Logic
                Ownership Checks
                       |
                       v
                  Repositories
                 Database Access
                       |
                       v
                   Prisma ORM
                       |
                       v
                PostgreSQL Database

             Hosted on Render
```

### Layered Design

| Layer | Responsibility |
|---|---|
| Routes | Define REST endpoints and associate middleware |
| Middleware | Authenticate users, enforce permissions, and validate requests |
| Controllers | Process HTTP requests and construct responses |
| Services | Implement business logic and resource ownership rules |
| Repositories | Execute database operations through Prisma |
| Database | Persist relational application data |

Separating these responsibilities improves maintainability, reduces coupling, and makes individual components easier to modify and test.

## Technology Stack

| Technology | Purpose |
|---|---|
| JavaScript | Backend application development |
| Node.js | Server-side JavaScript runtime |
| Express.js | REST API framework |
| PostgreSQL | Relational database |
| Prisma ORM | Database access, schema management, and migrations |
| JWT | Token-based authentication |
| bcrypt | Secure password hashing |
| express-validator | Request validation |
| Swagger UI / OpenAPI | Interactive API documentation |
| Render | Cloud application deployment |
| Morgan | HTTP request logging |
| ESLint / Prettier | Code formatting and quality |

## Database Design

The application uses PostgreSQL with Prisma ORM to manage relational data across five primary models.

| Model | Description |
|---|---|
| User | Stores user accounts, credentials, and roles |
| Workout | Stores exercises and workout information |
| WorkoutPlan | Stores personalized training plans associated with users |
| PlanWorkout | Associates workouts with training plans and scheduled days |
| ProgressEntry | Tracks completed workouts and user progress |

### Database Relationships

- **User → WorkoutPlan:** One-to-many. Each user can create multiple training plans.
- **User → ProgressEntry:** One-to-many. Each user can record multiple completed workouts.
- **WorkoutPlan ↔ Workout:** Many-to-many through the PlanWorkout junction table.
- **Workout → ProgressEntry:** One-to-many. Each workout can have multiple completion records.

The relational design supports reusable workouts across multiple training plans while maintaining user-specific ownership of plans and progress records.

Prisma manages database relationships and supports transactional operations for updates involving related records.

## API Endpoints

The API exposes endpoints for authentication, workout management, training plans, and progress tracking.

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/api/auth/signup` | Register a user | Public |
| POST | `/api/auth/login` | Authenticate and receive a JWT | Public |

### Workouts

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/workouts` | Retrieve workouts | Authenticated |
| GET | `/api/workouts/:id` | Retrieve a workout | Authenticated |
| POST | `/api/workouts` | Create a workout | Admin |
| PUT | `/api/workouts/:id` | Update a workout | Admin |
| DELETE | `/api/workouts/:id` | Delete a workout | Admin |

### Training Plans

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/plans` | Retrieve user's plans | Authenticated |
| GET | `/api/plans/:id` | Retrieve a specific plan | Owner |
| POST | `/api/plans` | Create a training plan | Authenticated |
| PUT | `/api/plans/:id` | Update a training plan | Owner |
| DELETE | `/api/plans/:id` | Delete a training plan | Owner |

### Progress Tracking

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/api/progress` | Retrieve user's progress | Authenticated |
| GET | `/api/progress/:id` | Retrieve a progress entry | Owner |
| POST | `/api/progress` | Record a completed workout | Authenticated |
| PUT | `/api/progress/:id` | Update a progress entry | Owner |
| DELETE | `/api/progress/:id` | Delete a progress entry | Owner |

Additional endpoints:

- `GET /health` — API health status
- `GET /api-docs` — Interactive Swagger documentation

## Authentication and Authorization

The API implements JWT authentication and role-based access control.

### Authentication Flow

1. A user registers with their name, email, and password.
2. The password is hashed using bcrypt before storage.
3. The user logs in with their credentials.
4. Successful authentication returns a signed JWT.
5. Protected endpoints require the JWT in the Authorization header.
6. Middleware verifies the token before allowing access to protected resources.

Example authorization header:

```http
Authorization: Bearer <JWT_TOKEN>
```

### Role-Based Access Control

The application supports two roles:

- **Admin:** Can create, update, delete, and retrieve workouts.
- **Cadet:** Can browse workouts and manage personal training plans and progress records.

### Resource Ownership

Training plans and progress entries are associated with individual users.

Ownership checks prevent users from viewing, updating, or deleting resources belonging to another account, including when the requesting user has an administrative role.

This separates global workout administration from user-specific data access.

## Example API Requests

### 1. Register a User

**POST `/api/auth/signup`**

```json
{
  "name": "Test Cadet",
  "email": "testcadet@example.com",
  "password": "ExamplePassword123"
}
```

**Successful response:** `201 Created`

The API returns the new user's account information, including their assigned role and user ID.

### 2. Authenticate a User

**POST `/api/auth/login`**

```json
{
  "email": "testcadet@example.com",
  "password": "ExamplePassword123"
}
```

**Successful response:** `200 OK`

```json
{
  "message": "Login successful",
  "token": "<JWT_TOKEN>"
}
```

### 3. Create a Training Plan

**POST `/api/plans`**

Requires JWT authentication.

```json
{
  "title": "PFA Prep Plan",
  "goal": "Improve run time and push-ups",
  "duration_weeks": 4,
  "workouts": [
    {
      "workout_id": 1,
      "day_number": 1
    },
    {
      "workout_id": 2,
      "day_number": 2
    }
  ]
}
```

**Successful response:** `201 Created`

The API creates the training plan, associates it with the authenticated user, and links the selected workouts through the PlanWorkout relationship.

Workout IDs must reference existing records.

### 4. Record Workout Progress

**POST `/api/progress`**

Requires JWT authentication.

```json
{
  "workout_id": 1,
  "date_completed": "2026-04-28",
  "notes": "Completed the workout and felt good"
}
```

**Successful response:** `201 Created`

The API creates a progress entry associated with the authenticated user and the referenced workout.

## Testing and Validation

Developed a comprehensive manual API testing plan using Swagger UI to validate endpoint functionality, input validation, authentication, authorization, and resource ownership.

The documented test plan covers authentication, workout management, training plans, and progress tracking, including both successful requests and expected failure scenarios.

### Test Coverage

| Category | Validated Scenarios |
|---|---|
| Authentication | Successful registration and login, invalid credentials, duplicate accounts |
| Input Validation | Missing fields, invalid identifiers, invalid dates, empty workout lists |
| Authorization | Admin-only operations, unauthorized requests, insufficient permissions |
| Resource Ownership | Preventing access to another user's plans and progress |
| Workout Management | Create, retrieve, update, and delete operations |
| Training Plans | Plan creation, updates, deletion, and workout associations |
| Progress Tracking | Recording, retrieving, modifying, and deleting progress |
| Error Handling | Missing resources and invalid requests |

### HTTP Response Codes

| Status | Meaning |
|---|---|
| 200 OK | Successful retrieval, update, or deletion |
| 201 Created | Resource successfully created |
| 400 Bad Request | Invalid or missing request data |
| 401 Unauthorized | Missing or invalid authentication |
| 403 Forbidden | Insufficient permissions or resource ownership |
| 404 Not Found | Requested resource does not exist |
| 409 Conflict | Duplicate account registration |

The manual testing plan documents expected requests and responses for these scenarios.

**Testing Method:** Manual endpoint testing using Swagger UI and documented request/response cases.

Automated unit and integration tests are not currently included.

## Engineering Highlights

### RESTful API Design

Implemented resource-oriented endpoints using standard HTTP methods, JSON request/response formats, and meaningful HTTP status codes.

### Authentication and Security

Integrated JWT authentication, bcrypt password hashing, role-based authorization, and resource ownership checks to protect user accounts and application data.

### Relational Database Modeling

Designed a PostgreSQL schema with one-to-many and many-to-many relationships, including a junction table for associating reusable workouts with training plans.

### Transactional Operations

Used Prisma transactions to coordinate updates involving training plans and associated workouts, supporting consistent changes across related records.

### Separation of Concerns

Organized the application into routes, controllers, services, repositories, and middleware to isolate responsibilities and improve code maintainability.

### Cloud Deployment and Documentation

Deployed the backend API to Render and integrated OpenAPI/Swagger documentation, allowing external users to explore and test the application without configuring a local development environment.

### API Testing

Documented successful and unsuccessful request scenarios across authentication, CRUD operations, input validation, authorization, and user-specific resource access.

## Local Setup

### Prerequisites

- Node.js
- npm
- PostgreSQL
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/cpericli/warrior-fitness-api.git
cd warrior-fitness-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root.

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/warrior_fitness"
JWT_SECRET="replace-with-a-secure-random-secret"
JWT_EXPIRES_IN="1h"
PORT=3000
```

Update the database connection string and JWT secret for your environment.

Never commit credentials, JWT secrets, or production environment files to GitHub.

### 4. Generate Prisma Client and Apply Migrations

```bash
npx prisma generate
npm run migrate:deploy
```

### 5. Start the Application

```bash
npm run dev
```

The local API is available at:

```text
http://localhost:3000
```

Interactive API documentation:

```text
http://localhost:3000/api-docs
```

Health endpoint:

```text
http://localhost:3000/health
```

### 6. Optional Development Seed Data

```bash
npm run seed:dev
```

Use the development seed script only with a database intended for testing.

## Project Structure

```text
warrior-fitness-api/
├── docs/
│   └── openapi.yaml
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.js
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── repositories/
│   ├── routes/
│   ├── services/
│   └── server.js
├── prisma.config.ts
├── package.json
└── README.md
```

## Future Improvements

- Implement automated unit and integration tests using Jest or Vitest and Supertest.
- Configure GitHub Actions for automated testing and continuous integration.
- Add Docker support for reproducible local development.
- Enhance structured error logging and monitoring.
- Expand API functionality with workout analytics and progress reporting.

## Project Status

**Deployed backend application with interactive API documentation.**

Implemented features include JWT authentication, role-based access control, workout management, personalized training plans, fitness progress tracking, PostgreSQL persistence, and manual API testing.

The application is publicly hosted on Render, and its endpoints are documented through Swagger UI.

---

**Developed by Chris Pericli**

[GitHub](https://github.com/cpericli/warrior-fitness-api) | [Live API](https://warrior-fitness-service.onrender.com) | [Swagger Documentation](https://warrior-fitness-service.onrender.com/api-docs)
