const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');

// In-memory database
let users = [
  { id: '1', name: 'John Doe', email: 'john@example.com' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com' }
];

// GET all users
router.get('/', (req, res) => {
  res.status(200).json(users);
});

// GET a single user
router.get('/:id', (req, res) => {
  const user = users.find(user => user.id === req.params.id);
  
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  res.status(200).json(user);
});

// POST create a new user
router.post('/', (req, res) => {
  const { name, email } = req.body;
  
  if (!name || !email) {
    return res.status(400).json({ message: 'Name and email are required' });
  }
  
  const newUser = {
    id: uuidv4(),
    name,
    email
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT update a user
router.put('/:id', (req, res) => {
  const { name, email } = req.body;
  const userIndex = users.findIndex(user => user.id === req.params.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  const updatedUser = {
    ...users[userIndex],
    name: name || users[userIndex].name,
    email: email || users[userIndex].email
  };
  
  users[userIndex] = updatedUser;
  res.status(200).json(updatedUser);
});

// DELETE a user
router.delete('/:id', (req, res) => {
  const userIndex = users.findIndex(user => user.id === req.params.id);
  
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  
  users.splice(userIndex, 1);
  res.status(200).json({ message: 'User deleted' });
});

module.exports = router;