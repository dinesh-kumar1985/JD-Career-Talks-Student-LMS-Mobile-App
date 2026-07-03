import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { LessonsState, Lesson } from '../../types';
import { lessonsAPI } from '../../services/api/endpoints';

const initialState: LessonsState = {
  lessons: [],
  currentLesson: null,
  isLoading: false,
  error: null,
};

export const fetchLessons = createAsyncThunk(
  'lessons/fetchLessons',
  async ({ courseId, page = 1, limit = 10 }: { courseId: string; page?: number; limit?: number }, { rejectWithValue }) => {
    try {
      const response = await lessonsAPI.listLessons(courseId, page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch lessons');
    }
  }
);

export const getLessonDetails = createAsyncThunk(
  'lessons/getLessonDetails',
  async (lessonId: string, { rejectWithValue }) => {
    try {
      const response = await lessonsAPI.getLessonDetails(lessonId);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch lesson');
    }
  }
);

export const markLessonComplete = createAsyncThunk(
  'lessons/markLessonComplete',
  async (lessonId: string, { rejectWithValue }) => {
    try {
      await lessonsAPI.markLessonComplete(lessonId);
      return lessonId;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to mark lesson complete');
    }
  }
);

const lessonsSlice = createSlice({
  name: 'lessons',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLessons.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchLessons.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.lessons = action.payload.data;
      })
      .addCase(fetchLessons.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(getLessonDetails.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getLessonDetails.fulfilled, (state, action: any) => {
        state.isLoading = false;
        state.currentLesson = action.payload;
      })
      .addCase(getLessonDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(markLessonComplete.fulfilled, (state, action) => {
        if (state.currentLesson && state.currentLesson.id === action.payload) {
          state.currentLesson.isCompleted = true;
        }
      });
  },
});

export const { clearError } = lessonsSlice.actions;
export default lessonsSlice.reducer;