import { combineReducers } from 'redux';
import counterReducer from './counter.reducer';
import registrationReducer from './registration.reducer';
import { sliderReducer } from './slider.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    registrationUser:registrationReducer,
    sliderAll:sliderReducer

})

export default rootReducer;