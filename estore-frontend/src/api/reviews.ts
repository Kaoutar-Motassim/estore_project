import api from './axios';

export const getReviewsByProduct = (productId: number) =>
  api.get(`/reviews/product/${productId}`);

export const createReview = (data: {
  productId: number;
  userId: number;
  authorName: string;
  rating: number;
  comment: string;
}) => api.post('/reviews', data);