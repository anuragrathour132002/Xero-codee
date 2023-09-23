// routes/api.js
const express = require('express');
const router = express.Router();
const Hosting = require('../models/Hosting'); // Import the model

// Create a new entry in the database
router.post('/save-hosting', async (req, res) => {
  try {
    const { inputValue } = req.body;

    // Create a new document in MongoDB
    const newEntry = new Hosting({ inputValue});
    await newEntry.save();

    res.status(201).json({ message: 'Input value saved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
