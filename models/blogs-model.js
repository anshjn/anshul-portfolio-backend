const mongoose = require('mongoose');

const blogsSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    }
});

const blog = mongoose.model('blogs', blogsSchema);

module.exports = blog;