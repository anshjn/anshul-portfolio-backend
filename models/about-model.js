const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    text: {
        type: String,
        required: true,
        trim: true,
    }
});

const aboutUs = mongoose.model('aboutus', aboutSchema);
module.exports = aboutUs;