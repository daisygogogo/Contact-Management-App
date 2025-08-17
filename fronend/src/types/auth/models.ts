export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
}

export interface AuthResponse {
  status: number;
  code: string;
  message: string | null;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface BackendAuthResponse {
  data: {
    user: User;
    accessToken: string;
  };
  ok: boolean;
}
