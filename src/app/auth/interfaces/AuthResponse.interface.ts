export interface AuthResponse {
  isSuccess: boolean;

  jwtToken: string;
  errorMessage: string | null;
}
