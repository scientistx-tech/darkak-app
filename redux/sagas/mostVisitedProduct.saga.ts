import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiResponse } from "../services/api.services";
import actionTypes from "../constants/actionTypes";
import { IMostVisitedProductApiResponse, IMostVisitedRequest } from '../types/MostVisitedProduct';
import { getMostVisitedProduct } from '../services/mostVisitedProduct.service';
import { getMostVisitedProdFailure, getMostVisitedProdSuccess } from '../actions/mostvisitedProduct.action';

function* fetchmostVisitedProductSaga(action: {
  type: string;
  payload: IMostVisitedRequest;
}): Generator<any, void, ApiResponse< IMostVisitedProductApiResponse>> {
    try {
        //console.log('Saga: Reset Password data request', action.payload);
        
        const response: ApiResponse< IMostVisitedProductApiResponse> = yield call(  getMostVisitedProduct,action.payload);
        
        console.log('Saga: feature product', response);
        
        if (response.ok && response.data) {
            console.log("Saga: feature product successful", response.data);
            yield put(getMostVisitedProdSuccess(response.data));
        } else {
            const errorMessage = response.data || response.data || 'slider failed';
            console.log("Saga: feature product failed", errorMessage);
            yield put( getMostVisitedProdFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga:feature productd Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put( getMostVisitedProdFailure(errorMessage));
    }
}

export function* watchmostVisitedProductSaga() {
    console.log(' Saga: Watching for GET_FEATURE_PRODUCT_REQUEST actions');
    yield takeEvery(actionTypes.GET_MOST_VISITED_PRODUCT_REQUEST, fetchmostVisitedProductSaga);
}