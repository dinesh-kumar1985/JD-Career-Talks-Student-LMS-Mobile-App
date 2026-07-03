import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import coursesReducer from './slices/coursesSlice';
import enrollmentsReducer from './slices/enrollmentsSlice';
import lessonsReducer from './slices/lessonsSlice';
import notificationsReducer from './slices/notificationsSlice';
import paymentReducer from './slices/paymentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    courses: coursesReducer,
    enrollments: enrollmentsReducer,
    lessons: lessonsReducer,
    notifications: notificationsReducer,
    payment: paymentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;