const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// imported koalaRouter
const koalaRouter = require('./routes/koala.route');

const mongoose = require('mongoose');

const db = `mongodb://localhost:27017/koalaholla`;

const Koala = require('./models/koala.schema');

mongoose.connect(db, {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
});


mongoose.connection.on('error', (err) => {
  console.log(err);
});

// Configure body-parser for Angular and jQuery
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json()); // This line is required for Angular


// use koala route
app.use('/koala' , koalaRouter);

// Static files
app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});