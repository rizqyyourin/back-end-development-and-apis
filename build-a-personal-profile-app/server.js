import express from 'express';

const app = express();
const port = 3000;

// Root path route
app.get('/', (req, res) => {
  res.send("Welcome to Camper Bot's homepage!");
});

// Hobbies path route
app.get('/hobbies', (req, res) => {
  res.send('I cycle, go boating, and play guitar.');
});

// Skills path route
app.get('/skills', (req, res) => {
  res.send('JavaScript, Node.js, and Express.js!');
});

// JSON API profile route
app.get('/api/profile', (req, res) => {
  res.json({
    name: 'Camper Bot',
    hobbies: ['cycling', 'boating', 'guitar'],
    skills: ['JavaScript', 'Node.js', 'Express.js']
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});