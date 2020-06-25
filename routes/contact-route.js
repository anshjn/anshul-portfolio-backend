const express = require('express');
const contactModel = require('../models/contact');
const app = express();

app.post('/contact', async (req, res) => {
    const contact = new contactModel(req.body);
  
    try {
      await contact.save();
      res.send(contact);
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = app