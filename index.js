const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// Get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Get a single user
app.get('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = users.find(user => user.id === userId);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Create a new user
app.post('/users', (req, res) => {
    const newUser = req.body;
    users.push(newUser);
    res.status(201).json(newUser);
});

// Update a user
app.put('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const updatedUser = req.body;
    const index = users.findIndex(user => user.id === userId);

    if (index !== -1) {
        users[index] = { ...users[index], ...updatedUser };
        res.json(users[index]);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Delete a user
app.delete('/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const index = users.findIndex(user => user.id === userId);

    if (index !== -1) {
        const deletedUser = users[index];
        users.splice(index, 1);
        res.json(deletedUser);
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
