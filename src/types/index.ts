export type CategoryType = 'men' | 'women' | 'sneakers' | 'accessories' | 'watches';

export type GenderType = 'men' | 'women' | 'unisex';

export interface ProductColor {
  name: string;
  hex: string;
  imageIndex?: number;
}

export interface ProductReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  details: string[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  category: CategoryType;
  gender: GenderType;
  images: string[];
  colors: ProductColor[];
  sizes: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  isFeaturedSneaker?: boolean;
  inStock: boolean;
  stockCount: number;
  careInstructions: string[];
  material: string;
  sku: string;
  reviews?: ProductReview[];
}

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface FilterState {
  category: string;
  gender: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  search: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  deliveryMethod: string;
  paymentMethod: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  title: string;
  publication?: string;
  avatar?: string;
  rating: number;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  addresses: ShippingAddress[];
  orders: Order[];
}
