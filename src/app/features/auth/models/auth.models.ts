export interface LoginFormValues {
  username: string;
  password: string;
}

export interface RegisterFormValues {
  username: string;
  email: string;
  password: string;
}

export interface AuthTokensResponse {
  access_token: string;
  refresh_token: string;
}
