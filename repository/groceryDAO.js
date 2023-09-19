const AWS = require('aws-sdk');
AWS.config.update({
  region: 'us-east-1',
});
// Interface to DynamoDB
const docClient = new AWS.DynamoDB.DocumentClient();
// This is table name in dynamoDB
const TableName = 'groceryDB';

// Create
function addGroceryItem(grocery_id, name, quantity, price, bought, category) {
  console.log('In addGrocery');
  const params = {
    TableName,
    Item: {
      grocery_id,
      name,
      quantity,
      price,
      bought,
      category,
    },
  };
  return docClient.put(params).promise();
}

// GET (using id)
function getGroceryItemByID(grocery_id) {
  const params = {
    TableName,
    Key: {
      grocery_id,
    },
  };
  return docClient.get(params).promise();
}

// GET all grocery items
function retrieveAllGroceryItems() {
  const params = {
    TableName,
  };

  return docClient.scan(params).promise();
}

// DELETE item with grocery id
function deleteGroceryItemByID(grocery_id) {
  const params = {
    TableName,
    Key: {
      grocery_id,
    },
  };
  return docClient.delete(params).promise();
}

// UPDATE item with grocery id, and depending on what the req body is then update accordingly
function updateGroceryItemByID(grocery_id, item) {
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};
  const expressions = [];
  // Going to update if req body has correct key value and not empty
  if (item.name !== undefined && item.name !== '') {
    expressions.push('#name = :name');
    ExpressionAttributeNames['#name'] = 'name';
    ExpressionAttributeValues[':name'] = item.name;
  }
  if (item.quantity !== undefined && item.quantity !== '') {
    expressions.push('#quantity = :quantity');
    ExpressionAttributeNames['#quantity'] = 'quantity';
    ExpressionAttributeValues[':quantity'] = item.quantity;
  }
  if (item.price !== undefined && item.price !== '') {
    expressions.push('#price = :price');
    ExpressionAttributeNames['#price'] = 'price';
    ExpressionAttributeValues[':price'] = item.price;
  }
  if (item.bought !== undefined && item.bought !== '') {
    expressions.push('#bought = :bought');
    ExpressionAttributeNames['#bought'] = 'bought';
    ExpressionAttributeValues[':bought'] = item.bought;
  }
  if (item.category !== undefined && item.category !== '') {
    expressions.push('#category = :category');
    ExpressionAttributeNames['#category'] = 'category';
    ExpressionAttributeValues[':category'] = item.category;
  }
  // Join expressions into one to update what's necessary
  const UpdateExpression = `set ${expressions.join(', ')}`;

  const params = {
    TableName,
    Key: {
      grocery_id,
    },
    UpdateExpression,
    ExpressionAttributeNames,
    ExpressionAttributeValues,
  };

  return docClient.update(params).promise();
}
module.exports = {
  addGroceryItem,
  getGroceryItemByID,
  retrieveAllGroceryItems,
  deleteGroceryItemByID,
  updateGroceryItemByID,
};
