const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const usersRouter = require('./users/user.router');
const { db } = require('./users/user.model');

const server = express();
const PORT = process.env.PORT || 4000;

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use(
  session({
    name: 'sessionId', // name of the cookie
    secret: 'keep it secret, keep it long', // we intend to encrypt
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
      httpOnly: true
    },
    resave: false,
    saveUninitialized: true,
    // extra chunk of config
    store: new KnexSessionStore({
      knex: db, // configured instance of knex
      tablename: 'sessions', // table that will store sessions inside the db, name it anything you want
      sidfieldname: 'sid', // column that will hold the session id, name it anything you want
      createtable: true, // if the table does not exist, it will create it automatically
      clearInterval: 1000 * 60 * 60 // time it takes to check for old sessions and remove them from the database to keep it clean and performant
    })
  })
);

server.get('/', (req, res) => {
  res.status(200).json('Api exposed at /api/users');
});
server.use('/api', usersRouter);

server.listen(PORT, () => {
  console.log('Server running at localhost:4000');
});
