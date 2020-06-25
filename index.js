const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const contactRoute = require('./routes/contact-route');
const port = process.env.PORT || 3000;


app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use(contactRoute);

app.get('/', (req, res) => {
    res.send('Hello World, from express');
});

mongoose.connect('mongodb+srv://portfolio_db:b9RkjkY1T1vSN5xI@portfolio-amuvv.mongodb.net/contacts?retryWrites=true&w=majority', {
    useNewUrlParser: true }).then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));



app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));