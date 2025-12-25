// actions/MostVisitedProductActions.ts
import actionTypes from "../constants/actionTypes";
import { IMostVisitedRequest, IMostVisitedProductApiResponse } from "../types/MostVisitedProduct";

// পূর্বের action creators...
const getMostVisitedProdRequest = (payload: IMostVisitedRequest) => {
  return {
    type: actionTypes.GET_MOST_VISITED_PRODUCT_REQUEST,
    payload
  };
};

const getMostVisitedProdSuccess = (payload: IMostVisitedProductApiResponse) => {
  return {
    type: actionTypes.GET_MOST_VISITED_PRODUCT_SUCCESS,
    payload
  };
};

const getMostVisitedProdFailure = (payload: any) => {
  return {
    type: actionTypes.GET_MOST_VISITED_PRODUCT_FAILURE,
    payload,
  };
};

// নতুন action creators যোগ করুন
const clearMostVisitedProducts = () => {
  return {
    type: actionTypes.CLEAR_MOST_VISITED_PRODUCTS
  };
};

const updateMostVisitedFilters = (payload: Partial<IMostVisitedRequest>) => {
  return {
    type: actionTypes.UPDATE_MOST_VISITED_FILTERS,
    payload
  };
};

export { 
  getMostVisitedProdRequest, 
  getMostVisitedProdSuccess, 
  getMostVisitedProdFailure,
  clearMostVisitedProducts,
  updateMostVisitedFilters
};