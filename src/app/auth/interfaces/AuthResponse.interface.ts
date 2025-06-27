export interface AuthResponse {
  isSuccess: boolean;
  data: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    username: string;
    roles: string[];
    isVerified: boolean;
    statusCodes: number;
    jwtToken: string;
    phoneNumber: string;
  };
  errorMessage: string | null;
}
