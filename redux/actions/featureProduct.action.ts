import actionTypes from "../constants/actionTypes"
import { IProductRequest, IProductResponse } from "../types/FeatureProduct"



const getFeatureProdRequest = (payload:IProductRequest)=>{
    return{
         type: actionTypes. GET_FEATURE_PRODUCT_REQUEST,
         payload
    }
}

const getFeatureProdSuccess = (payload:IProductResponse)=>{
    return{
        type:actionTypes.GET_FEATURE_PRODUCT_SUCCESS,
        payload
    }
}

const getFeatureProdFailure = (payload: any)=>{
    return {
    type: actionTypes.GET_FEATURE_PRODUCT_FAILURE,
    payload,
  };
}
export{getFeatureProdRequest,getFeatureProdSuccess, getFeatureProdFailure}