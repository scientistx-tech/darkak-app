import { create, ApiResponse } from "apisauce";
import store, { RootState } from "../store";
// import Config from "react-native-config";

const api = create({
  baseURL: "https://api.darkak.com.bd/api",
  //baseURL: 'http://192.168.10.57:6235',

  //baseURL: 'http://192.168.10.57:6235',
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.addRequestTransform((request) => {
  const state = store.getState() as RootState;
  //console.log('Login status : ', state.campaigns.campaign);
  const token = state?.registrationUser?.otpVerifyData?.token;
  console.log("token; ", token);

  if (token && request.headers) {
    request.headers.Authorization = `Bearer ${token}`;
  }
});

// Add response transformation
api.addResponseTransform((response) => {
  if (!response.ok) {
    // Standardize error response
    response.data = {
      ...(response.data || {}),
      message: response.data?.message || "An error occurred",
      statusCode: response.status || 500,
    };
  }
});

export { api };
export type { ApiResponse };
