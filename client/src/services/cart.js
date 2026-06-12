const CART_KEY = "rentease_cart";

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
};

export const addToCart = (product) => {
  const cart = getCart();
  if (!cart.some((item) => item._id === product._id)) {
    cart.push(product);
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }
  return cart;
};

export const removeFromCart = (productId) => {
  const cart = getCart().filter((item) => item._id !== productId);
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  return cart;
};

export const clearCart = () => {
  localStorage.removeItem(CART_KEY);
  return [];
};
