import { getSliderFailure, getSliderSuccess } from "../actions/slider.action";
import { getSlider } from "../services/slider.service";
import { ISliderResponse } from "../types/sliderType";
import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiResponse } from "../services/api.services";
import actionTypes from "../constants/actionTypes";

function* fetchSliderSaga(): Generator<any, void, ApiResponse<ISliderResponse>> {
    try {
        //console.log('Saga: Reset Password data request', action.payload);
        
        const response: ApiResponse<ISliderResponse> = yield call( getSlider);
        
        console.log('Saga: Reset Password Response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: reset pssword successful", response.data);
            yield put(getSliderSuccess(response.data));
        } else {
            const errorMessage = response.data || response.data || 'slider failed';
            console.log("Saga: reset pssword failed", errorMessage);
            yield put(getSliderFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga:reset pssword Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(getSliderFailure(errorMessage));
    }
}

export function* watchSliderSaga() {
    console.log(' Saga: Watching for GET_SLIDER_REQUEST actions');
    yield takeEvery(actionTypes.GET_SLIDER_REQUEST, fetchSliderSaga);
}