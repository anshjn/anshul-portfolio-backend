const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    year: {
        type: String,
        required: true,
        trim: true,
    },
    institution: {
        type: String,
        required: true,
        trim: true,
    }
});

const education = mongoose.model('education', educationSchema);
module.exports = education;