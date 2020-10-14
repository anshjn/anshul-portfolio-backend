const express = require('express');
const Education = require('../models/education-model');
const { request } = require('./blogs-route');

const app = express();

app.get('/education', (req, res) => {
    let education = new Education();
    let data = education.find({});
    
    res.status(200).json({status: 'true', message: 'success', data: data});
});

app.put('/education', (req, res) => {
    
    Education.findOneAndUpdate({"year": request.body.year}, {$set:{"year": req.body.year, "institution": req.body.institution}}, (err, data) => {
        if(!err) {
            res.status(201).json({status:'true', message: 'updation successful!', data: data});
        } else {
            res.send(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
});
 app.post('/education', (req, res) => {
    let education = new Education();
    education.year = req.body.year;
    education.institution = req.body.institution;
    education.save((err, data) => {
        if(!err) {
            res.send(201).json({status: 'true', message:'success! Entry saved', data: data });
        } else {
            res.send(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
 });

module.exports = app;