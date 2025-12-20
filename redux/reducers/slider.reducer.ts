import actionTypes from "../constants/actionTypes";



const initialState = {
  sliderData: {
    statusCode: 0,
    data: [],
    message: "",
    errors: null,
  },
  loading: false,
  error: null,
};

export const sliderReducer = (
  state = initialState,
  action: { type: any; payload: any }
) =>{
    switch(action.type){
        case actionTypes.GET_SLIDER_REQUEST:
      console.log("Slider Reducer: GET_SLIDER_REQUEST triggered");
      return {
        ...state,
        loading: true,
        error: null,
      };
       case actionTypes.GET_SLIDER_SUCCESS:
      console.log(" Reducer: GET_SLIDER_SUCCESS triggered", action.payload);
      return {
        ...state,
        loading: false,
        sliderData: action.payload,
        error: null,
      };

    case actionTypes.GET_SLIDER_FAILURE:
      console.log(" Reducer:GET_SLIDER_FAILURE triggered", action.payload);
      return { ...state, loading: false, error: action.payload };
      
       default:
      return state;
    }
}