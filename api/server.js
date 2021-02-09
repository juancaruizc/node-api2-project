// implement your server here
// require your posts router and connect it here

const express = require('express');
const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send('Hello from Mars');
});

module.exports = server;
