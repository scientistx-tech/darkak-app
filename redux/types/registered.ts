export interface IRegistrationRequest {
  email: string;
  password: string;
  name: string;
}

export interface IRegistrationResponse {
  statusCode?: number;
  message: string;
  data?:any;
  errors?: string;
}
