import api from './axios';

export const register = (data: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => api.post('/auth/register', data);

export const login = (data: {
  email: string;
  password: string;
}) => api.post('/auth/login', data);