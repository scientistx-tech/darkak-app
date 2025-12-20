
import { all, fork } from 'redux-saga/effects';
import registrationSaga from './registration.saga';
import { watchSliderSaga } from './slider.saga';


export default function* rootSaga() {
  yield all([
    fork(registrationSaga),
    fork( watchSliderSaga)
  ]);
}