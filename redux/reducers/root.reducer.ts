import { combineReducers } from 'redux';
import counterReducer from './counter.reducer';
import registrationReducer from './registration.reducer';

const rootReducer = combineReducers({
    counter: counterReducer,
    registrationUser:registrationReducer

})

export default rootReducer;