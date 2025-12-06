
import { all, fork } from 'redux-saga/effects';
import registrationSaga from './registration.saga';


export default function* rootSaga() {
  yield all([
    fork(registrationSaga)
  ]);
}