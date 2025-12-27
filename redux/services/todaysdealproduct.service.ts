import { todaysDeal } from "../apis/apis";
import { ITodaysDealProductApiResponse, ITodaysDealRequest } from "../types/TodaysDealProduct";
import { api, ApiResponse } from "./api.services";

export const getTodaysDealProduct = async (
  params:  ITodaysDealRequest
): Promise<ApiResponse<ITodaysDealProductApiResponse>> => {
  return api.get<ITodaysDealProductApiResponse>(todaysDeal, {
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