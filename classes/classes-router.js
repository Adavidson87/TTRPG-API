const res = require('express/lib/response');

// imports
const express = require('express'),
  CharacterClassesRouter = express.Router(),
  Models = require('../models.js'),
  CharacterClasses = Models.CharacterClass;
// passport = require('passport'),
// { check, validateionResult } = require('express-validator');

CharacterClassesRouter.get('/',
  // passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    CharacterClass.find().then((characterClasses) => {
      res.status(201).json(characterClasses);
    }).catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err)
    });
  });

CharacterClassesRouter.get('/:Name',
  // passport.authenticate('jwt', { session: false }), 
  (req, res) => {
    CharacterClasses.findOne({ Name: req.params.Name }).then((characterClasses) => {
      res.json(characterClasses);
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
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  CharacterClass.findOne({ Name: req.body.Name })
    .then((characterClass) => {
      if (characterClass) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        CharacterClasses.create({
          Name: req.body.Name,
          Description: req.body.Description,
          ClassAbilities: req.body.ClassAbilities,
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

CharacterClassesRouter.put('/:Name', (req, res) => {
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

CharacterClassesRouter.delete('/:name', (req, res) => {
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