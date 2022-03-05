// require('dotenv').config();

const express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  mongoose = require('mongoose'),
  Models = require('./models.js'),
  CharacterClasses = Models.CharacterClasses,
  Feats = Models.Feats,
  InventoryItems = Models.InventoryItems,
  Races = Models.Races,
  SavedCharacters = Models.SavedCharacters,
  Spells = Models.Spells,
  Users = Models.Users,
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

mongoose.connect('mongodb://localhost:27017/TTRPG', { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use('/classes', CharacterClassesRouter);
app.use('/feats', FeatsRouter);
app.use('/inventoryItems', InventoryItemsRouter);
app.use('/races', RacesRouter);
app.use('/savedCharacters', CharactersRouter);
app.use('/spells', SpellsRouter);
app.use('/users', UsersRouter);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('common')); /* uses morgan to log errors in morgan's commong methods */
app.use(express.static('public')); /* app uses anything in the public folder */
app.use(methodOverride());
app.get('/', (req, res) => {
  res.send('My Characters');
});
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error');
});

let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');