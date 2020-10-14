const express = require('express');
const Skills = require('../models/skills-model');
const app = express();

app.get('/skills', (req, res) => {
    let skills = new Skills();
    let data = skills.find({});
    
    res.status(200).json({status: 'true', message: 'success', data: data});
});

app.put('/skills', (req, res) => {
    Skills.findOneAndUpdate({"skillName": req.body.skillName}, {$set:{"skillName": req.body.skillName, "percentage": req.body.percentage}}, (err, data) => {
        if(!err) {
            res.status(201).json({status:'true', message: 'skills updated', data: data});
        } else {
            res.send(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
    
    
});
 app.post('/skills', (req, res) => {
    let skills = new Skills();
    skills.skillName = req.body.skillName;
    skills.percentage = req.body.percentage;
    skills.save((err, data) => {
        if(!err) {
            res.send(201).json({status: 'true', message:'success! Entry saved', data: data });
        } else {
            res.send(409).json({status: 'true', message:'Failed! Something went wrong', data: err });
        }
    });
 });

module.exports = app;