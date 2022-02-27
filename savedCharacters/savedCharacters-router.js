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

CharacterRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Name cannot contain non alphanumeric characters.').isAlphaNumerica(),
  check('Class', 'Class is required').not().isEmpty(),
  check('Race', 'Race is required').not().isEmpty(),
  check('Strength', 'Strength is required').not().isEmpty(),
  check('Dexterity', 'Dexterity is required').not().isEmpty(),
  check('Constitution', 'Constititution is required').not().isEmpty(),
  check('Intelligence', 'Intelligence is required').not().isEmpty(),
  check('Wisdom', 'Wisdom is required').not().isEmpty(),
  check('Charisma', 'Charisma is required').not().isEmpty()
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Character.findOne({ Name: req.body.Name })
    .then((feat) => {
      if (feat) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        Character.create({
          Name: req.body.Name,
          Class: req.body.Class,
          Race: req.body.Race,
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
          .then((feat) => { res.status(201).json(feat) })
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

CharacterRouter.put('/:Name', (req, res) => {
  let obj = {};
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Class) {
    obj.Class = req.body.Class
  }
  if (req.body.Race) {
    obj.Class = req.body.Class
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
  Character.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
    { new: true },
    (err, updatedFeat) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedFeat);
      }
    });
});

CharacterRouter.delete('/:Name', (req, res) => {
  Character.findOneAndDelete({ Name: req.params.Name })
    .then((feat) => {
      if (!feat) {
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

module.exports = CharactersRouter