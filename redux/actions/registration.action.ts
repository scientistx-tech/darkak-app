import actionTypes from "../constants/actionTypes";
import {
  ILoginUserLoginRequest,
  ILoginUserResponse,
  IOtpVerifyRequest,
  IOtpVerifyResponse,
  IRegistrationRequest,
  IRegistrationResponse,
  IResetPasswordRequest,
  IResetPasswordResponse,
} from "../types/registered";

const setRegistrationRequest = (payload: IRegistrationRequest) => {
  return {
    type: actionTypes.REGISTER_REQUEST,
    payload,
  };
};

const setRegistrationSuccess = (payload: IRegistrationResponse) => {
  return {
    type: actionTypes.REGISTER_SUCCESS,
    payload,
  };
};

const setRegistrationFailure = (payload: string) => {
  return {
    type: actionTypes.REGISTER_FAILURE,
    payload,
  };
};

const clearRegistrationData = () => {
  return {
    type: actionTypes.CLEAR_REGISTRATION,
  };
};

//for otp verification

const setOtpVerificationRequest = (payload: IOtpVerifyRequest) => {
  return {
    type: actionTypes.SET_OTP_REQUEST,
    payload,
  };
};

const setOtpVerificationSuccess = (payload: IOtpVerifyResponse) => {
  return {
    type: actionTypes.SET_OTP_SUCCESS,
    payload,
  };
};

const setOtpVerificationFailure = (payload: string) => {
  return {
    type: actionTypes.SET_OTP_FAILURE,
    payload,
  };
};

const setLogInUserRequest = (payload: ILoginUserLoginRequest) => {
  return {
    type: actionTypes.SET_LOGIN_REQUEST,
    payload,
  };
};

const setLogInUserSuccess = (payload: ILoginUserResponse) => {
  return {
    type: actionTypes.SET_LOGIN_SUCCESS,
    payload,
  };
};

const setLogInUserFailure = (payload: string) => {
  return {
    type: actionTypes.SET_LOGIN_FAILURE,
    payload,
  };
};

//

const setResetPasswordRequest = (payload: IResetPasswordRequest) => {
  return {
    type: actionTypes.SET_RESETPASSWORD_REQUEST,
    payload,
  };
};

const setResetPasswordSuccess = (payload: IResetPasswordResponse) => {
  return {
    type: actionTypes. SET_RESETPASSWORD_SUCCESS,
    payload,
  };
};

const setResetPasswordFailure = (payload: string) => {
  return {
    type: actionTypes.SET_RESETPASSWORD_FAILURE,
    payload,
  };
};

export {
  setRegistrationRequest,
  setRegistrationSuccess,
  setRegistrationFailure,
  clearRegistrationData,
  setOtpVerificationRequest,
  setOtpVerificationSuccess,
  setOtpVerificationFailure,
  setLogInUserRequest,
  setLogInUserSuccess,
  setLogInUserFailure,
  setResetPasswordRequest,
  setResetPasswordSuccess,
  setResetPasswordFailure
};
