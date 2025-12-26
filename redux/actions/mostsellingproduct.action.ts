import actionTypes from "../constants/actionTypes";
import {
  IMostSellingProductApiResponse,
  IMostSellingRequest,
} from "../types/MostSellingProduct";

const getMostSellingProdRequest = (payload: IMostSellingRequest) => {
  return {
    type: actionTypes.GET_MOST_SELLING_PRODUCT_REQUEST,
    payload,
  };
};

const getMostSellingProdSuccess = (payload: IMostSellingProductApiResponse) => {
  return {
    type: actionTypes.GET_MOST_SELLING_PRODUCT_SUCCESS,
    payload,
  };
};

const getMostSellingProdFailure = (payload: any) => {
  return {
    type: actionTypes.GET_MOST_SELLING_PRODUCT_FAILURE,
    payload,
  };
};
const clearMostSellingProducts = () => {
  return {
    type: actionTypes.CLEAR_MOST_SELLING_PRODUCTS,
  };
};
const updateMostSellingFilters = (payload: Partial< IMostSellingRequest>) => {
  return {
    type: actionTypes.UPDATE_MOST_SELLING_FILTERS,
    payload
  };
};
export {
  getMostSellingProdRequest,
  getMostSellingProdSuccess,
  getMostSellingProdFailure,
  clearMostSellingProducts,
  updateMostSellingFilters
};
