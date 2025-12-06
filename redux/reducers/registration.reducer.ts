import actionTypes from "../constants/actionTypes";

const initialState = {
  registrationData: {
    statusCode: 0,
    data: null,
    message: '',
    errors: null,
  },
  registrationRequest: {
    email: '',
    password: '',
    name: '',
  },
  loading: false,
  error: null,
};
export const registrationReducer = (
  state = initialState, 
  action: { type: any; payload: any }
) => {
  switch (action.type) {
    case actionTypes.REGISTER_REQUEST:
      console.log(' Reducer: REGISTER_REQUEST triggered', action.payload);
      return { 
        ...state, 
        registrationRequest: action.payload, 
        loading: true, 
        error: null 
      };
      
    // Registration successful
    case actionTypes.REGISTER_SUCCESS:
      console.log(' Reducer: REGISTER_SUCCESS triggered', action.payload);
      return { 
        ...state, 
        loading: false, 
        registrationData:action.payload,
        error: null,
      };
      
    // Registration failed
    case actionTypes.REGISTER_FAILURE:
      console.log(' Reducer: REGISTER_FAILURE triggered', action.payload);
      return { ...state, loading: false, error: action.payload };
      
    // Clear registration data
    case actionTypes.CLEAR_REGISTRATION:
      console.log(' Reducer: CLEAR_REGISTRATION triggered');
      return initialState;
      
    default:
      return state;
  }
};

export default registrationReducer;