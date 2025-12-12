import { LogIn, registration, resetPassword, verifyOtp } from "../apis/apis";
import { ILoginUserLoginRequest, ILoginUserResponse, IOtpVerifyRequest, IOtpVerifyResponse, IRegistrationRequest, IRegistrationResponse, IResetPasswordRequest, IResetPasswordResponse } from "../types/registered";
import { api, ApiResponse } from "./api.services";



export const setRegistration = async(
     payload: IRegistrationRequest,
): Promise<ApiResponse<IRegistrationResponse>> =>{
    return api.post<IRegistrationResponse>(registration,payload);

}

export const setOtpVerify = async(
    payload: IOtpVerifyRequest,
):Promise<ApiResponse<IOtpVerifyResponse>> =>{
    return api.post<IOtpVerifyResponse>(verifyOtp,payload);
}

export const setLogInUser = async(
    payload: ILoginUserLoginRequest,
):Promise<ApiResponse<ILoginUserResponse>> =>{
    return api.post<ILoginUserResponse>(LogIn,payload);
}

export const setResetPassword = async(
    payload: IResetPasswordRequest,
):Promise<ApiResponse<IResetPasswordResponse>> =>{
    return api.post<IResetPasswordResponse>(resetPassword,payload);
}