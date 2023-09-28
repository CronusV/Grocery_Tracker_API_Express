const groceryDAO = require('./repository/groceryDAO');

// Init Express server
const express = require('express');
const server = express();
const PORT = 3000;
// router
const APIRouter = require('./routes/APIRouter');
// Enable cors to test api with front end
const cors = require('cors');
server.use(cors());
//middleware to parse JSON from req
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// Using router with base /api url
server.use('/api', APIRouter);

// Spin up server
server.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});
