const express = require('express');
const { isAuthenticated, users } = require('./middleware');
const router = express.Router();

router.post('/signup', (req, res) => {
  const { email, username, password } = req.body;

  if (users.find((u) => u.email === email)) {
    return res.status(400).json({ message: 'User with this email already exists' });
  }
  const newUser = { email, username, password };
  users.push(newUser);

  res.status(201).json({ message: 'User created successfully' });
});

router.post('/login', isAuthenticated, (req, res) => {
  res.json({ message: `Welcome, ${req.user.username}!` });
});


router.post('/reset-password', (req, res) => {
  const { email, newPassword } = req.body;
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }
  users[userIndex].password = newPassword;
  res.json({ message: 'Password reset successful' });
});

module.exports = router;
