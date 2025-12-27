
import { all, fork } from 'redux-saga/effects';
import registrationSaga from './registration.saga';
import { watchSliderSaga } from './slider.saga';
import { watchFeatureProductSaga } from './featureProductSaga';
import { watchmostVisitedProductSaga } from './mostVisitedProduct.saga';
import { watchMostSellingProductSaga } from './mostsellingproduct.saga';
import { watchNewArrivalProductSaga } from './newarrivalProduct.saga';
import { watchTodaysDealProductSaga } from './todaysdealproduct.saga';


export default function* rootSaga() {
  yield all([
    fork(registrationSaga),
    fork( watchSliderSaga),
    fork( watchFeatureProductSaga),
    fork(watchmostVisitedProductSaga),
    fork(watchMostSellingProductSaga),
    fork( watchNewArrivalProductSaga),
    fork(watchTodaysDealProductSaga)
  ]);
}