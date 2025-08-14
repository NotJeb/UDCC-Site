const express = require('express');
const fs = require('fs');
const path = require('path');
const rateLimit = require('express-rate-limit');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
    windowMs: 60 * 1000,
    max: 1
});

app.post('/submit-challenge', (req, res) => {
    const { challengeName, challengeLink, discordUsername } = req.body;
    const row = `${challengeName},${challengeLink},${discordUsername}\n`;
    const csvPath = path.join(__dirname, 'submissions.csv');
    fs.appendFileSync(csvPath, row);
    res.json({ success: true });
});

app.get('/submissions', (req, res) => {
    const csvPath = path.join(__dirname, 'submissions.csv');
    if (!fs.existsSync(csvPath)) return res.json([]);
    const csv = fs.readFileSync(csvPath, 'utf8');
    const rows = csv.trim().split('\n').map(line => line.split(','));
    // Return as array of objects
    const result = rows.map(([challengeName, challengeLink, discordUsername]) => ({
        challengeName,
        challengeLink,
        discordUsername
    }));
    res.json(result);
});

// Serve challenge-sheet.csv from /api/challenge-sheet
app.get('/api/challenge-sheet.csv', (req, res) => {
    const csvPath = path.join(__dirname, 'challenge-sheet.csv');
    if (fs.existsSync(csvPath)) {
        res.sendFile(csvPath);
    } else {
        res.status(404).send('CSV not found');
    }
});

app.get('/api/submissions', (req, res) => {
    const csvPath = path.join(__dirname, 'submissions.csv');
    if (!fs.existsSync(csvPath)) return res.json([]);
    const csv = fs.readFileSync(csvPath, 'utf8');
    const rows = csv.trim().split('\n').map(line => line.split(','));
    const result = rows.map(([challengeName, challengeLink, discordUsername]) => ({
        challengeName,
        challengeLink,
        discordUsername
    }));
    res.json(result);
});

app.use(express.static(path.join(__dirname, '../client')));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));