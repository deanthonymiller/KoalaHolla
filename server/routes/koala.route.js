let express = require('express');
let mongoose = require('mongoose');
let router = express.Router();
const Koala = require('../models/koala.schema');

// POST
router.post('/', (req, res) => {

  let newKoala = new Koala(req.body);

  newKoala.save().then((data) => {
    console.log(data);
    res.sendStatus(201);
  }).catch((err) => {
    res.sendStatus(500);
  });

  console.log('POST to /koala req.body =', req.body);
});

// GET
router.get('/', (req, res) => {

  Koala.find({}).then((data) => {
    res.send(data);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

router.delete('/:id', (req, res) => {
  let id = req.params.id;

  Koala.findByIdAndRemove({
    _id: id
  }).then((data) => {
    console.log(data);
    res.sendStatus(201);
  }).catch((err) => {
    res.sendStatus(500);
  });
});

router.put('/:id', (req, res) => {
  let id = req.params.id;
  let koalaData = req.body;

  console.log(id);
  console.log(koalaData);

  Koala.findByIdAndUpdate({
    _id: id
  }, {
    $set: {
      ready_to_transfer: koalaData.ready_to_transfer
    }
  }, {
    new: true
  }).then((data) => {
    console.log(data);
    res.sendStatus(201);
  }).catch((err) => {
    console.log(err);
    res.sendStatus(500);
  });
});

module.exports = router;