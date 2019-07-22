const router = require('express').Router();
const { validateUserBody, validateUser } = require('./user.middleware');
const { createUser, getUsers } = require('./user.model');

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
    const createdUser = await createUser(req.body);
    if (createdUser) {
      res.status(201).json(createUser);
    } else {
      res
        .status(404)
        .json({ message: 'could not retrieve the newly created user' });
    }
  } catch (error) {
    res.status(500).json({ message: 'could not create user' });
  }
});

module.exports = router;
