const express = require('express');
const Experience = require('../models/experience-model');
const { request } = require('./blogs-route');

const app = express();

app.get('/experience', (req, res) => {
    let experience = new Experience();
    let data = experience.find({});
    
    res.status(200).json({status: 'true', message: 'success', data: data});
});

app.put('/experience', (req, res) => {
    
    experience.findOneAndUpdate({"year": request.body.year}, {$set:{"year": req.body.year, "company": req.body.institution, "skill": req.body.skill}}, (err, data) => {
        if(!err) {
            res.status(201).json({status:'true', message: 'updation successful!', data: data});
        } else {
            res.send(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
});
 app.post('/experience', (req, res) => {
    let experience = new Experience();
    experience.year = req.body.year;
    experience.company = req.body.company;
    experience.skill = req.body.skill;
    experience.save((err, data) => {
        if(!err) {
            res.send(201).json({status: 'true', message:'success! Entry saved', data: data });
        } else {
            res.send(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
 });

module.exports = app;