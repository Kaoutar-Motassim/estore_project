import api from './axios';
import type { CreateListingData } from '../types';

export const getAllProducts = (search?: string, categoryId?: number) => {
  const params: Record<string, unknown> = {};
  if (search) params.search = search;
  if (categoryId) params.categoryId = categoryId;
  return api.get('/products', { params });
};

export const getProductById = (id: number) => api.get(`/products/${id}`);
export const getAllCategories = () => api.get('/categories');
export const createListing = (data: CreateListingData) => api.post('/listings', data);
export const getProductsBySeller = (sellerId: number) => api.get(`/products/seller/${sellerId}`);
export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
