// imports
const express = require('express'),
  morgan = rquire('morgan'),
  bodyParser = require('body-parser'),
  uuid = require('uuid'),


const app = express();

//
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

// gets user data
app.get('/users', (req, res) => {
  res.send('Users');
});

// tells app to listen on port 8080
app.listen(8080, () => {
  console.log('Your app is listening on port 8080');
});