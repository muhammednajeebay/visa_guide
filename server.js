const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '.'))); // Serve current folder as static

// Data File Path
const DATA_FILE = path.join(__dirname, 'static', 'data.json');

// API: Get Data (Optional, can also just fetch /static/data.json)
app.get('/api/data', (req, res) => {
    fs.readFile(DATA_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data' });
        }
        res.json(JSON.parse(data));
    });
});

// API: Save Data
app.post('/api/save-portfolio', (req, res) => {
    const newData = req.body;

    // Simple validation
    if (!newData) {
        return res.status(400).json({ error: 'No data provided' });
    }

    // Write to file
    fs.writeFile(DATA_FILE, JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            console.error('Error saving data:', err);
            return res.status(500).json({ error: 'Failed to save data' });
        }
        console.log('Portfolio data saved successfully.');
        res.json({ message: 'Data saved successfully' });
    });
});

// Admin Auth check middleware (for future use if we expand server-side logic)
// For now, auth is handled client-side/soft-check as per plan.

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log(`Admin panel at http://localhost:${PORT}/admin`);
});
