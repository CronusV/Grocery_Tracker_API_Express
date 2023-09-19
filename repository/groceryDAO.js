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

// UPDATE item with grocery id
function updateGroceryItemByID(grocery_id, item) {
  const ExpressionAttributeNames = {};
  const ExpressionAttributeValues = {};
  const expressions = [];
  // Going to update if req body has correct key value and not empty
  if (item.name !== undefined && item.name !== '') {
    ExpressionAttributeNames['#name'] = 'name';
    ExpressionAttributeValues[':name'] = item.name;
    expressions.push('#name = :name');
  }
  if (item.quantity !== undefined && item.quantity !== '') {
    ExpressionAttributeNames['#quantity'] = 'quantity';
    ExpressionAttributeValues[':quantity'] = item.quantity;
    expressions.push('#quantity = :quantity');
  }
  if (item.price !== undefined && item.price !== '') {
    ExpressionAttributeNames['#price'] = 'price';
    ExpressionAttributeValues[':price'] = item.price;
    expressions.push('#price = :price');
  }
  if (item.bought !== undefined && item.bought !== '') {
    ExpressionAttributeNames['#bought'] = 'bought';
    ExpressionAttributeValues[':bought'] = item.bought;
    expressions.push('#bought = :bought');
  }
  if (item.category !== undefined && item.category !== '') {
    ExpressionAttributeNames['#category'] = 'category';
    ExpressionAttributeValues[':category'] = item.category;
    expressions.push('#category = :category');
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

  console.log(`In updateDAO with params:\n${JSON.stringify(params)}`);
  return docClient.update(params).promise();
}
module.exports = {
  addGroceryItem,
  getGroceryItemByID,
  retrieveAllGroceryItems,
  deleteGroceryItemByID,
  updateGroceryItemByID,
};
