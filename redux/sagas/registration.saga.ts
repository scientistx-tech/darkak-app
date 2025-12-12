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


import { setLogInUserFailure, setLogInUserSuccess, setOtpVerificationFailure, setOtpVerificationSuccess, setRegistrationFailure, setRegistrationSuccess, setResetPasswordFailure, setResetPasswordSuccess } from "../actions/registration.action";
import actionTypes from "../constants/actionTypes";
import { ApiResponse } from "../services/api.services";
import { setLogInUser, setOtpVerify, setRegistration, setResetPassword } from "../services/registration.service";
import { ILoginUserLoginRequest, ILoginUserResponse, IOtpVerifyRequest, IOtpVerifyResponse, IRegistrationRequest, IRegistrationResponse, IResetPasswordRequest, IResetPasswordResponse } from "../types/registered";
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

function* postOtpVerification(action: {
    type: string;
    payload: IOtpVerifyRequest
}): Generator<any, void, ApiResponse<IOtpVerifyResponse>> {
    try {
        console.log('Saga: otp verification request started', action.payload);
        
        const response: ApiResponse<IOtpVerifyResponse> = yield call(setOtpVerify, action.payload);
        
        console.log('Saga: otp API Response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: otp successful", response.data);
            yield put(setOtpVerificationSuccess(response.data));
        } else {
            const errorMessage = response.data?.message || response.data?.errors || 'otp failed';
            console.log("Saga: otp failed", errorMessage);
            yield put(setOtpVerificationFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga: Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(setOtpVerificationFailure(errorMessage));
    }
}

//log in all data

function* postLogInUser(action: {
    type: string;
    payload: ILoginUserLoginRequest
}): Generator<any, void, ApiResponse<ILoginUserResponse>> {
    try {
        console.log('Saga: log in data request', action.payload);
        
        const response: ApiResponse<ILoginUserResponse> = yield call(setLogInUser, action.payload);
        
        console.log('Saga: Log in API Response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: log in successful", response.data);
            yield put(setLogInUserSuccess(response.data));
        } else {
            const errorMessage = response.data?.message || response.data?.errors || 'otp failed';
            console.log("Saga: log In failed", errorMessage);
            yield put(setLogInUserFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga: Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(setLogInUserFailure(errorMessage));
    }
}

//reset password

function* postResetPassword(action: {
    type: string;
    payload: IResetPasswordRequest
}): Generator<any, void, ApiResponse<IResetPasswordResponse>> {
    try {
        console.log('Saga: Reset Password data request', action.payload);
        
        const response: ApiResponse<IResetPasswordResponse> = yield call(setResetPassword, action.payload);
        
        console.log('Saga: Reset Password Response', response);
        
        if (response.ok && response.data) {
            console.log("Saga: reset pssword successful", response.data);
            yield put(setResetPasswordSuccess(response.data));
        } else {
            const errorMessage = response.data?.message || response.data?.errors || 'otp failed';
            console.log("Saga: reset pssword failed", errorMessage);
            yield put(setResetPasswordFailure(errorMessage));
        }
    } catch (error: any) {
        console.log("Saga:reset pssword Catch error", error);
        const errorMessage = error?.message || error?.response?.data?.message || 'Something went wrong';
        yield put(setResetPasswordFailure(errorMessage));
    }
}

export default function* registrationSaga(): Generator {
    console.log('Saga: Registration saga initialized');
    yield takeEvery(actionTypes.REGISTER_REQUEST, postRegistration);
    console.log('Saga: otp saga initialized');
    yield takeEvery(actionTypes.SET_OTP_REQUEST, postOtpVerification);
    console.log('Saga: Log in saga initialized');
    yield takeEvery(actionTypes.SET_LOGIN_REQUEST, postLogInUser);
    console.log('Saga: Reset password saga initialized');
    yield takeEvery(actionTypes.SET_RESETPASSWORD_REQUEST, postResetPassword);
}