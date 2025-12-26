import { combineReducers } from 'redux';
import counterReducer from './counter.reducer';
import registrationReducer from './registration.reducer';
import { sliderReducer } from './slider.reducer';
import featureProductReducer from './featureProduct.reducer';
import mostVisitedReducer from './mostVisitedProduct.reducer';
import mostSellingReducer from './mostsellingproduct.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    registrationUser:registrationReducer,
    sliderAll:sliderReducer,
    featureProductData:featureProductReducer,
    mostVisitedProductData:mostVisitedReducer,
    mostSellingProductData:mostSellingReducer,
})

export default rootReducer;