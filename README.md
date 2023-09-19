# Grocer_Tracker_API_Express
# Basic API

This activity involves using the Node.js `express` module, to create a basic API based on the grocery shopping tracker. Interactions between the client and the server will be managed using Postman, and HTTP requests. The user should be able to view, create, edit, and delete grocery items on the server.

## Requirements

- Node.js http module server
- Logging with Winston
- As a client, you must be able to:
    - View the grocery list
        - GET
        - Can also get individual item with grocery_d
    - Add an Item
        - POST
    - Edit an Item
        - PUT
    - Delete an Item
        - DELETE
- The Item
    - name
    - price
    - quantity
    - purchased
    - category
- HTTP Methods and Status Codes must be used
- Any data that is transferred must be in JSON format
- Use Postman to handle testing your API
- No testing

You do not need to handle authentication, persisting of the data, or a frontend. Verify the behavior of the API using Postman and JSON messages from the server as responses.

## Useful Resources

- [Winston Tutorial](https://stackify.com/winston-logging-tutorial/)
- [Node HTTP](https://nodejs.org/en/docs/guides/anatomy-of-an-http-transaction)
- [Postman Guide](https://learning.postman.com/docs/getting-started/overview/)
- [Express](https://expressjs.com/en/guide/routing.html)
- [DynamoDB_AWS_DocumentClient](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html)