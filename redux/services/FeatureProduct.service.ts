import { featureProduct } from "../apis/apis";
import { IProductRequest, IProductResponse } from "../types/FeatureProduct";
import { api, ApiResponse } from "./api.services";

export const getFeatureProduct = async (
  params: IProductRequest
): Promise<ApiResponse<IProductResponse>> => {
  return api.get<IProductResponse>(featureProduct, {
    page: params.page,
    limit: params.limit, 
    search: params.search,
    categoryId: params.categoryId,
    subCategoryId: params.subCategoryId,
    subSubCategoryId: params.subSubCategoryId,
    brandId: params.brandId,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
  });
};