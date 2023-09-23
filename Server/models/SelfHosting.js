// models/Input.js
const mongoose = require('mongoose');

const yourSchema = new mongoose.Schema({
    hosting:{
        type:String,
        required:true
    },
});

const Hosting = mongoose.model('Hosting', yourSchema);

module.exports = Hosting;