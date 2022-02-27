const express = require('express'),
  RacesRouter = express.Router(),
  Models = require('../models.js'),
  Races = Models.Race;
  passport = require('passport'),
  { check, validateionResult } = require('express-validator');

  /**
   * @method get
   * @param {string} endpoint to return all races
   * @returns {object} returns list of all races.
   */
RacesRouter.get('/', (req, res) => {
  Races.find().then((race) => {
      res.status(201).json(race);
    }).catch((err) => {
      res.status(500).send('Error: ' + err)
    });
});

RacesRouter.get('/:Name', (req, res) => {
  Races.findOne({ Name: req.params.Name }).then((race) => {
      res.status(201).json(race);
    }).catch((err) => {
      res.status(500).send('Error: ' + err)
    });
});