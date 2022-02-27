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

FeatsRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Name cannot contain non alphanumeric characters.').isAlphaNumerica(),
  check('Description', 'Description is required').not().isEmpty()
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Feats.findOne({ Name: req.body.Name })
    .then((feat) => {
      if (feat) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        Feats.create({
          Name: req.body.Name,
          Description: req.body.Description,
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

FeatsRouter.put('/:Name', (req, res) => {
  let obj = {};
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Description) {
    obj.Description = req.body.Description
  }
  Feats.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
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

FeatsRouter.delete('/:Name', (req, res) => {
  Feats.findOneAndDelete({ Name: req.params.Name })
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

module.exports = FeatsRouter