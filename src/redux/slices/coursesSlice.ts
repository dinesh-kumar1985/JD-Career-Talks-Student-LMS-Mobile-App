import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { CoursesState } from '../../types';
import { coursesAPI } from '../../services/api/endpoints';

const initialState: CoursesState = {
  courses: [],
  currentCourse: null,
  isLoading: false,
  error: null,
  totalCount: 0,
  currentPage: 1,
};

export const fetchCourses = createAsyncThunk(
  'courses/fetchCourses',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await coursesAPI.listCourses(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch courses');
    }
  }
);

export const searchCourses = createAsyncThunk(
  'courses/searchCourses',
  async ({ query, page = 1, limit = 10 }: { query: string; page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await coursesAPI.searchCourses(query, page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Search failed');
    }
  }
);

export const getCourseDetails = createAsyncThunk(
  'courses/getCourseDetails',
  async (courseId: string, { rejectWithValue }) => {
    try {
      const response = await coursesAPI.getCourseDetails(courseId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch course details');
    }
  }
);

const coursesSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.courses = action.payload.data;
        state.totalCount = action.payload.total;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(searchCourses.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(searchCourses.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.courses = action.payload.data;
        state.totalCount = action.payload.total;
      })
      .addCase(searchCourses.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getCourseDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCourseDetails.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.currentCourse = action.payload;
      })
      .addCase(getCourseDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearCurrentCourse } = coursesSlice.actions;
export default coursesSlice.reducer;