// Make sure the req has the correct items
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

function validateGroceryItemID(req, res, next) {
  const body = req.body;
  body.valid = body.grocery_id ? true : false;
  next();
}
module.exports = { validateNewItem, validateGroceryItemID };
