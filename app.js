const groceryDAO = require('./repository/groceryDAO');
// Logger
const { createLogger, transports, format } = require('winston');
// Init Express server
const express = require('express');
const server = express();
const PORT = 3000;
// router
const APIRouter = require('./routes/APIRouter');
//middleware to parse JSON from req
const bodyParser = require('body-parser');
server.use(bodyParser.json());
// Using router with base url
server.use('/api', APIRouter);
// Logger init
const logger = createLogger({
  level: 'info', // this will log only messages with the level 'info' and above
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    new transports.Console(), // log to the console
    new transports.File({ filename: 'app.log' }), // log to a file
  ],
});

// Test
server.get('/', (req, res) => {
  console.log(req);
  console.log('Hello world, this works in get using Express!');
  groceryDAO
    .addGroceryItem(uuid.v4(), 'strawberry', 5, 20, true, 'fruit')
    .then((data) => {
      // Successful entry to dynamoDB does not return anything but {}
      res.send({
        message: 'Successfully Added Item!',
        data,
      });
    })
    .catch((err) => {
      res.send({ message: 'Failed to Add Item', err });
    });
});

// POST
// Done with router
// GET

// PUT

// DELETE

// Spin up server
server.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});

module.exports = { logger };
