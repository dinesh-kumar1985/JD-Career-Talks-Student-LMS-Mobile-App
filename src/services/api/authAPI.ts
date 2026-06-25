// Authentication API Service
import { apiClient } from './client';
import { LoginCredentials, SignupData, AuthToken, ApiResponse } from '../../types';

export const authAPI = {
  login: (credentials: LoginCredentials) =>
    apiClient.post<ApiResponse<AuthToken>>('/api/auth/login', credentials),

  signup: (data: SignupData) =>
    apiClient.post<ApiResponse<any>>('/api/auth/register', data),

  verifyOTP: (email: string, otp: string) =>
    apiClient.post('/api/auth/verify-otp', { email, otp }),

  resendOTP: (email: string) =>
    apiClient.post('/api/auth/resend-otp', { email }),

  forgotPassword: (email: string) =>
    apiClient.post('/api/auth/forgot-password', { email }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient.post('/api/auth/reset-password', { token, new_password: newPassword }),

  refreshToken: (refreshToken: string) =>
    apiClient.post<ApiResponse<AuthToken>>('/api/auth/refresh', { refresh_token: refreshToken }),

  logout: () =>
    apiClient.post('/api/auth/logout'),

  googleLogin: (idToken: string) =>
    apiClient.post<ApiResponse<AuthToken>>('/api/auth/google', { id_token: idToken }),

  facebookLogin: (accessToken: string, userId: string) =>
    apiClient.post<ApiResponse<AuthToken>>('/api/auth/facebook', {
      access_token: accessToken,
      user_id: userId,
    }),
};
