# 🚀 Real-Time Notification Service (Microservice)

**Project:** AI-Powered Project & Resource Management Intelligence Platform  
**Module:** Real-Time Notification Engine (Node.js)  
**Author:** Utkarsh Pathak  

## 📌 Overview
This repository contains the standalone Node.js microservice responsible for handling all real-time system alerts across the enterprise platform. Operating as the central nervous system of the event-driven architecture, this service acts as a bridge between the backend databases (Spring Boot / PostgreSQL), the Machine Learning engine (Python FastAPI), and the user interface (React). 

It utilizes an HTTP-to-WebSocket relay pattern: listening for secure REST API webhooks from internal microservices and instantly broadcasting mapped WebSocket events to connected React clients.

## 🛠️ Technology Stack
* **Runtime:** Node.js
* **Framework:** Express.js
* **Real-time Engine:** Socket.IO
* **Security:** Custom API Key Middleware, Strict CORS configuration

---

## 📅 Day-by-Day Execution Plan

### Day 1: Foundation & Architecture Setup
* Initialized the independent Node.js environment.
* Configured the Express server wrapped with a raw HTTP server to support WebSocket upgrades.
* Established the core Socket.IO instance.
* Configured environmental variables (`dotenv`) and strict CORS policies to ensure only the official React client can connect.

### Day 2: Core Notification Logic & Endpoints
* Engineered the HTTP-to-WebSocket relay pipeline.
* Developed 5 specific `POST` endpoints to listen for system events from the Java and Python microservices.
* Mapped incoming HTTP payloads to specific Socket.IO broadcast emissions:
  * `taskAssigned`: Triggers on new task creation.
  * `taskStatusUpdated`: Triggers on Kanban board movements.
  * `managerFeedbackAdded`: Triggers on code/task review comments.
  * `predictionGenerated`: Triggers when the ML service flags a project delay risk.
  * `sprintDeadlineAlert`: Triggers on time-based sprint closure warnings.

### Day 3: Security & Ecosystem Integration
* Designed and implemented the `verifyApiKey` middleware to block unauthorized access to the notification APIs.
* Resolved HTTP/1.1 vs HTTP/2 protocol mismatches with the Spring Boot `RestClient`.
* Collaborated with the frontend team to integrate `socket.io-client` and `react-hot-toast` into the React `DashboardLayout`.

### Day 4: Cloud Deployment Preparation
* Prepared the application for AWS EC2 deployment.
* Configured dynamic environment variables to ensure smooth transitions between `localhost` testing and production IP addressing.
* Implemented the `/health` endpoint for AWS load balancer and Docker health checks.

### Day 5: Finalization & End-to-End Testing
* Conducted cross-service transaction testing (React UI -> Spring Boot DB -> Node Service -> React UI).
* Finalized API documentation.
* Executed bug fixes regarding JSON parsing (`application/json` headers) and socket memory leaks (implementing `socket.off()` cleanup on the frontend).

---

## ⚙️ Local Setup & Installation

**1. Clone the repository and navigate to the directory:**
\`\`\`bash
git clone <repository-url>
cd node-notification-service
\`\`\`

**2. Install dependencies:**
\`\`\`bash
npm install
\`\`\`

**3. Configure Environment Variables:**
Create a `.env` file in the root directory:
\`\`\`env
PORT=5000
FRONTEND_URL=http://localhost:5173 
INTERNAL_API_KEY=capstone_secret_key_2026
\`\`\`
*(Note: Ensure FRONTEND_URL matches the port your React app is running on).*

**4. Start the development server:**
\`\`\`bash
npm run dev
\`\`\`

---

## 🔐 API Reference (Internal Webhooks)

All `POST` routes require the following security header:
* `x-api-key`: `<Your_Internal_API_Key>`
* `Content-Type`: `application/json`

### 1. New Task Assigned
* **URL:** `/api/notify/task-assigned`
* **Method:** `POST`
* **Payload:** `{"taskId": "T-101", "developerId": "DEV-99", "title": "Implement JWT"}`
* **Emits:** `taskAssigned`

### 2. Task Status Updated
* **URL:** `/api/notify/task-status`
* **Method:** `POST`
* **Payload:** `{"taskId": "T-101", "status": "IN_PROGRESS"}`
* **Emits:** `taskStatusUpdated`

### 3. Manager Feedback Added
* **URL:** `/api/notify/feedback`
* **Method:** `POST`
* **Payload:** `{"developerId": "DEV-99", "managerId": "MGR-01", "comments": "Code approved."}`
* **Emits:** `managerFeedbackAdded`

### 4. Delay Risk Prediction (ML Trigger)
* **URL:** `/api/notify/prediction`
* **Method:** `POST`
* **Payload:** `{"projectId": "PRJ-05", "delay_probability": 85, "status": "High Risk"}`
* **Emits:** `predictionGenerated`

### 5. Sprint Deadline Alert
* **URL:** `/api/notify/deadline`
* **Method:** `POST`
* **Payload:** `{"sprintId": "SPRINT-4", "daysRemaining": 2}`
* **Emits:** `sprintDeadlineAlert`

### 6. Health Check (Public)
* **URL:** `/health`
* **Method:** `GET`
* **Response:** `200 OK` `{"status": "Notification Service is actively running."}`

---
