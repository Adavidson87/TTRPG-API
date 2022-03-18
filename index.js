const express = require('express'),
  morgan = require('morgan'),
  methodOverride = require('method-override'),
  bodyParser = require('body-parser'),
  app = express(),
  CharacterClassesRouter = require('./classes/classes-router'),
  FeatsRouter = require('./feats/feats-router'),
  InventoryItemsRouter = require('./inventoryItems/inventoryItems-router'),
  RacesRouter = require('./races/races-router'),
  CharactersRouter = require('./savedCharacters/savedCharacters-router'),
  SpellsRouter = require('./spells/spells-router'),
  UsersRouter = require('./users/users-router'),
  mongoose = require('mongoose'),
  cors = require('cors');

// mongoose.connect(process.env.CONNECTION_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost:27017/TTRPG-API', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors(
  {
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        let message = "The CORS policy of this application doesn't allow access from origin " + origin;
        return callback(new Error(message), false);
      }
      return callback(null, true);
    }
  }
));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:1234', 'http://localhost:8080', 'https://adavidson87.github.io/ttrpg-character-sheet');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Origin, Accept');
  res.setHeader('Access-Control-Allow-Credentials', true);
  // handle OPTIONS method
  if ('OPTIONS' == req.method) {
    return res.sendStatus(200);
  } else {
    next();
  }
});
let allowedOrigins = ['http://localhost:55785', 'http://localhost:8080', 'http://localhost:1234', 'http://localhost:4200', 'http://localhost:27017', 'https://adavidson87.github.io/ttrpg-character-sheet']
let auth = require('./auth')(app);
const passport = require('passport');
require('./passport');

app.use(express.static('public'));
app.use(express.json());
app.use('/classes', CharacterClassesRouter);
app.use('/feats', FeatsRouter);
app.use('/inventoryItems', InventoryItemsRouter);
app.use('/races', RacesRouter);
app.use('/savedCharacters', CharactersRouter);
app.use('/spells', SpellsRouter);
app.use('/users', UsersRouter);
app.use(morgan('common'));
app.use(express.static('public'));
app.use(methodOverride());
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error');
});

app.get('/', (req, res) => {
  res.send('My Characters');
});
const port = process.env.PORT || 8080;
app.listen(port, '0.0.0.0', () => {
  console.log('Your app is listening on port ' + port);
});