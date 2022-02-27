const express = require('express'),
  SpellsRouter = express.Router(),
  Models = require('../models.js'),
  Spells = Models.Spell;
// passport = require('passport'),
// { check, validateionResult } = require('express-validator');

SpellsRouter.get('/', (req, res) => {
  Spells.find().then((spell) => {
    res.status(201).json(spell);
  }).catch((err) => {
    res.status(500).send('Error: ' + err)
  });
});

SpellsRouter.get('/:Name', (req, res) => {
  Spells.findOne({ Name: req.params.Name }).then((spell) => {
    res.status(201).json(spell);
  }).catch((err) => {
    res.status(500).send('Error: ' + err)
  });
});

SpellsRouter.get('/:School', (req, res) => {
  Spells.findOne({ School: req.params.School }).then((spell) => {
    res.status(201).json(spell);
  }).catch((err) => {
    res.status(500).send('Error: ' + err)
  });
});

module.exports = SpellsRouter