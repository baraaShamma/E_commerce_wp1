
// Function to handle adding an item to cart
function addToCart(name, price, img) {
  // Check if the item already exists in the cart
  let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
  let existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    // If the item already exists, update its quantity
    existingItem.quantity += 1;
  } else {
    // If it's a new item, add it to the cart
    cart.push({ name: name, price: price, img: img, quantity: 1 });
  }

  // Save the updated cart back to localStorage
  localStorage.setItem('cart', JSON.stringify(cart));
  event.preventDefault();

}


// Function to display cart items
function displayCart() {
  // Retrieve cart items from localStorage
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  // Select the element to display cart items
  let cartList = document.getElementById('cart-items');
  cartList.innerHTML = '';

  // Loop through cart items and display them
  cartItems.forEach(item => {
    let listItem = document.createElement('li');
    listItem.textContent = `${item.name} - $${item.price} - Quantity: ${item.quantity}`;

    // Add buttons for increasing, decreasing, and removing quantity
    let increaseButton = document.createElement('button');
    increaseButton.textContent = '+';
    increaseButton.onclick = function () { increaseQuantity(item.name); };

    let decreaseButton = document.createElement('button');
    decreaseButton.textContent = '-';
    decreaseButton.onclick = function () { decreaseQuantity(item.name); };

    let removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () { removeFromCart(item.name); };

    listItem.appendChild(increaseButton);
    listItem.appendChild(decreaseButton);
    listItem.appendChild(removeButton);

    cartList.appendChild(listItem);
  });
}

// Function to increase quantity
function increaseQuantity(name) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cartItems.find(item => item.name === name);
  if (item) {
    item.quantity += 1;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }
}

// Function to decrease quantity
function decreaseQuantity(name) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let item = cartItems.find(item => item.name === name);
  if (item && item.quantity > 1) {
    item.quantity -= 1;
    localStorage.setItem('cart', JSON.stringify(cartItems));
    displayCart();
  }
}

// Function to remove item from cart
function removeFromCart(name) {
  let cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  let updatedCart = cartItems.filter(item => item.name !== name);
  localStorage.setItem('cart', JSON.stringify(updatedCart));
  displayCart();
}

// Display cart when the page loads
displayCart();
