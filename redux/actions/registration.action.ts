import actionTypes from "../constants/actionTypes";
import { IRegistrationRequest, IRegistrationResponse } from "../types/registered";

const setRegistrationRequest = (payload:IRegistrationRequest) =>{
    return {
        type:actionTypes.REGISTER_REQUEST,
        payload,
    };
};

const setRegistrationSuccess = (payload:IRegistrationResponse) =>{
    return {
        type:actionTypes.REGISTER_SUCCESS,
        payload,
    };
};


const setRegistrationFailure = (payload:string) =>{
    return {
        type:actionTypes.REGISTER_FAILURE,
        payload,
    };
};

const clearRegistrationData = () => {
  return {
    type: actionTypes.CLEAR_REGISTRATION,
  };
};


export{setRegistrationRequest,setRegistrationSuccess,setRegistrationFailure,clearRegistrationData}
