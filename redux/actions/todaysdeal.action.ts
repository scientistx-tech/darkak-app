import actionTypes from "../constants/actionTypes";
import { ITodaysDealRequest, ITodaysDealProductApiResponse } from "../types/TodaysDealProduct";

 const getTodaysDealProdRequest = (payload: ITodaysDealRequest) => {
  return {
    type: actionTypes.GET_TODAYS_DEAL_PRODUCT_REQUEST,
    payload,
  };
};

 const getTodaysDealProdSuccess = (payload: ITodaysDealProductApiResponse) => {
  return {
    type: actionTypes.GET_TODAYS_DEAL_PRODUCT_SUCCESS,
    payload,
  };
};

 const getTodaysDealProdFailure = (payload: any) => {
  return {
    type: actionTypes.GET_TODAYS_DEAL_PRODUCT_FAILURE,
    payload,
  };
};

 const clearTodaysDealProducts = () => {
  return {
    type: actionTypes.CLEAR_TODAYS_DEAL_PRODUCTS,
  };
};

 const updateTodaysDealFilters = (payload: Partial<ITodaysDealRequest>) => {
  return {
    type: actionTypes.UPDATE_TODAYS_DEAL_FILTERS,
    payload
  };
};

export {
  getTodaysDealProdRequest,
  getTodaysDealProdSuccess,
  getTodaysDealProdFailure,
  clearTodaysDealProducts,
  updateTodaysDealFilters
};