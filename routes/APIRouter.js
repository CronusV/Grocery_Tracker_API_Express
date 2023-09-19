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
// Adds new grocery item
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
//Returns grocery with id
router.get('/grocery-by-id', middleware.validateGroceryItemID, (req, res) => {
  if (req.body.valid) {
    const grocery_id = req.body.grocery_id;
    groceryDAO
      .getGroceryItemByID(grocery_id)
      .then((data) => {
        if ('Item' in data) {
          const item = data.Item;
          logger.info(
            `Successful GET with grocery id: ${grocery_id}\n item: ${JSON.stringify(
              item
            )}`
          );
          res
            .status(200)
            .send({ message: `Successfully received item!`, item });
        } else {
          logger.info(
            'Unsuccesful GET with grocer id because id does not exist'
          );
          res
            .status(200)
            .send({ message: 'Not grocery item found with that ID!' });
        }
      })
      .catch((err) => {
        logger.info('Failed to get item from dynamoDB');
        res
          .status(400)
          .send({ message: `Failed to get item from dynamoDB: ${err}` });
      });
  } else {
    logger.info('Failed to get because need to include grocery_id in body');
    res.status(400).send({ message: 'Need to include grocery_id in body' });
  }
});

// Returns all of the grocerylist
router.get('/grocery-list', (req, res) => {
  groceryDAO.retrieveAllGroceryItems().then((data) => {
    logger.info(`GET all grocery items\n${JSON.stringify(data)}`);
    res
      .status(200)
      .send({ message: 'Retrieved items from grocery database', data });
  });
});

// Delete item with id
router.delete('/', middleware.validateGroceryItemID, (req, res) => {
  if (req.body.valid) {
    const grocery_id = req.body.grocery_id;
    groceryDAO
      .deleteGroceryItemByID(grocery_id)
      .then((data) => {
        // If successful then data returns nothing
        logger.info(`Successfully deleted item ${grocery_id}`);
        res
          .status(200)
          .send({ message: `Successfully deleted item ${grocery_id}` });
      })
      .catch((err) => {
        logger.info(`Could not find grocery item to delete: ${grocery_id}`);
        res
          .status(400)
          .send(`Could not find grocery item to delete: ${grocery_id}`);
      });
  } else {
    logger.info('Failed to get because need to include grocery_id in body');
    res.status(400).send({ message: 'Need to include grocery_id in body' });
  }
});

// Update item with id
router.put(
  '/grocery-edit',
  middleware.validateGroceryItemID,
  middleware.validateGroceryUpdate,
  (req, res) => {
    if (req.body.valid) {
      const grocery_id = req.body.grocery_id;
      console.log(`In post with body: ${JSON.stringify(req.body)}`);
      groceryDAO
        .updateGroceryItemByID(grocery_id, req.body)
        .then((data) => {
          logger.info(`Successfully updated item: ${grocery_id}`);
          res
            .status(200)
            .send({ message: `Successfully updated item ${grocery_id}` });
        })
        .catch((err) => {
          logger.info(`Unable to update item ${grocery_id} in dynamoDB`);
          res.status(500).send({
            message: `Unable to update item ${grocery_id} in dynamoDB`,
          });
        });
    } else {
      logger.info('Failed to get because need to include grocery_id in body');
      res.status(400).send({ message: 'Need to include grocery_id in body' });
    }
  }
);
module.exports = router;
