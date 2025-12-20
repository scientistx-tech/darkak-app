import actionTypes from "../constants/actionTypes";

const initialState = {
  registrationData: {
    statusCode: 0,
    data: null,
    message: "",
    errors: null,
  },
  registrationRequest: {
    email: "",
    password: "",
    name: "",
  },
  otpVerifyData: {
    statusCode: 0,
    data: {
      id: 0,
      name: "",
      email: "",
      phone: null,
      password: "",
      dob: "",
      gender: "",
      isAdmin: false,
      image: "",
      socketId: "",
      pushToken: "",
      marital_status: "",
      anniversary_date: "",
      provider: "",
      token: "",
      isModerator: "",
      isSeller: false,
      updatePasswordAt: "",
      createdAt: "",
      isBlocked: false,
      isActive: false,
    },
    message: "",
    token: "",
    errors: null,
  },
  emailOtpVerificationRequest: {
    email: "",
    otp: "",
  },
  //log in
  loginData: {
    statusCode: 0,
    data: {
      user: {
        id: 0,
        name: "",
        email: "",
        phone: null,
        password: "",
        dob: null,
        gender: null,
        isAdmin: false,
        image: null,
        socketId: null,
        pushToken: null,
        marital_status: null,
        anniversary_date: null,
        provider: "email",
        token: null,
        isModerator: false,
        isSeller: false,
        updatePasswordAt: "",
        createdAt: "",
        isBlocked: false,
        isActive: false,
        seller: null,
      },
      token: "",
    },
    message: "",
    errors: null,
  },
  loginRequest: {
    email: "",
    password: "",
  },
  resetPasswordRequest:{
    email:""
  },
  resetPasswordData:{
    message: "",
    user: {
      id: 0,
      name: "",
      email: "",
      phone: null,
      password: "",
      dob: null,
      gender: null,
      isAdmin: false,
      image: null,
      socketId: null,
      pushToken: null,
      marital_status: null,
      anniversary_date: null,
      provider: "email",
      token: null,
      isModerator: false,
      isSeller: false,
      updatePasswordAt: "",
      createdAt: "",
      isBlocked: false,
      isActive: false
    },
    statusCode: 0,
    errors: null,
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
      console.log(" Reducer: REGISTER_REQUEST triggered", action.payload);
      return {
        ...state,
        registrationRequest: action.payload,
        loading: true,
        error: null,
      };

    // Registration successful
    case actionTypes.REGISTER_SUCCESS:
      console.log(" Reducer: REGISTER_SUCCESS triggered", action.payload);
      return {
        ...state,
        loading: false,
        registrationData: action.payload,
        error: null,
      };

    // Registration failed
    case actionTypes.REGISTER_FAILURE:
      console.log(" Reducer: REGISTER_FAILURE triggered", action.payload);
      return { ...state, loading: false, error: action.payload };

    // Clear registration data
    case actionTypes.CLEAR_REGISTRATION:
      console.log(" Reducer: CLEAR_REGISTRATION triggered");
      return initialState;

    //otp verify for email
    case actionTypes.SET_OTP_REQUEST:
      console.log("Otp verifying for email triggered", action.payload);
      return {
        ...state,
        emailOtpVerificationRequest: action.payload,
        loading: true,
        error: null,
      };
    // success otp
    case actionTypes.SET_OTP_SUCCESS:
      console.log("Otp verifying for email triggered 1", action.payload);
      return {
        ...state,
        loading: false,
        otpVerifyData: action.payload,
        error: null,
      };
    // if falil
    case actionTypes.SET_OTP_FAILURE:
      console.log("Otp verifying for email triggered 2", action.payload);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

  //user log in 
    
    case actionTypes.SET_LOGIN_REQUEST:
      console.log("log in request : ",action.payload);
      return{
        ...state,
        loginRequest: action.payload,
        loading: true,
        error: null,
      };
    case actionTypes.SET_LOGIN_SUCCESS:
      console.log("log in success :",action.payload);
      return{
        ...state,
        loginData: action.payload,
        loading: false,
        error: null, 
      };

    case actionTypes.SET_LOGIN_FAILURE:
      console.log("log in failure : ",action.payload);
      return{
         ...state,
        loading: false,
        error: action.payload,
      };

      case actionTypes.SET_LOGOUT:
      console.log("Reducer: SET_LOGOUT triggered");
      return {
        ...initialState,
        // If you want to preserve some data during logout (like registration form fields), 
        // you can modify this to only reset certain fields:
        // registrationRequest: state.registrationRequest, // Keep registration form data
        // resetPasswordRequest: state.resetPasswordRequest, // Keep reset password email
      };

    //reset password

     case actionTypes.SET_RESETPASSWORD_REQUEST:
      console.log("reset password request : ",action.payload);
      return{
        ...state,
        resetPasswordRequest: action.payload,
        loading: true,
        error: null,
      };
    case actionTypes.SET_RESETPASSWORD_SUCCESS:
      console.log("reset password  :",action.payload);
      return{
        ...state,
        resetPasswordData: action.payload,
        loading: false,
        error: null, 
      };

    case actionTypes.SET_RESETPASSWORD_FAILURE:
      console.log("reset password failure : ",action.payload);
      return{
         ...state,
        loading: false,
        error: action.payload,
      };

      



    default:
      return state;
  }
};

export default registrationReducer;
