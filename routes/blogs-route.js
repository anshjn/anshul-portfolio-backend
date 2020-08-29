const express = require('express');
const blogModel = require('../models/blogs-model');
const { io } = require('..');
const app = express();
const socket = require('../index').io;

app.post('blog', (req, res) => {
    let blog = new blogModel();
    blog.date = req.body.date;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.save((err, data) => {
        if(!err){
            let obj = {
                status : true,
                message: 'Success! blog saved',
            }
            io.emit('addBlog', {data: data});
            socket.on('add')
            res.status(200).json(obj);
        }
        
    }) 
})