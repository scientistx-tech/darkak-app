import { registration, verifyOtp } from "../apis/apis";
import { IOtpVerifyRequest, IOtpVerifyResponse, IRegistrationRequest, IRegistrationResponse } from "../types/registered";
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