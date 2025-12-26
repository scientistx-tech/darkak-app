import {  mostVisited } from "../apis/apis";
import { IMostVisitedProductApiResponse, IMostVisitedRequest } from "../types/MostVisitedProduct";
import { api, ApiResponse } from "./api.services";

export const getMostVisitedProduct = async (
  params: IMostVisitedRequest
): Promise<ApiResponse<IMostVisitedProductApiResponse>> => {
  return api.get<IMostVisitedProductApiResponse>(mostVisited, {
    page: params.page,
    limit: params.limit, 
    search: params.search,
    categoryId: params.categoryId,
    subCategoryId: params.subCategoryId,
    subSubCategoryId: params.subSubCategoryId,
    brandId: params.brandId,
    minPrice: params.minPrice,
    maxPrice: params.maxPrice,
    visitorId:params.visitorId || 'sazzad123',
  });
};


