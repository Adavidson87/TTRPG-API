// require('dotenv').config();

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  characterClass = Models.CharacterClass,
  Feat = Models.Feat,
  InventoryItem = Models.InventoryItem,
  Race = Models.Race,
  Character = Models.SavedCharacter,
  Spell = Models.Spell,
  User = Models.User,
  config = require('./config.js'),
  CharacterClassesRouter = require('./classes/classes-router'),
  FeatsRouter = require('./feats/feats-router'),
  InventoryItemsRouter = require('./inventoryItems/inventoryItems-router'),
  RacesRouter = require('./races/races-router'),
  CharactersRouter = require('./savedCharacters/savedCharacters-router'),
  SpellsRouter = require('./spells/spells-router'),
  UsersRouter = require('./users/users-router'),
  { check, validationResult } = require('express-validator'),
  methodOverride = require('method-override');




const app = express();


app.use(express.static('public'));
app.use(express.json());
app.use(morgan('common'));
app.use('/classes', CharacterClassesRouter);
app.use('/feats', FeatsRouter);
app.use('/inventoryItems', InventoryItemsRouter);
app.use('/races', RacesRouter);
app.use('/savedCharacters', CharactersRouter);
app.use('/spells', SpellsRouter);
app.use('/users', UsersRouter);
app.use(bodyParser.json());

// uses morgan to log errors in morgan's commong methods
app.use(morgan('common'));

// app uses anything in the public folder
app.use(express.static('public'));

// logs errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error');
});

// gets main landing page
app.get('/', (req, res) => {
  res.send('My Characters');
});

app.use(methodOverride());

// tells app to listen on port 8080
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});