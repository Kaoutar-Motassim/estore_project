import api from './axios';

export const getAllProducts = (search?: string, categoryId?: number) => {
  const params: any = {};
  if (search) params.search = search;
  if (categoryId) params.categoryId = categoryId;
  return api.get('/products', { params });
};

export const getProductById = (id: number) =>
  api.get(`/products/${id}`);

export const getAllCategories = () =>
  api.get('/categories');