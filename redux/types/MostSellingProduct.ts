export interface IMostSellingRequest {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  subCategoryId?: number;
  subSubCategoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  //period?: 'daily' | 'weekly' | 'monthly' | 'yearly'; // বিক্রির সময়কাল
 // sort?: 'sales_high' | 'sales_low' | 'revenue_high' | 'revenue_low';
}

export interface IMostSellingProductImage {
  id: number;
  url: string;
  alt: string | null;
  productId: number;
}

export interface IMostSellingItemOption {
  id: number;
  image: string;
  title: string;
  price: number;
  sku: string;
  stock: number;
  alt: string | null;
  key: string | null;
  itemId: number;
  productId: number;
}

export interface IMostSellingItem {
  id: number;
  title: string;
  options: IMostSellingItemOption[];
}

export interface IMostSellingUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  password: string;
  dob: string;
  gender: string;
  isAdmin: boolean;
  image: string;
  socketId: string | null;
  pushToken: string;
  marital_status: string;
  anniversary_date: string;
  provider: string;
  token: string | null;
  isModerator: boolean;
  isSeller: boolean;
  updatePasswordAt: string;
  createdAt: string;
  isBlocked: boolean;
  isActive: boolean;
}

export interface IMostSellingProductDeliveryInfo {
  id: number;
  delivery_time: string;
  delivery_charge: number;
  return_days: number;
  delivery_time_outside: string;
  delivery_charge_outside: number;
  multiply: boolean;
  productId: number;
}

export interface IMostSellingProduct {
  id: number;
  title: string;
  slug: string;
  code: string;
  short_description: string;
  meta_title: string;
  meta_image: string;
  meta_alt: string | null;
  payment_type: string;
  video_link: string;
  thumbnail: string;
  thumbnail_alt: string | null;
  price: number;
  discount_type: string;
  discount: number;
  discount_type_mobile: string;
  discount_mobile: number;
  tax_amount: number;
  status: string;
  tax_type: string;
  aliexpress_id: string | null;
  aliexpress_benifit: string | null;
  available: string;
  warranty: string;
  warranty_time: string;
  region: string;
  stock: number;
  minOrder: number;
  unit: string;
  specification: string;
  description: string;
  warranty_details: string;
  drafted: boolean;
  scheduled_time: string | null;
  meta_description: string;
  deal: boolean;
  feature: boolean;
  categoryId: number;
  subCategoryId: number;
  subSubCategoryId: number;
  brandId: number;
  userId: number;
  date: string;
  ae_sku_property_dtos: any;
  faq: any;
  content: string | null;
  Image: IMostSellingProductImage[];
  review: any[];
  items: IMostSellingItem[];
  user: IMostSellingUser;
  delivery_info: IMostSellingProductDeliveryInfo;
  avgRate: number;
  totalReview: number;
  totalSales?: number; 
  totalRevenue?: number;
  salesPeriod?: string; 
}

export interface IMostSellingProductApiResponse {
  totalPage: number;
  data: IMostSellingProduct[];
  statusCode?: number;
  error?: any;
  total?: number;
  totalProducts?: number;
  totalItems?: number;
}