const express = require('express');
const blogModel = require('../models/blogs-model');

const app = express();
const io = require('../index').io;


app.get('/blogs', (req, res) => {
    res.send('blogs');
})
app.post('/blog', (req, res) => {
    let blog = new blogModel();
    blog.date = req.body.date;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.save(async (err, data) => {
        if(!err){
            let obj = {
                status : true,
                message: 'Success! blog saved',
            }
            let allBlogs = await blogModel.find({});
            console.log(allBlogs);
            
            var io = req.app.get('socketio');
            io.emit('addblog', {blogs: allBlogs});
            res.status(200).json(obj);

        } else {
            throw err;
        }
        
    }) 
});

module.exports = app;