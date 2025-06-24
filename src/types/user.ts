export interface User {
  id: number;
  email: string;
  username: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
}

export interface LoginFormData {
  username: string;
  password: string;
}

export interface RegisterFormData extends LoginFormData {
  email: string;
  password2: string;
}

export interface LoginActionResponse {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof LoginFormData]?: string[];
  };
  payload?: LoginFormData | null;
}

export interface RegisterActionResponse extends LoginActionResponse {
  errors?: {
    [K in keyof RegisterFormData]?: string[];
  };
  payload?: RegisterFormData | null;
}
