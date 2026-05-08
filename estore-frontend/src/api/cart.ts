import api from './axios';

export const getCart = (userId: number) =>
  api.get(`/cart/${userId}`);

export const addToCart = (data: {
  userId: number;
  productId: number;
  quantity: number;
}) => api.post('/cart/add', data);

export const updateCartItem = (data: {
  cartItemId: number;
  quantity: number;
}) => api.put('/cart/update', data);

export const removeCartItem = (cartItemId: number) =>
  api.delete(`/cart/remove/${cartItemId}`);