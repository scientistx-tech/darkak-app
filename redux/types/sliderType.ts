// slider.types.ts

export interface ISliderProduct {
  title: string;
  slug: string;
  thumbnail: string;
}

export interface ISliderItem {
  id: number;
  offer_name: string;
  index: number;
  title: string;
  banner: string;
  type: string;
  details: string;
  productId: number;
  date: string; 
  product: ISliderProduct;
}

export interface ISliderResponse {
  success?: boolean; 
  data?: ISliderItem[]; 
  statusCode?:number;
  error?:any,
}

export interface ISliderRequestParams {
  limit?: number;
  sort?: string;
}