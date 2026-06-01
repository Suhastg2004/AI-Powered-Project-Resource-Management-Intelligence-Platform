# Core Platform API

**Project:** AI-Powered Project & Resource Management Intelligence Platform

**Module:** Enterprise Backend API (Spring Boot)


## Overview

This repository contains the core Spring Boot backend microservice for the enterprise platform. Operating as the central nervous system of the architecture, this service manages the primary business logic, database transactions, and secure user authentication.

It handles all CRUD operations for projects, sprints, tasks, and resources while acting as the primary orchestration layer. It seamlessly integrates with the Python ML Service (for generating AI-driven project delay risks and analytics) and the Node.js Notification Service (for broadcasting real-time updates to the React client via webhooks).

## Technology Stack

* **Language:** Java 21
* **Framework:** Spring Boot 3.5.0
* **Database:** PostgreSQL
* **ORM:** Spring Data JPA / Hibernate
* **Security:** Spring Security + JSON Web Tokens (JWT)
* **Data Processing:** Apache Commons CSV
* **API Client:** Spring `RestClient` (for cross-service communication)

---

## 📅 Day-by-Day Execution Plan

### Day 1: Foundation & Security Setup

* Initialized the Spring Boot environment with Java 21 and Maven.
* Configured the PostgreSQL database connection and JPA entity mappings.
* Implemented `Spring Security` with a custom `JwtAuthenticationFilter` and `CustomUserDetailsService`.
* Created the `/api/auth/register` and `/api/auth/login` endpoints to generate and validate JWT tokens.

### Day 2: Core Business Logic & CRUD APIs

* Modeled core database entities: `User`, `Project`, `Sprint`, `Task`, `Resource`, and `Feedback`.
* Developed Data Access Layer (Repositories) using Spring Data JPA.
* Engineered Service classes and RESTful Controllers for full CRUD lifecycle management of Projects, Sprints, and Tasks.
* Implemented robust Global Exception Handling for standardizing API error responses.

### Day 3: Cross-Service Integration

* Integrated the modern Spring `RestClient` to handle synchronous communication with external microservices.
* Built the `PredictionService` to forward project metrics to the Python FastAPI ML engine.
* Engineered HTTP webhook triggers to send system events (like task updates and ML risk predictions) securely to the Node.js Socket.IO server using internal API keys.

### Day 4: Data Engineering & Analytics Prep

* Integrated `commons-csv` to build a `CsvIngestionService` allowing admins to upload and process batch data.
* Created specialized DTOs (Data Transfer Objects) to strictly format and validate incoming/outgoing JSON requests.
* Prepared entity schemas to store predicted delay risk scores persistently alongside project data.

### Day 5: Finalization & Cloud Deployment Preparation

* Conducted End-to-End API testing using Postman.
* Finalized Swagger UI configuration for API documentation.
* Configured dynamic environment variables in `application.properties` to support AWS EC2 private IP routing (e.g., dynamically linking DB, ML, and Node service URLs).
* Packaged the application using the Maven wrapper for deployment.

---

## ⚙️ Local Setup & Installation

**1. Clone the repository and navigate to the directory:**

```bash
git clone <repository-url>
cd platform

```

**2. Configure Environment Variables:**
Update your `src/main/resources/application.properties` to match your local setup.

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/projectdb
spring.datasource.username=postgres
spring.datasource.password=postgres
spring.jpa.hibernate.ddl-auto=update

# JWT Secret
app.jwt.secret=mySuperSecretKeyForJwtAuthentication123456

# External Microservices (Update these for AWS deployment)
app.ml.base-url=http://localhost:8000
app.node.base-url=http://localhost:5000
app.node.api-key=capstone_secret_key_2026

```

**3. Build and Run (Windows):**
This project uses the Maven Wrapper, so a global Maven installation is not required.

```bat
mvnw.cmd -DskipTests package
mvnw.cmd spring-boot:run

```

**4. Access Swagger API Documentation:**
Once running, you can interact with all APIs at:
`http://localhost:8080/swagger-ui/index.html`

---

##  API Reference (Core Endpoints)

All endpoints (except Authentication) require the following security header:

* `Authorization`: `Bearer <Your_JWT_Token>`

### 1. Authentication

* `POST /api/auth/register` - Register a new User (Admin/Manager/Developer)
* `POST /api/auth/login` - Authenticate and receive JWT

### 2. Project Management

* `GET /api/projects` - Retrieve all projects
* `POST /api/projects` - Create a new project
* `PUT /api/projects/{id}` - Update project details
* `DELETE /api/projects/{id}` - Archive/Delete a project

### 3. Sprint & Task Management

* `GET /api/sprints` - Retrieve all sprints
* `POST /api/sprints` - Create a new sprint
* `GET /api/tasks` - Retrieve tasks (Supports Kanban board rendering)
* `POST /api/tasks` - Assign a new task (Triggers Node.js notification)
* `PUT /api/tasks/{id}` - Update task status

### 4. Resource & Feedback Management

* `GET /api/resources` - Fetch developer utilization and availability
* `POST /api/resources` - Allocate developers to projects
* `POST /api/feedback` - Submit review notes for developers

### 5. Intelligence / Prediction

* `POST /api/predict/{projectId}`
* **Behavior:** Gathers project metrics, queries the Python ML service, stores the resulting `delay_probability` in the PostgreSQL database, and triggers an alert via the Node.js service.
