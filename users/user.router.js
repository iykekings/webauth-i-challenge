const router = require('express').Router();
const {
  // createUser,
  getUsers
} = require('./user.model');

router.get('/', async (req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'unable to retrieve users' });
  }
});

module.exports = router;
