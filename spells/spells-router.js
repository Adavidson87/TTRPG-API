const express = require('express'),
  SpellsRouter = express.Router(),
  Models = require('../models.js'),
  Spells = Models.Spells,
  passport = require('passport'),
  { check, validationResult } = require('express-validator');

// mongoose.connect('mongodb://localhost:27017/TTRPG', { useNewUrlParser: true, useUnifiedTopology: true });

SpellsRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  Spells.find().then((spell) => {
    res.status(201).json(spell);
  }).catch((err) => {
    res.status(500).send('Error: ' + err)
  });
});

SpellsRouter.get('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Spells.findOne({ Name: req.params.Name }).then((spell) => {
    res.status(201).json(spell);
  }).catch((err) => {
    res.status(500).send('Error: ' + err)
  });
});

SpellsRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Name cannot contain non alphanumeric characters.').isAlphanumeric(),
  check('SpellLevel', 'Spell level is required').not().isEmpty(),
  check('Description', 'Description is required').not().isEmpty(),
  check('School', 'School is required').not().isEmpty()
], passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Spells.findOne({ Name: req.body.Name })
    .then((spell) => {
      if (spell) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        Spells.create({
          Name: req.body.Name,
          SpellLevel: req.body.SpellLevel,
          Description: req.body.Description,
          School: req.body.School
        })
          .then((spell) => { res.status(201).json(spell) })
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

SpellsRouter.put('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {};
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.SpellLevel) {
    obj.SpellLevel = req.body.SpellLevel
  }
  if (req.body.Description) {
    obj.Description = req.body.Description
  }
  if (req.body.School) {
    obj.School = req.body.School
  }
  Spells.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
    { new: true },
    (err, updatedSpell) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedSpell);
      }
    });
});

SpellsRouter.delete('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  Spells.findOneAndDelete({ Name: req.params.Name })
    .then((spell) => {
      if (!spell) {
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

module.exports = SpellsRouter