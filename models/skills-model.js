const mongoose = require('mongoose');

const skillsSchema = new mongoose.Schema({
    skillName: {
        type: String,
        required: true,
        trim: true,
    },
    percentage: {
        type: String,
        required: true,
        trim: true,
    }
});

const skills = mongoose.model('skills', skillsSchema);
module.exports = skills;