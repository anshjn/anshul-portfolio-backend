const express = require('express');
const About = require('../models/about-model');
const app = express();

app.get('/about', (req, res) => {
    let about = new About();
    let data = about.find({});
    
    res.status(200).json({status: 'true', message: 'success', data: data});
});

app.put('/about', (req, res) => {
    let about = new About();
    About.findOneAndUpdate({"name": req.body.name}, {$set:{"text": req.body.text}}, (err, data) => {
        if(!err) {
            res.status(201).json({status:'true', message: 'about updated', data: data});
        } else {
            res.status(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
    
    
});
 app.post('/about', (req, res) => {
    let about = new About();
    about.text = req.body.text;
    about.name = req.body.name;
    about.save((err, data) => {
        if(!err) {
            res.status(201).json({status: 'true', message:'success! Entry saved', data: data });
        } else {
            res.status(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
 });

module.exports = app;