export interface IRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

export interface IRegistrationResponse {
  statusCode?: number;
  message: string;
  data?: any;
  errors?: string;
}

export interface IOtpVerifyRequest {
  email: string;
  otp: string;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  password: string;
  dob: string | null;
  gender: string | null;
  isAdmin: boolean;
  image: string | null;
  socketId: string | null;
  pushToken: string | null;
  marital_status: string | null;
  anniversary_date: string | null;
  provider: string;
  token: string | null;
  isModerator: boolean;
  isSeller: boolean;
  updatePasswordAt: string;
  createdAt: string;
  isBlocked: boolean;
  isActive: boolean;
}

export interface IOtpVerifyResponse {
  statusCode?: number;
  message: string;
  data?: IUser;
  errors?: string;
  token?: string;
}

export interface ILoginUserLoginRequest{
  email:string;
  password:string;
}

export interface IUserLogin {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  password: string;
  dob: string | null;
  gender: string | null;
  isAdmin: boolean;
  image: string | null;
  socketId: string | null;
  pushToken: string | null;
  marital_status: string | null;
  anniversary_date: string | null;
  provider: string;
  token: string | null;
  isModerator: boolean;
  isSeller: boolean;
  updatePasswordAt: string;
  createdAt: string;
  isBlocked: boolean;
  isActive: boolean;
  seller: any | null; 
}

export interface ILoginUserResponse {
  statusCode?: number;
  message?: string;
  data?: IUserLogin;
  errors?: string;
  token?: string;
}

export interface IResetPasswordRequest{
  email : string;
}

export interface IResetPasswordResponse{
  statusCode?: number;
  message?: string;
  data?: IUserLogin;
  errors?: string;
}