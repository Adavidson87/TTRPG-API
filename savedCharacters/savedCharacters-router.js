// imports
const express = require('express'),
  CharactersRouter = express.Router(),
  Models = require('../models.js'),
  Characters = Models.Class;
// passport = require('passport'),
// { check, validateionResult } = require('express-validator');

CharactersRouter.get('/',
  // passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    Class.find().then((characters) => {
      res.status(201).json(characters);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
  });

CharactersRouter.get('/:Name',
  // passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    Characters.findOne({ Name: req.params.Name }).then((characters) => {
      res.json(characters);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
  });

module.exports = CharactersRouter