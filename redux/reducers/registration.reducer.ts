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
  otpVerifyData:{
    statusCode: 0,
    data: null,
    message: '',
    token:'',
    errors: null,
  },
  emailOtpVerificationRequest:{
    email:'',
    otp:'',
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

    //otp verify for email
    case actionTypes.SET_OTP_REQUEST:
      console.log('Otp verifying for email triggered',action.payload);
      return{
        ...state,
        emailOtpVerificationRequest:action.payload,
        loading: true, 
        error: null
      }
    // success otp
     case actionTypes.SET_OTP_SUCCESS:
      console.log('Otp verifying for email triggered 1',action.payload);
      return{
        ...state,
        loading: false, 
        otpVerifyData:action.payload,
        error: null
      }
      // if falil
      case actionTypes.SET_OTP_FAILURE:
        console.log('Otp verifying for email triggered 2',action.payload);
        return{
          ...state, 
          loading: false,
          error: action.payload
        }
      
    default:
      return state;
  }
};

export default registrationReducer;