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

module.exports = {
  validateUser,
  validateUserBody,
  validateLogin
};
