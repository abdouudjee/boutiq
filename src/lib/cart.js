let cart = [];

const CART_KEY = 'cart_items';

function isBrowser() {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

function loadCartFromStorage() {
  if (isBrowser()) {
    const data = localStorage.getItem(CART_KEY);
    cart = data ? JSON.parse(data) : [];
  }
}

function saveCart() {
  if (isBrowser()) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
}

function addItem(item) {
  cart.push(item);
  saveCart();
}

function removeItem(index) {
  if (index >= 0 && index < cart.length) {
    cart.splice(index, 1);
    saveCart();
  }
}

function getItems() {
  return cart;
}

function getLength() {
  return cart.length;
}

function getTotal() {
  return cart.reduce((total, item) => total + item.price, 0);
}

function clearCart() {
  cart = [];
  saveCart();
}

export {
  loadCartFromStorage,
  addItem,
  removeItem,
  getItems,
  getLength,
  getTotal,
  clearCart
};
