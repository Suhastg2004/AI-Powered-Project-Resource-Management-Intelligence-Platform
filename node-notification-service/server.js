require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Parses incoming JSON payloads

const server = http.createServer(app);
// const io = new Server(server, {
//     cors: {
//         origin: process.env.FRONTEND_URL || "http://localhost:3000",
//         methods: ["GET", "POST"],
//         credentials: true
//     }
// });
// Temporarily allow ALL origins so our local HTML file can connect
const io = new Server(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
        // Note: I temporarily removed 'credentials: true' because 
        // Socket.IO doesn't allow it when origin is set to "*"
    }
});

io.on('connection', (socket) => {
    console.log(`[+] New React client connected: ${socket.id}`);
    
    socket.on('disconnect', () => {
        console.log(`[-] React client disconnected: ${socket.id}`);
    });
});

// ==========================================
// MICROSERVICE ENDPOINTS (Listens to Spring Boot / Python)
// ==========================================

// 1. New Task Assigned [cite: 334]
app.post('/api/notify/task-assigned', (req, res) => {
    const { taskId, developerId, title } = req.body;
    
    // Broadcast to the frontend
    io.emit('taskAssigned', { 
        taskId, 
        developerId, 
        message: `New task assigned: ${title}` 
    });
    
    res.status(200).json({ success: true, message: 'taskAssigned broadcasted' });
});

// 2. Task Status Updated [cite: 334]
app.post('/api/notify/task-status', (req, res) => {
    const { taskId, status } = req.body;
    
    io.emit('taskStatusUpdated', { 
        taskId, 
        status, 
        message: `Task ${taskId} moved to ${status}` 
    });
    
    res.status(200).json({ success: true, message: 'taskStatusUpdated broadcasted' });
});

// 3. Manager Feedback Added [cite: 334]
app.post('/api/notify/feedback', (req, res) => {
    const { developerId, managerId, comments } = req.body;
    
    io.emit('managerFeedbackAdded', { 
        developerId, 
        managerId, 
        message: 'New feedback received from manager' 
    });
    
    res.status(200).json({ success: true, message: 'managerFeedbackAdded broadcasted' });
});

// 4. Delay Risk Prediction Generated (Called by Python Service) [cite: 334]
app.post('/api/notify/prediction', (req, res) => {
    const { projectId, delay_probability, status } = req.body;
    
    io.emit('predictionGenerated', { 
        projectId, 
        delay_probability, 
        status, 
        message: `Project ${projectId} risk updated: ${status}` 
    });
    
    res.status(200).json({ success: true, message: 'predictionGenerated broadcasted' });
});

// 5. Sprint Deadline Alert [cite: 334]
app.post('/api/notify/deadline', (req, res) => {
    const { sprintId, daysRemaining } = req.body;
    
    io.emit('sprintDeadlineAlert', { 
        sprintId, 
        daysRemaining, 
        message: `Warning: Sprint ends in ${daysRemaining} days!` 
    });
    
    res.status(200).json({ success: true, message: 'sprintDeadlineAlert broadcasted' });
});

// ==========================================
// HEALTH CHECK
// ==========================================
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'Notification Service is actively running.' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`🚀 Real-time Notification Service running on port ${PORT}`);
});