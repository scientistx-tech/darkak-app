import { combineReducers } from 'redux';
import counterReducer from './counter.reducer';
import registrationReducer from './registration.reducer';
import { sliderReducer } from './slider.reducer';
import featureProductReducer from './featureProduct.reducer';
import mostVisitedReducer from './mostVisitedProduct.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    registrationUser:registrationReducer,
    sliderAll:sliderReducer,
    featureProductData:featureProductReducer,
    mostVisitedProductData:mostVisitedReducer,

})

export default rootReducer;