export interface User {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category;
  inventory?: { quantity: number };
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Cart {
  id: number;
  items: CartItem[];
  createdAt: string;
}

export interface OrderItem {
  id: number;
  product: Product;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: number;
  orderDate: string;
  totalAmount: number;
  status: string;
  items: OrderItem[];
}

export interface Review {
  id: string;
  productId: number;
  userId: number;
  authorName: string;
  rating: number;
  comment: string;
  createdAt: string;
}