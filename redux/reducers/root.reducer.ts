import { combineReducers } from 'redux';
import counterReducer from './counter.reducer';
import registrationReducer from './registration.reducer';
import { sliderReducer } from './slider.reducer';
import featureProductReducer from './featureProduct.reducer';
import mostVisitedReducer from './mostVisitedProduct.reducer';
import mostSellingReducer from './mostsellingproduct.reducer';
import newArrivalReducer from './newarrivalproduct.reducer';
import todaysDealReducer from './todaysdealproduct.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    registrationUser:registrationReducer,
    sliderAll:sliderReducer,
    featureProductData:featureProductReducer,
    mostVisitedProductData:mostVisitedReducer,
    mostSellingProductData:mostSellingReducer,
    newArrivalProductData:newArrivalReducer,
    todaysDealProductData:todaysDealReducer,
})

export default rootReducer;