const express = require('express');
const blogModel = require('../models/blogs-model');
// const upload = require('./../index');
const app = express();
const io = require('../index').io;
const {upload} = require('../middlewares/fileupload');
// var multer  = require('multer')
// var upload = multer({ dest: 'uploads/' })

app.get('/blogs', (req, res) => {
    res.send('blogs');
});


app.post('/blog', upload.single('image'), (req, res) => {
    console.log(req.data);
    let blog = new blogModel();
    blog.date = req.body.date;
    blog.title = req.body.title;
    blog.content = req.body.content;
    blog.image = '_' + req.file.originalname;
    blog.save(async (err, data) => {
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
            res.status(502).json({
                err: err
            })
        }
    })

});

module.exports = app;