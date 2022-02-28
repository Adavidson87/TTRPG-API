// imports
const express = require('express'),
  InventoryItemsRouter = express.Router(),
  Models = require('../models.js'),
  InventoryItems = Models.InventoryItem,
  // passport = require('passport'),
  { check, validationResult } = require('express-validator');

InventoryItemsRouter.get('/', 
// passport.authenticate('jwt', { session: false }), 
(req, res) => {
  InventoryItem.find().then((inventoryItems) => {
    res.status(201).json(inventoryItems);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

InventoryItemsRouter.get('/:Name',
//  passport.authenticate('jwt', { session: false }), 
 (req, res) => {
  InventoryItems.findOne({ Name: req.params.Name }).then((inventoryItems) => {
    res.json(inventoryItems);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
}); 

InventoryItemsRouter.get('/:Type',
//  passport.authenticate('jwt', { session: false }), 
 (req, res) => {
  InventoryItems.findOne({ Type: req.params.Type }).then((inventoryItems) => {
    res.json(inventoryItems);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
}); 

InventoryItemsRouter.post('/', [
  check('Name', 'Name is required').not().isEmpty(),
  check('Name', 'Name cannot contain non alphanumeric characters.').isAlphanumeric(),
  check('Description', 'Description is required'),
  check('Type', 'Type is required').not().isEmpty(),
  check('Value', 'Value is required').not().isEmpty(),
], (req, res) => {
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
          Value: req.body.Value
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

InventoryItemsRouter.put('/:Name', (req, res) => {
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

InventoryItemsRouter.delete('/:Name', (req, res) => {
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