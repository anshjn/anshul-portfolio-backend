const express = require('express');
const contactModel = require('../models/contact');
const app = express();

app.get('/contact', (req, res) => {
  res.send('Contact works');
});
app.get('/getcontacts', async (req, res) => {
  const contacts = await contactModel.find({});

  try {
    res.send(contacts);
  } catch (err) {
    res.status(500).send(err);
  }
});
app.post('/addcontact', async (req, res) => {
    const contact = new contactModel(req.body);
  
    try {
      await contact.save();
      res.send(contact);
    } catch (err) {
      res.status(500).send(err);
    }
});

module.exports = app