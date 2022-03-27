const express = require('express'),
  SavedCharactersRouter = express.Router(),
  Models = require('../models.js'),
  SavedCharacters = Models.SavedCharacters,
  passport = require('passport'),
  { check, validationResult } = require('express-validator');

// mongoose.connect('mongodb://localhost:27017/TTRPG', { useNewUrlParser: true, useUnifiedTopology: true });

/**
 * Gets list of characters
 */
SavedCharactersRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  SavedCharacters.find().then((savedCharacter) => {
    res.status(201).json(savedCharacter);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

/**
 * GETS characters by name
 */
SavedCharactersRouter.get('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  SavedCharacters.findOne({ Name: req.params.Name }).then((savedCharacter) => {
    res.status(201).json(savedCharacter);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

/**
 * Creates characters
 */
SavedCharactersRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Name cannot contain non alphanumeric characters.').isAlphanumeric(),
  check('Class', 'Class is required').not().isEmpty(),
  check('Race', 'Race is required').not().isEmpty(),
  check('Strength', 'Strength is required').not().isEmpty(),
  check('Dexterity', 'Dexterity is required').not().isEmpty(),
  check('Constitution', 'Constititution is required').not().isEmpty(),
  check('Intelligence', 'Intelligence is required').not().isEmpty(),
  check('Wisdom', 'Wisdom is required').not().isEmpty(),
  check('Charisma', 'Charisma is required').not().isEmpty()
], passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  SavedCharacters.findOne({ Name: req.body.Name })
    .then((savedCharacter) => {
      if (savedCharacter) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        SavedCharacters.create({
          Portrait: req.body.Portrait,
          Name: req.body.Name,
          Class: req.body.Class,
          Race: req.body.Race,
          Gender: req.body.Gender,
          Strength: req.body.Strength,
          Dexterity: req.body.Dexterity,
          Constitution: req.body.Constitution,
          Intelligence: req.body.Intelligence,
          Wisdom: req.body.Wisdom,
          Charisma: req.body.Charisma,
          Biography: req.body.Biography,
          Inventory: req.body.Inventory,
          Spells: req.body.Spells,
          Feats: req.body.Feats
        })
          .then((savedCharacter) => { res.status(201).json(savedCharacter) })
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

/**
 * Updates characters
 */
SavedCharactersRouter.put('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {};
  if (req.body.Portrait) {
    obj.Portrait = req.body.Portrait
  }
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Class) {
    obj.Class = req.body.Class
  }
  if (req.body.Race) {
    obj.Class = req.body.Class
  }
  if (req.body.Gender) {
    obj.Class = req.body.Gender
  }
  if (req.body.Strength) {
    obj.Strength = req.body.Strength
  }
  if (req.body.Dexterity) {
    obj.Dexterity = req.body.Dexterity
  }
  if (req.body.Constitution) {
    obj.Constitution = req.body.Constitution
  }
  if (req.body.Intelligence) {
    obj.Intelligence = req.body.Intelligence
  }
  if (req.body.Wisdom) {
    obj.Wisdom = req.body.Wisdom
  }
  if (req.body.Charisma) {
    obj.Charisma = req.body.Charisma
  }
  if (req.body.Biography) {
    obj.Biography = req.body.Biography
  }
  if (req.body.Inventory) {
    obj.Inventory = req.body.Inventory
  }
  if (req.body.Spells) {
    obj.Spells = req.body.Spells
  }
  if (req.body.Feats) {
    obj.Feats = req.body.Feats
  }
  SavedCharacters.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
    { new: true },
    (err, updatedSavedCharacter) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedSavedCharacter);
      }
    });
});

/**
 * Deletes characters
 */
SavedCharactersRouter.delete('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  SavedCharacters.findOneAndDelete({ Name: req.params.Name })
    .then((savedCharacter) => {
      if (!savedCharacter) {
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

module.exports = SavedCharactersRouter