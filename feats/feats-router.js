const express = require('express'),
  FeatsRouter = express.Router(),
  Models = require('../models.js'),
  Feats = Models.Feat;
// passport = require('passport'),
// { check, validateionResult } = require('express-validator');

FeatsRouter.get('/', (req, res) => {
  Feats.find().then((feat) => {
      res.status(201).json(feat);
    }).catch((err) => {
      res.status(500).send('Error: ' + err)
    });
});

FeatsRouter.get('/:Name', (req, res) => {
  Feats.findOne({ Name: req.params.Name }).then((feat) => {
      res.status(201).json(feat);
    }).catch((err) => {
      res.status(500).send('Error: ' + err)
    });
});

module.exports = FeatsRouter