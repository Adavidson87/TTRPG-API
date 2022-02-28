const express = require('express'),
  UsersRouter = express.Router(),
  Models = require('../models.js'),
  Users = Models.User,
  { check, validationResult } = require('express-validator');

/**
   * @method GET
   * @param {string} endpoint for getting a list of all users in database
   * @return {object} list of all users in database
   */
UsersRouter.get('/', (req, res) => {
  Users.find().then((users) => {
    res.status(201).json(users);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err)
  });
});

/**
 * @method GET 
 * @param {string} endpoint for getting information about a single user from database
 * @param {string} Username for getting the information about a specific user
 * @return {object} of a single user 
 */
UsersRouter.get('/:Username', (req, res) => {
  Users.findOne({ Username: req.params.Username }).then((users) => {
    res.json(users);
  }).catch((err) => {
    console.error(err);
    res.status(500).send('Error: ' + err);
  });
});

/**
 * @method PUT
 * @param {string} endpoint for updating user information
 * @param {string} Username of the user that is having information updated
 * @return {object} of user that has been updated
 */
UsersRouter.put('/:Username', (req, res) => {
  let obj = {};
  if (req.body.Username) {
    obj.Username = req.body.Username
  }
  if (req.body.Password) {
    obj.Password = Password
  }
  if (req.body.Email) {
    obj.Email = req.body.Email
  }
  Users.findOneAndUpdate({ Username: req.params.Username }, { $set: obj },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

/**
 * @method POST
 * @param {string} endpoint that allows a new user to be added
 * @return {object} of newly added user
 */
UsersRouter.post('/', [
  check('Username', 'Username is required').isLength({ min: 5 }),
  check('Username', 'Username contains non alphanumeric characters - not allowed.').isAlphanumeric(),
  check('Password', 'Password is required').not().isEmpty(),
  check('Email', 'Email does not appear to be valid').isEmail()
], (req, res) => {
  let errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  Users.findOne({ Username: req.body.Username }).then((user) => {
    if (user) {
      return res.status(400).send(req.body.Username + 'already exists');
    } else {
      Users.create({
        Username: req.body.Username,
        Password: req.body.Password,
        Email: req.body.Email,
      }).then((user) => { res.status(201).json(user) }).catch((error) => {
        console.error(error);
        res.status(500).send('Error: ' + error);
      })
    }
  })
    .catch((error) => {
      console.error(error);
      res.status(500).send('Error ' + error);
    });
});

/**
 * @method POST
 * @param {string} endpoint for adding characters to character list
 * @param {string} Username for the user's list that is being added to
 * @param {string} CharacterId of the character that is being added to list
 * @return {object} of the user's character list that has been added to
 */
UsersRouter.post('/:Username/savedCharacters/:CharacerId', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $push: { CharacterList: req.params.CharacterId }
  },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

/**
* @method DELETE
* @param {string} endpoint that removes character from user's character list
* @param {string} Username of the user whose list is being used
* @param {string} CharacterId of the character that is being removed
* @return {object} of the user's character list that has had character removed
*/
UsersRouter.delete('/:Username/savedCharacters/:CharacterId', (req, res) => {
  Users.findOneAndUpdate({ Username: req.params.Username }, {
    $pull: { CharacterList: req.params.CharacterId }
  },
    { new: true },
    (err, updatedUser) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error: ' + err);
      } else {
        res.json(updatedUser);
      }
    });
});

/**
* @method DELETE
* @param {string} endpoint for removing user from database
* @param {string} Username of the user being removed
* @return {object} of users with user removed
*/
UsersRouter.delete('/:Username', (req, res) => {
  Users.findOneAndRemove({ Username: req.params.Username })
    .then((user) => {
      if (!user) {
        res.status(400).send(req.params.Username + ' was not found');
      } else {
        res.status(200).send(req.params.Username + ' was deleted.');
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error: ' + err);
    });
});

module.exports = UsersRouter