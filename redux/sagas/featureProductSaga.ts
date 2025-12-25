import { IProductRequest, IProductResponse } from "../types/FeatureProduct";
import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiResponse } from "../services/api.services";
import { getFeatureProduct } from "../services/FeatureProduct.service";
import { getFeatureProdFailure, getFeatureProdSuccess } from "../actions/featureProduct.action";
import actionTypes from "../constants/actionTypes";





function* fetchFeatureProductSaga(action: {
  type: string;
  payload: IProductRequest;
}): Generator<any, void, ApiResponse<IProductResponse>> {
    try {
        //console.log('Saga: Reset Password data request', action.payload);
        
        const response: ApiResponse<IProductResponse> = yield call(  getFeatureProduct,action.payload);
        
        console.log('Saga: feature product', response);
        
        if (response.ok && response.data) {
            console.log("Saga: feature product successful", response.data);
            yield put(getFeatureProdSuccess(response.data));
        } else {
            const errorMessage = response.data || response.data || 'slider failed';
            console.log("Saga: feature product failed", errorMessage);
            yield put( getFeatureProdFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga:feature productd Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put( getFeatureProdFailure(errorMessage));
    }
}

export function* watchFeatureProductSaga() {
    console.log(' Saga: Watching for GET_FEATURE_PRODUCT_REQUEST actions');
    yield takeEvery(actionTypes.GET_FEATURE_PRODUCT_REQUEST, fetchFeatureProductSaga);
}