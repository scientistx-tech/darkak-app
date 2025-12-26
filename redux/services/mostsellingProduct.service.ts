import { mostSelling } from "../apis/apis";
import { IMostSellingProductApiResponse, IMostSellingRequest } from "../types/MostSellingProduct";
import { api, ApiResponse } from "./api.services";

export const getMostSellingProduct = async (
  params: IMostSellingRequest
): Promise<ApiResponse<IMostSellingProductApiResponse>> => {
  return api.get<IMostSellingProductApiResponse>(mostSelling, {
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
