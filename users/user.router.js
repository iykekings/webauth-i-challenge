const router = require('express').Router();
const {
  validateUserBody,
  validateUser,
  validateLogin
} = require('./user.middleware');
const { createUser, getUsers, getUserByEmail } = require('./user.model');
const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(10);

router.get('/users', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'unable to retrieve users' });
  }
});

router.get('/users/:id', validateUser, async (req, res) => {
  try {
    const user = await getUsers(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'unable to retrieve users' });
  }
});

router.post('/register', validateUserBody, async (req, res) => {
  try {
    let user = req.body;
    user.password = bcrypt.hashSync(req.body.password, salt);
    const createdUser = await createUser(user);
    if (createdUser) {
      res.status(201).json(createdUser);
    } else {
      res
        .status(404)
        .json({ message: 'could not retrieve the newly created user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'could not create user' });
  }
});

router.post('/login', validateLogin, async (req, res) => {
  try {
    const loginUser = await getUserByEmail(req.body.email);
    const password = req.body.password;
    const isUser = bcrypt.compareSync(password, loginUser.password);
    if (isUser) {
      res.status(200).json('Logged in Successfully');
    } else {
      res.status(401).json({ message: 'You shall not pass' });
    }
  } catch (error) {
    res.status(500).json({ message: 'could not login, try again' });
  }
});

module.exports = router;
