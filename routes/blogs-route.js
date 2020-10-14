const express = require('express');
const blogModel = require('../models/blogs-model');

const app = express();

const fileUpload = require('../middlewares/fileupload');


app.get('/blogs', (req, res) => {
    res.send('blogs');
});



app.post('/blog', fileUpload.upload.single('image'), (req, res) => {
    let blog = new blogModel();
    blog.date = req.body.date;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.image = '_' + req.file.filename;
    
    blog.save((err, data) => {
        if (!err) {
            let allBlogs = blogModel.find({});
            console.log(allBlogs);

            var io = req.app.get('socketio');
            io.emit('addblog', { blogs: allBlogs });
            let obj = {
                status: true,
                message: 'Success! blog saved',
            }
            res.status(200).json(obj);
        } else {
            res.status(200).json({
                err: err
            })
            console.log(err);
        }
    })

});

module.exports = app;