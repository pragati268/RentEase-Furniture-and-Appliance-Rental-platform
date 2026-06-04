import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true, // Include cookies in requests
});

export const addToWishlist = async (productId) => {
  return await API.post(`/wishlist/add/${productId}`);
};

export const removeFromWishlist = async (productId) => {
  return await API.delete(`/wishlist/remove/${productId}`);
};

export default API;