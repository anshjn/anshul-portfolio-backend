const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  email: {
      type: String,
      required: true,
      trim: true,
  },
  contact: {
      type: Number,
      required: false,
      trim: true
  },
  message: {
      type: String,
      required: false,
      trim: true
  }
});

const Contact = mongoose.model("contact", ContactSchema);
module.exports = Contact;