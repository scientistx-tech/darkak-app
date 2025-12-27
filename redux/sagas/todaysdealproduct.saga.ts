import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiResponse } from "../services/api.services";
import actionTypes from "../constants/actionTypes";
import { ITodaysDealProductApiResponse, ITodaysDealRequest } from '../types/TodaysDealProduct';
import { getTodaysDealProduct } from '../services/todaysdealproduct.service';
import { getTodaysDealProdFailure, getTodaysDealProdSuccess } from '../actions/todaysdeal.action';


function* fetchTodaysDealProductSaga(action: {
  type: string;
  payload: ITodaysDealRequest;
}): Generator<any, void, ApiResponse<ITodaysDealProductApiResponse>> {
    try {
        console.log('Saga: Today\'s Deal data request', action.payload);
        
        const response: ApiResponse<ITodaysDealProductApiResponse> = yield call(
            getTodaysDealProduct,
            action.payload
        );
        
        console.log('Saga: Today\'s Deal product response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: Today\'s Deal product successful", response.data);
            yield put(getTodaysDealProdSuccess(response.data));
        } else {
            const errorMessage = response.data || response.data || 'Today\'s Deal products failed';
            console.log("Saga: Today\'s Deal product failed", errorMessage);
            yield put(getTodaysDealProdFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga: Today\'s Deal product Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(getTodaysDealProdFailure(errorMessage));
    }
}

export function* watchTodaysDealProductSaga() {
    console.log('Saga: Watching for GET_TODAYS_DEAL_PRODUCT_REQUEST actions');
    yield takeEvery(actionTypes.GET_TODAYS_DEAL_PRODUCT_REQUEST, fetchTodaysDealProductSaga);
}