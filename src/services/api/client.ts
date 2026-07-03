import axios, { AxiosInstance, AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_BASE_URL, API_TIMEOUT, StorageKeys, RETRY_CONFIG } from '../../constants';
import { store } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';

interface RequestConfig {
  retries?: number;
  retryDelay?: number;
}

class APIClient {
  private client: AxiosInstance;
  private isRefreshing: boolean = false;
  private refreshSubscribers: ((token: string) => void)[] = [];

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem(StorageKeys.ACCESS_TOKEN);
        
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalRequest = error.config as any;

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (!this.isRefreshing) {
            this.isRefreshing = true;

            try {
              const refreshToken = await AsyncStorage.getItem(StorageKeys.REFRESH_TOKEN);
              
              if (!refreshToken) {
                throw new Error('No refresh token');
              }

              const response = await axios.post(
                `${API_BASE_URL}/api/auth/refresh-token`,
                { refreshToken }
              );

              const { accessToken, refreshToken: newRefreshToken } = response.data.data;

              await AsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, accessToken);
              await AsyncStorage.setItem(StorageKeys.REFRESH_TOKEN, newRefreshToken);

              this.isRefreshing = false;
              this.onRefreshed(accessToken);

              // Retry original request
              originalRequest._retry = true;
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return this.client(originalRequest);
            } catch (refreshError) {
              this.isRefreshing = false;
              await AsyncStorage.removeItem(StorageKeys.ACCESS_TOKEN);
              await AsyncStorage.removeItem(StorageKeys.REFRESH_TOKEN);
              
              store.dispatch(logout());
              
              return Promise.reject(refreshError);
            }
          } else {
            // Wait for token refresh
            return new Promise((resolve) => {
              this.subscribeToRefresh((token) => {
                originalRequest.headers.Authorization = `Bearer ${token}`;
                resolve(this.client(originalRequest));
              });
            });
          }
        }

        return Promise.reject(this.handleError(error));
      }
    );
  }

  private subscribeToRefresh(callback: (token: string) => void) {
    this.refreshSubscribers.push(callback);
  }

  private onRefreshed(token: string) {
    this.refreshSubscribers.forEach((callback) => callback(token));
    this.refreshSubscribers = [];
  }

  private handleError(error: AxiosError<any>) {
    const message = error.response?.data?.message || error.message;
    const statusCode = error.response?.status || 0;

    return {
      message,
      statusCode,
      code: error.response?.data?.code || 'UNKNOWN_ERROR',
      details: error.response?.data?.details,
    };
  }

  async get<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.withRetry(() => this.client.get<T>(url).then(res => res.data), config);
  }

  async post<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.withRetry(() => this.client.post<T>(url, data).then(res => res.data), config);
  }

  async put<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.withRetry(() => this.client.put<T>(url, data).then(res => res.data), config);
  }

  async patch<T = any>(url: string, data?: any, config?: RequestConfig): Promise<T> {
    return this.withRetry(() => this.client.patch<T>(url, data).then(res => res.data), config);
  }

  async delete<T = any>(url: string, config?: RequestConfig): Promise<T> {
    return this.withRetry(() => this.client.delete<T>(url).then(res => res.data), config);
  }

  private async withRetry<T>(
    fn: () => Promise<T>,
    config?: RequestConfig
  ): Promise<T> {
    const maxRetries = config?.retries ?? RETRY_CONFIG.MAX_RETRIES;
    let lastError: any;

    for (let i = 0; i < maxRetries; i++) {
      try {
        return await fn();
      } catch (error: any) {
        lastError = error;

        // Don't retry on client errors (4xx)
        if (error.statusCode && error.statusCode >= 400 && error.statusCode < 500) {
          throw error;
        }

        // Don't retry on last attempt
        if (i === maxRetries - 1) {
          throw error;
        }

        // Calculate delay with exponential backoff
        const delay = Math.min(
          (config?.retryDelay ?? RETRY_CONFIG.INITIAL_DELAY) * 
          Math.pow(RETRY_CONFIG.BACKOFF_MULTIPLIER, i),
          RETRY_CONFIG.MAX_DELAY
        );

        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError;
  }
}

export default new APIClient();