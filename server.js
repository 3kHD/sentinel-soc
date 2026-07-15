const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies (good practice)
app.use(express.json());

// Route: GET /logs
// This serves the traffic_logs.json file when you visit /logs
app.get('/logs', (req, res) => {
    const filePath = path.join(__dirname, 'traffic_logs.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).send('Error loading logs');
        }

        // Parse JSON and send it
        try {
            const logs = JSON.parse(data);
            res.json(logs);
        } catch (e) {
            res.status(500).send('Error parsing JSON');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Sentinel Server is running at http://localhost:${PORT}`);
    console.log(`📊 Try visiting: http://localhost:${PORT}/logs`);
});