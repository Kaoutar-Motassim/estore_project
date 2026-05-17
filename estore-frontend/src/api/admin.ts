import api from './axios';

export const getAllUsers = () => api.get('/admin/users');
export const updateUserRole = (userId: number, role: string) =>
  api.put(`/admin/users/${userId}/role`, { role });
export const getAllProducts = () => api.get('/products');
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
