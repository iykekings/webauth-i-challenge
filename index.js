const express = require('express');
const usersRouter = require('./users/user.router');

const server = express();

server.use(express.json());
server.get('/', (req, res) => {
  res.status(200).json('Api exposed at /api/users');
});
server.use('/api', usersRouter);

server.listen(4000, () => {
  console.log('Server running at localhost:4000');
});
