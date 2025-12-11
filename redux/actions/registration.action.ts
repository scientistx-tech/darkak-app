import actionTypes from "../constants/actionTypes";
import { IOtpVerifyRequest, IOtpVerifyResponse, IRegistrationRequest, IRegistrationResponse } from "../types/registered";

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

//for otp verification

const setOtpVerificationRequest = (payload:IOtpVerifyRequest) =>{
    return {
        type:actionTypes.SET_OTP_REQUEST,
        payload,
    };
};

const setOtpVerificationSuccess = (payload:IOtpVerifyResponse) =>{
    return {
        type:actionTypes.SET_OTP_SUCCESS,
        payload,
    };
};


const setOtpVerificationFailure = (payload:string) =>{
    return {
        type:actionTypes.SET_OTP_FAILURE,
        payload,
    };
};




export{
    setRegistrationRequest,
    setRegistrationSuccess,
    setRegistrationFailure,
    clearRegistrationData,
    setOtpVerificationRequest,
    setOtpVerificationSuccess,
    setOtpVerificationFailure}
