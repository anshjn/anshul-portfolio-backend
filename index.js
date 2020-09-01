const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const contactRoute = require('./routes/contact-route');
const blogsRoute = require('./routes/blogs-route');
const multer = require('multer');
const port = process.env.PORT || 3000;
const DIR = "./public/";


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR + 'blogs')
    },
    filename: (req, file, cb) => {
        cb(null, '_' + file.filename.split(' ').join('_'));
    }
});

// Multer Mime Type Validation
const upload = multer({
    storage: fileStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
        } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

app.use(contactRoute);

app.use(blogsRoute);

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

mongoose.connect('mongodb+srv://portfolio_db:b9RkjkY1T1vSN5xI@portfolio-amuvv.mongodb.net/contacts?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true }).then(() => {
        console.log('MongoDB connected...');
        
    })
    .catch(err => console.log(err));


    const server = app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

    const io = require('socket.io')(server);
    
    io.on('connection', socket => {
        console.log('user connected');
    })
    app.set('socketio', io);
    
module.exports = upload;
 