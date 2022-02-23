// imports
const express = require('express'),
  ClassesRouter = express.Router(),
  Models = require('../models.js'),
  Classes = Models.Class,
  passport = require('passport'),
  { check, validateionResult } = require('express-validator');

ClassesRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Class.find().then((classes) => {
    res.status(201).json(classes);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

ClassesRouter.get('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Classes.findOne({ Name: req.params.Name }).then((classes) => {
    res.json(classes);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

module.exports = ClassesRouter