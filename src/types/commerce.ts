export type ProductStatus = 'Active' | 'Draft' | 'Archived';

export type OrderStatus = 'Paid' | 'Preparing' | 'Shipped' | 'Delivered' | 'Cancelled';

export type ProductColor = {
  hex: string;
  name: string;
};

export type Product = {
  brand: string;
  care: string;
  category: string;
  colors: ProductColor[];
  description: string;
  fit: string;
  id: string;
  images: string[];
  isFeatured: boolean;
  isNew: boolean;
  isVisible: boolean;
  materials: string[];
  name: string;
  originalPrice?: number;
  price: number;
  sizes: string[];
  status: ProductStatus;
  stockBySize: Record<string, number>;
};

export type CartItem = {
  brand: string;
  image: string;
  name: string;
  price: number;
  productId: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
};

export type Order = {
  createdAt: string;
  customerName: string;
  id: string;
  items: CartItem[];
  paymentMethod: string;
  shippingAddress: string;
  status: OrderStatus;
  total: number;
};

export type Collection = {
  id: string;
  image: string;
  productIds: string[];
  subtitle: string;
  title: string;
};

export type ProductFilters = {
  availability?: 'all' | 'in-stock' | 'low-stock' | 'sold-out';
  category?: string;
  color?: string;
  material?: string;
  maxPrice?: number;
  minPrice?: number;
  size?: string;
};

export type ProductSort = 'newest' | 'price-asc' | 'price-desc' | 'bestselling';

