const express = require('express');

const server = express();

server.use(express.json());
server.get('/', (req, res) => {
  res.status(200).json('Api exposed at /api/users')
})
server.use('/api/users');

server.listen(4000, () => {
  console.log('Server running at localhost:3000')
})