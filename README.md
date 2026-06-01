# 🚀 Web Client Interface (Frontend)

**Project:** AI-Powered Project & Resource Management Intelligence Platform

**Module:** React Client Application

**Author:** Yeshwin

## 📌 Overview

This repository contains the frontend web application for the Project Intelligence Platform. Built for speed and modern user experience using React and Vite, this application serves as the primary interface for Admins, Managers, and Developers to interact with the system.

It acts as the visual aggregation layer, communicating securely with the Spring Boot backend via JWT-authenticated REST APIs, displaying complex AI-driven data predictions, and rendering live system alerts through a real-time WebSocket connection to the Node.js notification service.

## 🛠️ Technology Stack

* **Framework:** React 19
* **Build Tool:** Vite (for fast Hot Module Replacement)
* **Styling:** Tailwind CSS
* **Routing:** React Router DOM (v6)
* **API Client:** Axios (Configured with interceptors for JWT Bearer tokens)
* **Real-Time:** Socket.IO Client
* **Data Visualization:** Recharts
* **UI Feedback:** React Hot Toast & Lucide React (Icons)

---

## 📅 Day-by-Day Execution Plan

### Day 1: Foundation & Authentication UI

* Initialized the React project using Vite.
* Configured Tailwind CSS and PostCSS for rapid utility-first styling.
* Built the Authentication UI (Login and Registration forms).
* Set up standard layouts (Sidebar, Navbar) using React Router DOM.

### Day 2: Core Platform Views

* Engineered the dynamic Kanban board for Task Management.
* Developed views for Project listings, Sprint planning, and Developer Resource allocation.
* Implemented generic UI components (Buttons, Inputs, Cards, Status Badges).

### Day 3: Backend API Integration

* Integrated `axios` for cross-origin resource sharing (CORS) with the Java Spring Boot API.
* Developed an `api.js` service to centralize HTTP calls and manage JWT token injection in the request headers.
* Wired up the UI state to reflect actual database data instead of mock data.

### Day 4: Analytics & Real-Time Alerts

* Utilized `recharts` to build the interactive Analytics Dashboard, visualizing sprint velocity trends, developer utilization heatmaps, and ML-driven project delay risks.
* Integrated `socket.io-client` to listen for events from the Node.js service, triggering non-intrusive UI popups via `react-hot-toast` for things like new task assignments or critical delay risk warnings.

### Day 5: Finalization & Deployment Prep

* Conducted UI/UX polishing and verified responsive design logic.
* Fixed token expiration edge cases in the Auth context.
* Prepared the static build step (`npm run build`) for eventual AWS S3 bucket deployment.

---

## ⚙️ Local Setup & Installation

**1. Clone the repository and navigate to the directory:**

```bash
git clone <repository-url>
cd frontend

```

**2. Install dependencies:**

```bash
npm install

```

**3. Configure Environment Variables:**
Create a `.env` file in the root of the `frontend` directory:

```env
# Spring Boot API URL
VITE_API_BASE_URL=http://localhost:8080/api

# Node.js Socket.IO Server URL
VITE_SOCKET_URL=http://localhost:5000

```

*(Note: If deploying to AWS, update these to point to your EC2 public IPs or Load Balancers).*

**4. Start the development server:**

```bash
npm run dev

```

The application will typically be available at `http://localhost:5173`.

---

## 📁 Key Directory Structure

```text
frontend/
├── src/
│   ├── assets/        # Static images (hero, logos)
│   ├── components/    # Reusable UI elements (Navbar, Sidebar, Buttons)
│   ├── context/       # React Context providers (AuthContext)
│   ├── layouts/       # Structural wrappers (DashboardLayout)
│   ├── pages/         # Full-screen views (Analytics, Tasks, Sprints, etc.)
│   ├── services/      # Axios configurations and API route definitions
│   ├── App.jsx        # Root application and route definitions
│   └── main.jsx       # React DOM mount point
├── package.json       # Project dependencies and scripts
└── vite.config.js     # Vite bundler configuration

```

## 📜 Available Scripts

* `npm run dev` - Starts the Vite development server with Hot Module Replacement.
* `npm run build` - Bundles the application for production into the `/dist` folder.
* `npm run lint` - Runs ESLint to check for code quality and formatting issues.