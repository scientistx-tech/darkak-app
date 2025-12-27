
import { newArrival } from "../apis/apis";
import { INewArrivalProductApiResponse, INewArrivalRequest } from "../types/NewArrivalProduct";
import { api, ApiResponse } from "./api.services";

export const getNewArrivalProduct = async (
  params: INewArrivalRequest
): Promise<ApiResponse<INewArrivalProductApiResponse>> => {
  return api.get<INewArrivalProductApiResponse>(newArrival, {
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