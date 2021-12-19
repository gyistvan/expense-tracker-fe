export interface LoginResponse {
  token: string;
}

export interface UserResponse {
  name: string;
  email: string;
}

export interface RegistrationResponse {
  result: string;
  successful: boolean;
}
