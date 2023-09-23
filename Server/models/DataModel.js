// DataModel.js

const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  divIndex: {
    type: String,
    required: true,
  },
  inputValue: {
    type: String,
    required: true,
  },
});

const DataModel = mongoose.model('Data', dataSchema);

module.exports = DataModel;
