const express = require('express');
const blogModel = require('../models/blogs-model');
const upload = require('../index');
const app = express();
const io = require('../index').io;


app.get('/blogs', (req, res) => {
    res.send('blogs');
})


app.post('/blog', upload.single('image'), (req, res) => {
    let blog = new blogModel();
    blog.date = req.body.date;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.image = '_' + req.file.filename.split(' ').join('_');
    blog.save(async (err, data) => {
        if(!err){
            
            let allBlogs = await blogModel.find({});
            console.log(allBlogs);
            
            var io = req.app.get('socketio');
            io.emit('addblog', {blogs: allBlogs});
            

        } else {
            throw err;
        }
        
    }).then((result) => {
        let obj = {
            status : true,
            message: 'Success! blog saved',
        }
        res.status(200).json(obj);
    }).catch((err) => {
        res.status(200).json({
            err: err
        })
    }) 
});

module.exports = app;