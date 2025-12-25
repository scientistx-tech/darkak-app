export interface IMostVisitedRequest {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  subCategoryId?: number;
  subSubCategoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  visitorId?: string;
  //sort?: 'newest' | 'oldest' | 'price_low' | 'price_high' | 'popular' | 'rating';
}

export interface IMostVisitedProductImage {
  id: number;
  url: string;
  alt: string | null;
  productId: number;
}

export interface IMostVisitedItemOption {
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

export interface IMostVisitedItem {
  id: number;
  title: string;
  options:IMostVisitedItemOption[];
}

export interface IMostVisitedUser {
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

export interface IMostVisitedProductDeliveryInfo {
  id: number;
  delivery_time: string;
  delivery_charge: number;
  return_days: number;
  delivery_time_outside: string;
  delivery_charge_outside: number;
  multiply: boolean;
  productId: number;
}

export interface IMostVisitedProduct {
  id: string | number;
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
  Image: IMostVisitedProductImage[];
  review: any[];
  items:  IMostVisitedItem[];
  user: IMostVisitedUser;
  delivery_info: IMostVisitedProductDeliveryInfo;
  avgRate: number;
  totalReview: number;
}

export interface IMostVisitedProductApiResponse {
  totalPage: number;
  data: IMostVisitedProduct[];
  statusCode?:number;
  error?:any,
}