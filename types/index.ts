/**
 * TypeScript types and interfaces for the e-commerce app
 */

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  image: string | number;
  images?: Array<string | number>;
  description?: string;
  category: string;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  /** Optional background color (hex) used to tint product image area to match imagery */
  backgroundColor?: string;
}

export interface Category {
  id: string;
  name: string;
  image: string | number;
  productCount: number;
  slug: string;
  /** Optional background color (hex) used to tint category cards to match imagery */
  backgroundColor?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle?: string;
  image: string | number;
  discount?: string;
  actionText?: string;
  backgroundColor?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export type TabRoutes = 'index' | 'shop' | 'favorites' | 'account';
