// import { setRegistrationFailure, setRegistrationSuccess } from "../actions/registration.action";
// import actionTypes from "../constants/actionTypes";
// import { ApiResponse } from "../services/api.services";
// import { setRegistration } from "../services/registration.service";
// import { IRegistrationRequest, IRegistrationResponse } from "../types/registered";
// import { call, put, takeEvery } from 'redux-saga/effects';


// function* postRegistration(action : {
//     type:string;
//     payload:IRegistrationRequest
// }): Generator<any,void, ApiResponse<IRegistrationResponse >>{
//     try {
//         const response = yield call(setRegistration,action.payload);
//         if(response.ok && response.data){
//             console.log("response saga data : ",response.data);
//             yield put(setRegistrationSuccess( response.data));
//         }else{
//             yield put(setRegistrationFailure(message));
//         }
//     } catch (error:any) {
//          yield put(setRegistrationFailure(message));
//     }
// }

// export default function* registrationSaga(): Generator {
//   yield takeEvery(actionTypes.REGISTER_REQUEST, postRegistration);

// }


import { setRegistrationFailure, setRegistrationSuccess } from "../actions/registration.action";
import actionTypes from "../constants/actionTypes";
import { ApiResponse } from "../services/api.services";
import { setRegistration } from "../services/registration.service";
import { IRegistrationRequest, IRegistrationResponse } from "../types/registered";
import { call, put, takeEvery } from 'redux-saga/effects';

function* postRegistration(action: {
    type: string;
    payload: IRegistrationRequest
}): Generator<any, void, ApiResponse<IRegistrationResponse>> {
    try {
        console.log('Saga: Registration request started', action.payload);
        
        const response: ApiResponse<IRegistrationResponse> = yield call(setRegistration, action.payload);
        
        console.log('Saga: API Response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: Registration successful", response.data);
            yield put(setRegistrationSuccess(response.data));
        } else {
            const errorMessage = response.data?.message || response.data?.errors || 'Registration failed';
            console.log("Saga: Registration failed", errorMessage);
            yield put(setRegistrationFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga: Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(setRegistrationFailure(errorMessage));
    }
}

export default function* registrationSaga(): Generator {
    console.log('Saga: Registration saga initialized');
    yield takeEvery(actionTypes.REGISTER_REQUEST, postRegistration);
}