import actionTypes from "../constants/actionTypes"
import { ISliderResponse } from "../types/sliderType"


const getSliderRequest = ()=>{
    return{
         type: actionTypes.GET_SLIDER_REQUEST,
    }
}

const getSliderSuccess = (payload:ISliderResponse)=>{
    return{
        type:actionTypes.GET_SLIDER_SUCCESS,
        payload
    }
}

const getSliderFailure = (payload: any)=>{
    return {
    type: actionTypes.REGISTER_FAILURE,
    payload,
  };
}
export{getSliderRequest,getSliderSuccess,getSliderFailure}