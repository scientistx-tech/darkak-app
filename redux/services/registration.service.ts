import { registration } from "../apis/apis";
import { IRegistrationRequest, IRegistrationResponse } from "../types/registered";
import { api, ApiResponse } from "./api.services";



export const setRegistration = async(
     payload: IRegistrationRequest,
): Promise<ApiResponse<IRegistrationResponse>> =>{
    return api.post<IRegistrationResponse>(registration,payload);

}