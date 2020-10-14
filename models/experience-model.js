const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
    years: {
        type: String,
        required: true,
        trim: true,
    },
    company: {
        type: String,
        required: true,
        trim: true,
    },
    skill: {
        type: String,
        required: true,
        trim: true,
    }
});

const experience = mongoose.model('experience', experienceSchema);
module.exports = experience;