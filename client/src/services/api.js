import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export const addToWishlist = async (productId) => {
  return await API.post(`/wishlist/add/${productId}`);
};

export const removeFromWishlist = async (productId) => {
  return await API.delete(`/wishlist/remove/${productId}`);
};

export default API;