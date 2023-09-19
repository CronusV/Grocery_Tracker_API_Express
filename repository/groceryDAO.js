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

module.exports = { addGroceryItem, getGroceryItemByID };
