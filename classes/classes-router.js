const express = require('express'),
  CharacterClassesRouter = express.Router(),
  Models = require('../models.js'),
  CharacterClasses = Models.CharacterClasses,
  passport = require('passport'),
  { check, validationResult } = require('express-validator');;

// mongoose.connect('mongodb://localhost:27017/TTRPG', { useNewUrlParser: true, useUnifiedTopology: true });

CharacterClassesRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  CharacterClasses.find().then((characterClass) => {
    res.status(201).json(characterClass);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

CharacterClassesRouter.get('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  CharacterClasses.findOne({ Name: req.params.Name }).then((characterClass) => {
    res.status(201).json(characterClass);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

CharacterClassesRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Non alphanumeric characters are not allowed in CharacterClass names.').isAlphanumeric(),
  check('Description', 'Description is required').not().isEmpty(),
  check('ClassAbilities', 'Class abilites are required').not().isEmpty(),
], passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  CharacterClasses.findOne({ Name: req.body.Name })
    .then((characterClass) => {
      if (characterClass) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        CharacterClasses.create({
          Name: req.body.Name,
          Description: req.body.Description,
          ClassAbilities: req.body.ClassAbilities,
          Proficiencies: req.body.Proficiencies
        })
          .then((characterClass) => { res.status(201).json(characterClass) })
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

CharacterClassesRouter.put('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {}
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Description) {
    obj.Description = req.body.Description
  }
  if (req.body.ClassAbilities) {
    obj.ClassAbilities = req.body.ClassAbilities
  }
  if (req.body.Proficiencies) {
    obj.Proficiencies = req.body.Proficiencies
  }
  CharacterClasses.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
    { new: true },
    (err, updatedCharacterClass) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedCharacterClass);
      }
    });
});

CharacterClassesRouter.delete('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  CharacterClasses.findOneAndDelete({ Name: req.params.Name })
    .then((characterClass) => {
      if (!characterClass) {
        res.status(400).send(req.params.Name + ' was not found');
      } else {
        res.status(200).send(req.params.Name + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

module.exports = CharacterClassesRouter