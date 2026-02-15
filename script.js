// products data
const products = [
  {
    id: 1, name: "Illuminating Gift Set - Vanilla yum", price: 5500, image: "set1.jpg"
  },
  { id: 2, name: "Illuminating Gift Set - Citrus crazy", price: 5500, image: "set2.jpg" },

  { id: 3, name: "Walking Bakery Body Butter", price: 2500, image: "butter1.jpg" },
  {id: 4, name: "Lucky Lemon Body Butter", price: 2500, image: "butter2.jpg" },

  { id: 5, name: "Walking Bakery Body Oil", price: 2500, image: "oil1.jpg" },
  { id: 6, name: "Lucky Lemon Body Oil", price: 2500, image: "oil2.jpg" },

  { id: 7, name: "Vanilla Yum Candle", price: 1500, image: "candle1.jpg" },
  { id: 8, name: "Citrus Crazy Candle", price: 1500, image: "candle2.jpg" }
];

// cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const generateUniqueId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
}
const formatPrice = (price) => {
  return price.toLocaleString('en-US', { style: 'currency', currency: 'KES' });
}
const saveCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (product) {
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    saveCart();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
}

function updateCartItemQuantity(productId, quantity) {
  const item = cart.find(item => item.id === productId);
  if (item) {
    item.quantity = quantity;
    saveCart();
  }
}

function displayProducts() {
  const shopSection = document.querySelector('.shop-section');  
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

function displayCart() {
  const cartItemsContainer = document.getElementById('cart-items');
  cartItemsContainer.innerHTML = '';
  cart.forEach(item => {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div>
        <h4>${item.name}</h4>
        <p>${formatPrice(item.price)}</p>
        <input type="number" min="1" value="${item.quantity}" onchange="updateCartItemQuantity(${item.id}, this.value)">
        <button onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    cartItemsContainer.appendChild(cartItem);
  });
}
    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>${formatPrice(product.price)}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    shopSection.appendChild(productCard);
  });
}

function calculateTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
} 