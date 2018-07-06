const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const mongoose = require('mongoose');

const db = `mongodb://localhost:27017/koalaholla`;

const Koala = require('./models/koala.schema');

mongoose.connect(db, {useNewUrlParser : true});

mongoose.connection.on('connected', () => {
  console.log('connected to mongodb');
});


mongoose.connection.on('error', (err) => {
  console.log(err);
});

// Configure body-parser for Angular and jQuery
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // This line is required for Angular


// POSTz
app.post('/koala', (req, res) => {

  let newKoala = new Koala(req.body);

  newKoala.save().then((data)=>{
    console.log(data);
    res.sendStatus(201);
  }).catch((err)=>{
    res.sendStatus(500);
  });

  console.log('POST to /koala req.body =', req.body);
});

// GET
app.get('/koala', (req, res) => {

  Koala.find({}).then((data)=>{
    res.send(data);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  });
});

app.delete('/koala/:id', (req, res)=>{
  let id = req.params.id;

  Koala.findByIdAndRemove({_id : id}).then((data)=>{
    console.log(data);
    res.sendStatus(201);
  }).catch((err)=>{
    res.sendStatus(500);
  });
});

app.put('/koala/:id', (req, res) =>{
  let id = req.params.id;
  let koalaData = req.body;

  console.log(id);
  console.log(koalaData);

  Koala.findByIdAndUpdate({_id : id}, {$set : {ready_to_transfer : koalaData.ready_to_transfer} }, {new : true}).then((data)=>{
    console.log(data);
    res.sendStatus(201);
  }).catch((err)=>{
    console.log(err);
    res.sendStatus(500);
  });
});

// Static files
app.use(express.static('server/public'));

// Start listening for requests on a specific port
app.listen(PORT, () => {
  console.log('listening on port', PORT);
});
