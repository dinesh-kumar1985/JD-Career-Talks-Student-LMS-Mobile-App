import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { EnrollmentsState } from '../../types';
import { enrollmentsAPI } from '../../services/api/endpoints';

const initialState: EnrollmentsState = {
  enrollments: [],
  isLoading: false,
  error: null,
};

export const fetchEnrollments = createAsyncThunk(
  'enrollments/fetchEnrollments',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await enrollmentsAPI.listEnrollments(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch enrollments');
    }
  }
);

export const createEnrollment = createAsyncThunk(
  'enrollments/createEnrollment',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await enrollmentsAPI.createEnrollment(courseId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Enrollment failed');
    }
  }
);

const enrollmentsSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrollments.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.enrollments = action.payload.data;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(createEnrollment.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEnrollment.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.enrollments.push(action.payload);
      })
      .addCase(createEnrollment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError } = enrollmentsSlice.actions;
export default enrollmentsSlice.reducer;