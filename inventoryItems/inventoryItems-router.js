const express = require('express'),
  InventoryItemsRouter = express.Router(),
  Models = require('../models.js'),
  InventoryItems = Models.InventoryItems,
  passport = require('passport'),
  { check, validationResult } = require('express-validator');

// mongoose.connect('mongodb://localhost:27017/TTRPG', { useNewUrlParser: true, useUnifiedTopology: true });

InventoryItemsRouter.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  InventoryItems.findOne().then((inventoryItem) => {
    res.status(201).json(inventoryItem);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

InventoryItemsRouter.get('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  InventoryItems.findOne({ Name: req.params.Name }).then((inventoryItem) => {
    res.json(inventoryItem);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

InventoryItemsRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Description', 'Description is required'),
  check('Type', 'Type is required').not().isEmpty(),
  check('Value', 'Value is required').not().isEmpty(),
], passport.authenticate('jwt', { session: false }), (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  InventoryItems.findOne({ Name: req.body.Name })
    .then((inventoryItem) => {
      if (inventoryItem) {
        return res.status(400).send(req.body.Name + 'already exists');
      } else {
        InventoryItems.create({
          Name: req.body.Name,
          Description: req.body.Description,
          Type: req.body.Type,
          Value: req.body.Value,
          Tag: req.body.Tag
        })
          .then((inventoryItem) => { res.status(201).json(inventoryItem) })
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

InventoryItemsRouter.put('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  let obj = {};
  if (req.body.Name) {
    obj.Name = req.body.Name
  }
  if (req.body.Description) {
    obj.Description = req.body.Description
  }
  if (req.body.Type) {
    obj.Type = req.body.Type
  }
  if (req.body.Value) {
    obj.Value = req.body.Value
  }
  if (req.body.Tag) {
    obj.Value = req.body.Tag
  }
  InventoryItems.findOneAndUpdate({ Name: req.params.Name }, { $set: obj },
    { new: true },
    (err, updatedInventoryItem) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedInventoryItem);
      }
    });
});

InventoryItemsRouter.delete('/:Name', passport.authenticate('jwt', { session: false }), (req, res) => {
  InventoryItems.findOneAndDelete({ Name: req.params.Name })
    .then((inventoryItem) => {
      if (!inventoryItem) {
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

module.exports = InventoryItemsRouter