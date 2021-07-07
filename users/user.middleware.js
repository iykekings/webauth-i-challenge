const { getUsers } = require('./user.model');

const validateUser = async (req, res, next) => {
  try {
    const user = await getUsers(req.id);
    if (user) {
      next();
    } else {
      res.status(404).json("User doesn't exist");
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't validate the user" });
  }
};

const validateUserBody = (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (firstName && lastName && email && password) {
    next();
  } else {
    res.status(400).json({
      message:
        'please provide the firstName, lastName, email and password for the user'
    });
  }
};
const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    next();
  } else {
    res.status(400).json({
      message: 'please provide email and password'
    });
  }
};
const authenticateUser = (req, res, next) => {
  if (req.session && req.session.user) {
    // for this to succeed
    // 1- request from postman contains a "Cookie" with session id
    // 2- there actually exists a session in the sessions array
    //        with an id that matches the one in the cookie
    // 3- the cookie hasn't expired
    next();
  } else {
    res.status(400).json({ message: 'No credentials provided' });
  }
};

module.exports = {
  validateUser,
  validateUserBody,
  validateLogin,
  authenticateUser
};
