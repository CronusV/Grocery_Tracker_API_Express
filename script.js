function addCard(id, name, price, quantity, category, bought) {
  // Create a card element
  const card = document.createElement('div');
  card.className = 'col';
  card.innerHTML = `
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">${name}</h5>
      <p class="card-text">ID: ${id}</p>
      <p class="card-text">Price: ${price}</p>
      <p class="card-text">Quantity: ${quantity}</p>
      <p class="card-text">Category: ${category}</p>
      <p class="card-text">Bought: ${bought ? 'Yes' : 'No'}</p>
      </div>
    </div>
  `;
  // Get row to put cards
  const cardRow = document.querySelector('#cardRow');
  // Add new card to row
  cardRow.appendChild(card);
}

// Event listener to check HTTP method used
const selectHTTP = document.querySelector('#httpMethod');
function changeRequiredOnHTTP() {
  const currHTTP = selectHTTP.value;
  if (currHTTP === 'POST') {
    document.getElementById('id').required = false;
    document.getElementById('name').required = true;
    document.getElementById('quantity').required = true;
    document.getElementById('price').required = true;
    document.getElementById('category').required = true;
  }
  if (currHTTP === 'PUT') {
    document.getElementById('id').required = true;
    // Maybe a message here telling user at least one is requried?
    document.getElementById('name').required = false;
    document.getElementById('quantity').required = false;
    document.getElementById('price').required = false;
    document.getElementById('category').required = false;
  }
  if (currHTTP === 'DELETE') {
    document.getElementById('id').required = true;
    // Maybe a message here telling user at least one is requried?
    document.getElementById('name').required = false;
    document.getElementById('quantity').required = false;
    document.getElementById('price').required = false;
    document.getElementById('category').required = false;
  }
}
selectHTTP.addEventListener('change', changeRequiredOnHTTP);

// Even listener for form button
