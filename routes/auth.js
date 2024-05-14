const express = require('express');
const passport = require('passport');

const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// Login route
router.post('/login', passport.authenticate('local'), async (req, res) => {
  // If authentication is successful, redirect or send a success response
  res.status(200).json({ message: 'Login successful', user: req.user });
});

// Logout route
router.post('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) {
      res.status(500).json({ message: 'Logout Failed' });
    }
    res.status(200).json({ message: 'Logout successful' });
  });
});

// POST /register
router.post('/register', async (req, res) => {
  const {
    username,
    email,
    password,
    age,
    bio,
    gender,
    interestedInGender,
    interestedInCountry,
    country,
    profilePicture
  } = req.body;

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    user = new User({
      username,
      email,
      password: hashedPassword,
      age,
      bio,
      gender,
      interestedInGender,
      interestedInCountry,
      country,
      profilePicture
    });

    await user.save();

    res.status(201).json({ message: 'User registered successfully', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;