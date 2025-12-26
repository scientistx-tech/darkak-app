import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiResponse } from "../services/api.services";
import actionTypes from "../constants/actionTypes";
import { IMostSellingProductApiResponse, IMostSellingRequest } from '../types/MostSellingProduct';
import { getMostSellingProduct } from '../services/mostsellingProduct.service';
import { getMostSellingProdFailure, getMostSellingProdSuccess } from '../actions/mostsellingproduct.action';


function* fetchMostSellingProductSaga(action: {
  type: string;
  payload: IMostSellingRequest;
}): Generator<any, void, ApiResponse<IMostSellingProductApiResponse>> {
    try {
        console.log('Saga: Most Selling data request', action.payload);
        
        const response: ApiResponse<IMostSellingProductApiResponse> = yield call(
            getMostSellingProduct,
            action.payload
        );
        
        console.log('Saga: Most selling product response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: Most selling product successful", response.data);
            yield put(getMostSellingProdSuccess(response.data));
        } else {
            const errorMessage = response.data || response.data || 'Most selling products failed';
            console.log("Saga: Most selling product failed", errorMessage);
            yield put(getMostSellingProdFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga: Most selling product Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(getMostSellingProdFailure(errorMessage));
    }
}

export function* watchMostSellingProductSaga() {
    console.log('Saga: Watching for GET_MOST_SELLING_PRODUCT_REQUEST actions');
    yield takeEvery(actionTypes.GET_MOST_SELLING_PRODUCT_REQUEST, fetchMostSellingProductSaga);
}