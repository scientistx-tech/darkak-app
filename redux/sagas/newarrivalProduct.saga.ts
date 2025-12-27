import { call, put, takeEvery } from 'redux-saga/effects';
import { ApiResponse } from "../services/api.services";
import actionTypes from "../constants/actionTypes";
import { INewArrivalProductApiResponse, INewArrivalRequest } from '../types/NewArrivalProduct';
import { getNewArrivalProdFailure, getNewArrivalProdSuccess } from '../actions/newArrivalProduct.action';
import { getNewArrivalProduct } from '../services/newArrivalProduct.sevice';

function* fetchNewArrivalProductSaga(action: {
  type: string;
  payload: INewArrivalRequest;
}): Generator<any, void, ApiResponse<INewArrivalProductApiResponse>> {
    try {
        console.log('Saga: New Arrival data request', action.payload);
        
        const response: ApiResponse<INewArrivalProductApiResponse> = yield call(
             getNewArrivalProduct,
            action.payload
        );
        
        console.log('Saga: New Arrival product response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: New Arrival product successful", response.data);
            yield put(getNewArrivalProdSuccess(response.data));
        } else {
            const errorMessage = response.data || response.data || 'New Arrival products failed';
            console.log("Saga: New Arrival product failed", errorMessage);
            yield put(getNewArrivalProdFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga: New Arrival product Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(getNewArrivalProdFailure(errorMessage));
    }
}

export function* watchNewArrivalProductSaga() {
    console.log('Saga: Watching for GET_NEW_ARRIVAL_PRODUCT_REQUEST actions');
    yield takeEvery(actionTypes.GET_NEW_ARRIVAL_PRODUCT_REQUEST, fetchNewArrivalProductSaga);
}