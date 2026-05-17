import api from './axios';

export const createOrder = (userId: number) =>
  api.post('/orders', { userId });

export const getOrdersByUser = (userId: number) =>
  api.get(`/orders/user/${userId}`);

export const getOrdersBySeller = (sellerId: number) =>
  api.get(`/orders/seller/${sellerId}`);

export const updateOrderStatus = (orderId: number, status: string) =>
  api.put(`/orders/${orderId}/status`, { status });

export const getAllOrders = () => api.get('/orders');
