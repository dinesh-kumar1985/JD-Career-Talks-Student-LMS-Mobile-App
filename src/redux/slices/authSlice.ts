import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState, User, LoginPayload, SignupPayload } from '../../types';
import { authAPI } from '../../services/api/endpoints';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StorageKeys } from '../../constants';

const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

export const login = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const response = await authAPI.login(payload);
      const { user, tokens } = response.data;

      await AsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, tokens.accessToken);
      await AsyncStorage.setItem(StorageKeys.REFRESH_TOKEN, tokens.refreshToken);
      await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(user));

      return { user, tokens };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (payload: SignupPayload, { rejectWithValue }) => {
    try {
      const response = await authAPI.signup(payload);
      const { user, tokens } = response.data;

      await AsyncStorage.setItem(StorageKeys.ACCESS_TOKEN, tokens.accessToken);
      await AsyncStorage.setItem(StorageKeys.REFRESH_TOKEN, tokens.refreshToken);
      await AsyncStorage.setItem(StorageKeys.USER_DATA, JSON.stringify(user));

      return { user, tokens };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Signup failed');
    }
  }
);

export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = await AsyncStorage.getItem(StorageKeys.ACCESS_TOKEN);
      const userData = await AsyncStorage.getItem(StorageKeys.USER_DATA);

      if (accessToken && userData) {
        return {
          user: JSON.parse(userData),
          tokens: {
            accessToken,
            refreshToken: '',
            expiresIn: 0,
          },
        };
      }

      return rejectWithValue('No auth data found');
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
      await AsyncStorage.removeItem(StorageKeys.ACCESS_TOKEN);
      await AsyncStorage.removeItem(StorageKeys.REFRESH_TOKEN);
      await AsyncStorage.removeItem(StorageKeys.USER_DATA);

      return null;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Logout failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.tokens;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.tokens;
        state.error = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.tokens;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;