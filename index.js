// require('dotenv').config();

const express = require('express'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),
  app = express(),
  port = process.env.PORT || 8080,
  config = require('./config.js'),
  CharacterClassesRouter = require('./classes/classes-router'),
  FeatsRouter = require('./feats/feats-router'),
  InventoryItemsRouter = require('./inventoryItems/inventoryItems-router'),
  RacesRouter = require('./races/races-router'),
  CharactersRouter = require('./savedCharacters/savedCharacters-router'),
  SpellsRouter = require('./spells/spells-router'),
  UsersRouter = require('./users/users-router'),
  mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });

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
app.use(morgan('common'));
app.use(express.static('public'));
app.use(methodOverride());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error');
});
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      let message = "The CORS policy of this application doesn't allow access from origin " + origin;
      return callback(new Error(message), false);
    }
    return callback(null, true);
  }
}));
let allowedOrigins = ['https://localhost:8080', 'http://localhost:1234', 'http://localhost:4200', 'https://adavidson87.github.io/ttrpg-character-sheet']
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');


app.get('/', (req, res) => {
  res.send('My Characters');
});

app.listen(port, '0.0.0.0', () => {
  console.log('Your app is listening on port' + port);
});