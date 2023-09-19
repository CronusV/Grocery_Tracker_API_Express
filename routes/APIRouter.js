const express = require('express');
const router = express.Router();
// const { logger } = require('../app');
//grocery_id creator
const uuid = require('uuid');
const middleware = require('../middlewares/middleware');
const groceryDAO = require('../repository/groceryDAO');

// Logger
const { createLogger, transports, format } = require('winston');
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

router.post('/grocery-add', middleware.validateNewItem, (req, res) => {
  const item = req.body;
  if (item.valid) {
    groceryDAO
      .addGroceryItem(
        uuid.v4(),
        item.name,
        item.quantity,
        item.price,
        item.bought,
        item.category
      )
      .then((data) => {
        logger.info(`Successful POST:\n ${JSON.stringify(item)}`);
        res.status(201).send({
          message: 'Successfully Added Item!',
        });
      })
      .catch((err) => {
        logger.info('Failed to add item to dynamoDB');
        res.status(400).send({ message: `Failed to add item: ${err}` });
      });
  } else {
    logger.info(
      'Failed to add item because missing either name, quantity, price or category'
    );
    res.status(400).send({
      message:
        'Invalid grocery item because missing either name, quantity, price or category',
    });
  }
});

router.get('/grocery-by-id', middleware.validateGroceryItemID, (req, res) => {
  if (req.body.valid) {
    const grocery_id = req.body.grocery_id;
    groceryDAO
      .getGroceryItemByID(grocery_id)
      .then((data) => {
        res
          .status(200)
          .send({ message: `Successfully received item!`, item: data });
      })
      .catch((err) => {
        logger.info('Failed to get item from dynamoDB');
        res
          .status(400)
          .send({ message: `Failed to get item from dynamoDB: ${err}` });
      });
  } else {
    res.status(400).send({ message: 'Need to include grocery_id in body' });
  }
});

module.exports = router;
