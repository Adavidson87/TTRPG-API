// imports
const express = require('express'),
  InventoryItemsRouter = express.Router(),
  Models = require('../models.js'),
  InventoryItems = Models.InventoryItem;
  // passport = require('passport'),
  // { check, validateionResult } = require('express-validator');

InventoryItemsRouter.get('/', 
// passport.authenticate('jwt', { session: false }), 
(req, res) => {
  InventoryItem.find().then((InventoryItems) => {
    res.status(201).json(InventoryItems);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

InventoryItemsRouter.get('/:Name',
//  passport.authenticate('jwt', { session: false }), 
 (req, res) => {
  InventoryItems.findOne({ Name: req.params.Name }).then((InventoryItems) => {
    res.json(InventoryItems);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
}); 

InventoryItemsRouter.get('/:Type',
//  passport.authenticate('jwt', { session: false }), 
 (req, res) => {
  InventoryItems.findOne({ Type: req.params.Type }).then((InventoryItems) => {
    res.json(InventoryItems);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
}); 

module.exports = InventoryItemsRouter