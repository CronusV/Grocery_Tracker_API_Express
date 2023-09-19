// Make sure the req has the correct items and set flag accordingly
function validateNewItem(req, res, next) {
  const body = req.body;
  // Using 'in' for bought because if false then it will set body.valid to false
  if (
    !body.name ||
    !body.quantity ||
    !body.price ||
    !body.category ||
    !'bought' in body
  ) {
    body.valid = false;
    next();
  } else {
    body.valid = true;
    next();
  }
}
// Make sure attribute grocery_id is given
function validateGroceryItemID(req, res, next) {
  const body = req.body;
  body.valid = body.grocery_id ? true : false;
  next();
}
// This function makes sure when updating that SOMETHING is being updated, else set body.valid to false
function validateGroceryUpdate(req, res, next) {
  const body = req.body;
  // Already invalid groceryItemID so just continue (assuming chained fn validateNewItem before)
  if (!body.valid && 'valid' in body) {
    next();
  }
  // Checking to see if changing at least ONE attribute
  if (
    body.name ||
    body.quantity ||
    body.category ||
    body.price ||
    'bought' in body
  ) {
    body.valid = true;
    next();
  } else {
    body.valid = false;
    next();
  }
}
module.exports = {
  validateNewItem,
  validateGroceryItemID,
  validateGroceryUpdate,
};
