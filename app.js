const groceryDAO = require('./repository/groceryDAO');
// Init Express server
const express = require('express');
const server = express();
const PORT = 3000;
//grocery_id creator
const uuid = require('uuid');

//middleware to parse JSON from req
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// Test
server.get('/', (req, res) => {
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

// GET

// PUT

// DELETE

// Spin up server
server.listen(PORT, () => {
  console.log(`Server is listening on Port: ${PORT}`);
});
