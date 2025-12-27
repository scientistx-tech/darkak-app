import actionTypes from "../constants/actionTypes";
import {
  INewArrivalProductApiResponse,
  INewArrivalRequest,
} from "../types/NewArrivalProduct";

const getNewArrivalProdRequest = (payload: INewArrivalRequest) => {
  return {
    type: actionTypes.GET_NEW_ARRIVAL_PRODUCT_REQUEST,
    payload,
  };
};

const getNewArrivalProdSuccess = (payload: INewArrivalProductApiResponse) => {
  return {
    type: actionTypes.GET_NEW_ARRIVAL_PRODUCT_SUCCESS,
    payload,
  };
};

const getNewArrivalProdFailure = (payload: any) => {
  return {
    type: actionTypes.GET_NEW_ARRIVAL_PRODUCT_FAILURE,
    payload,
  };
};

const clearNewArrivalProducts = () => {
  return {
    type: actionTypes.CLEAR_NEW_ARRIVAL_PRODUCTS,
  };
};

const updateNewArrivalFilters = (payload: Partial<INewArrivalRequest>) => {
  return {
    type: actionTypes.UPDATE_NEW_ARRIVAL_FILTERS,
    payload
  };
};

export {
  getNewArrivalProdRequest,
  getNewArrivalProdSuccess,
  getNewArrivalProdFailure,
  clearNewArrivalProducts,
  updateNewArrivalFilters
};