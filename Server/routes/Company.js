const express = require('express');
const router = express.Router();
const DataModel = require('../models/DataModel'); // Import your MongoDB model

// MongoDB connection setup (as you have it in your previous code)

router.post('/save-data', async (req, res) => {
  try {
    const { divIndex, inputValue } = req.body;

    // Create a new instance of your MongoDB model with both values
    const newData = new DataModel({
      divIndex,
      inputValue,
    });

    // Save the data to the database
    await newData.save();

    res.json({ message: 'Data saved successfully.' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
