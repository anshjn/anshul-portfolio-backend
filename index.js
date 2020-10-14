const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const contactRoute = require('./routes/contact-route');
const blogsRoute = require('./routes/blogs-route');
const aboutRoute = require('./routes/about-route');
const skillsRoute = require('./routes/skills-route');
const educationRoute = require('./routes/education-route');
const experienceRoute = require('./routes/experience-route');

const port = process.env.PORT || 3000;
const DIR = "./public/";


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(contactRoute);
app.use(aboutRoute);
app.use(blogsRoute);
app.use(skillsRoute);
app.use(experienceRoute);
app.use(educationRoute);
app.use('/public', express.static('public'));

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

    mongoose.connect('mongodb+srv://portfolio_db:b9RkjkY1T1vSN5xI@portfolio-amuvv.mongodb.net/aj?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected...');
        
    })
    .catch(err => console.log(err));


const server = app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

const io = require('socket.io')(server);

io.on('connection', socket => {
    console.log('user connected');
})
app.set('socketio', io);
    

 