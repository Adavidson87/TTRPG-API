const express = require('express'),
  RacesRouter = express.Router(),
  Models = require('../models.js'),
  Races = Models.Races,
  passport = require('passport'),
  { check, validationResult } = require('express-validator');

// mongoose.connect('mongodb://localhost:27017/TTRPG', { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * @method get
 * @param {string} endpoint to return all races
 * @returns {object} returns list of all races.
 */
RacesRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Races.find().then((race) => {
    res.status(201).json(race);
  }).catch((err) => {
    res.status(500).send('Error: ' + err)
  });
});

RacesRouter.get('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Races.findOne({ Name: req.params.Name }).then((race) => {
    res.status(201).json(race);
  }).catch((err) => {
    res.status(500).send('Error: ' + err)
  });
});

RacesRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name'),
  check('Description', 'Description is required').not().isEmpty(),
], passport.authenticate('jwt', { session: false }), (req, res) => {
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
          RacialTraits: req.body.RacialTraits,
          FavordClass: req.body.FavoredClass,
          Languages: req.body.Languages
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

RacesRouter.put('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {};
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Description) {
    obj.Description = req.body.Description
  }
  if (req.body.RacialTraits) {
    obj.RacialTraits = req.body.RacialTraits
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

RacesRouter.delete('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
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