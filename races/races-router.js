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

RacesRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Name cannot contain non alphanumeric characters.').isAlphaNumerica(),
  check('Description', 'Description is required').not().isEmpty(),
  check('RacialAblilities', 'Abilities are required').not().isEmpty(),
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Races.findOne({ Name: req.body.Name })
    .then((race) => {
      if (race) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        Races.create({
          Name: req.body.Name,
          Description: req.body.Description,
          RacialAbilities: req.body.RacialAbilities
        })
          .then((race) => { res.status(201).json(race) })
          .catch((error) => {
            console.error(error);
            res.status(500).send('Error: ' + error);
          })
      }
    })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error: ' + error);
    });
});

RacesRouter.put('/:Name', (req, res) => {
  let obj = {};
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Description) {
    obj.Description = req.body.Description
  }
  if (req.body.RacialAbilities) {
    obj.RacialAbilities = req.body.RacialAbilities
  }
  Races.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
    { new: true },
    (err, updatedRace) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedRace);
      }
    });
});

RacesRouter.delete('/:Name', (req, res) => {
  Races.findOneAndDelete({ Name: req.params.Name })
    .then((Race) => {
      if (!Race) {
        res.status(400).send(req.params.Name + ' was not found.');
      } else {
        res.status(200).send(req.params.Name + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

module.exports = RacesRouter