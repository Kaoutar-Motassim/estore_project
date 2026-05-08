import api from './axios';

export const createOrder = (userId: number) =>
  api.post('/orders', { userId });

export const getOrdersByUser = (userId: number) =>
  api.get(`/orders/user/${userId}`);