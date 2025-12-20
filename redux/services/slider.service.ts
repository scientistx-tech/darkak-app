import { sliderHead } from "../apis/apis";
import { ISliderResponse } from "../types/sliderType";
import { api, ApiResponse } from "./api.services";


export const getSlider = async():Promise<ApiResponse<ISliderResponse>> =>{
    return api.get<ISliderResponse>(sliderHead);
}