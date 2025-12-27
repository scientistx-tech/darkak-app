export interface INewArrivalRequest {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  subCategoryId?: number;
  subSubCategoryId?: number;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  sort?: string;
}

export interface INewArrivalProductImage {
  id: number;
  url: string;
  alt: string | null;
  productId: number;
}

export interface AeSkuPropertyDto {
  sku_image: string;
  sku_property_id: number;
  property_value_id: number;
  sku_property_name: string;
  sku_property_value: string;
  property_value_definition_name: string;
}

export interface AeItemSkuInfoDto {
  id: string;
  sku_id: string;
  sku_attr: string;
  sku_price: string;
  currency_code: string;
  limit_strategy: string;
  offer_sale_price: string;
  price_include_tax: boolean;
  sku_available_stock: number;
  ae_sku_property_dtos: {
    ae_sku_property_d_t_o: AeSkuPropertyDto[];
  };
  offer_bulk_sale_price: string;
  buy_amount_limit_set_by_promotion: string;
}

export interface AeSkuPropertyDtos {
  ae_item_sku_info_d_t_o: AeItemSkuInfoDto[];
}

export interface INewArrivalItemOption {
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

export interface INewArrivalItem {
  id: number;
  title: string;
  options: INewArrivalItemOption[];
}

export interface INewArrivalUser {
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

export interface INewArrivalProductDeliveryInfo {
  id: number;
  delivery_time: string;
  delivery_charge: number;
  return_days: number;
  delivery_time_outside: string;
  delivery_charge_outside: number;
  multiply: boolean;
  productId: number;
}

export interface INewArrivalProduct {
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
  subSubCategoryId: number | null;
  brandId: number;
  userId: number;
  date: string;
  ae_sku_property_dtos: AeSkuPropertyDtos | null;
  faq: any;
  content: string | null;
  Image: INewArrivalProductImage[];
  review: any[];
  items: INewArrivalItem[];
  user: INewArrivalUser;
  delivery_info: INewArrivalProductDeliveryInfo;
  avgRate: number;
  totalReview: number;
}

export interface INewArrivalProductApiResponse {
  totalPage: number;
  data: INewArrivalProduct[];
  statusCode?: number;
  error?: any;
  total?: number;
  totalProducts?: number;
  totalItems?: number;
}