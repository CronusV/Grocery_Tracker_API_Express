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

// Test function
addCard('dfsfs', 'fsdfsf', 43242, 342, 'fds', true);
addCard('dfsfs', 'fsdfsf', 43242, 342, 'fds', true);
addCard('dfsfs', 'fsdfsf', 43242, 342, 'fds', true);
addCard('dfsfs', 'fsdfsf', 43242, 342, 'fds', true);
addCard('dfsfs', 'fsdfsf', 43242, 342, 'fds', true);
addCard('dfsfs', 'fsdfsf', 43242, 342, 'fds', true);
addCard('dfsfs', 'fsdfsf', 43242, 342, 'fds', true);
