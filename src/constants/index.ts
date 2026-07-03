export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'https://api.jdcareertalks.com';
export const API_TIMEOUT = 30000;

// Firebase Constants
export const FIREBASE_CONFIG = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

// Razorpay Constants
export const RAZORPAY_KEY_ID = process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID;

// App Constants
export const APP_NAME = process.env.EXPO_PUBLIC_APP_NAME || 'JD Career Talks';
export const APP_VERSION = process.env.EXPO_PUBLIC_VERSION || '1.0.0';
export const DEBUG_MODE = process.env.EXPO_PUBLIC_DEBUG === 'true';

// Storage Keys
export enum StorageKeys {
  ACCESS_TOKEN = '@jd_access_token',
  REFRESH_TOKEN = '@jd_refresh_token',
  USER_DATA = '@jd_user_data',
  CURRENT_USER_ID = '@jd_current_user_id',
  FCM_TOKEN = '@jd_fcm_token',
  THEME_MODE = '@jd_theme_mode',
  LANGUAGE = '@jd_language',
  OFFLINE_DATA = '@jd_offline_data',
}

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_LOGIN: '/api/auth/login',
  AUTH_SIGNUP: '/api/auth/signup',
  AUTH_LOGOUT: '/api/auth/logout',
  AUTH_REFRESH: '/api/auth/refresh-token',
  AUTH_VERIFY_OTP: '/api/auth/verify-otp',
  AUTH_SEND_OTP: '/api/auth/send-otp',
  AUTH_FORGOT_PASSWORD: '/api/auth/forgot-password',
  AUTH_RESET_PASSWORD: '/api/auth/reset-password',

  // User
  USER_PROFILE: '/api/users/profile',
  USER_UPDATE_PROFILE: '/api/users/profile',
  USER_CHANGE_PASSWORD: '/api/users/change-password',
  USER_UPDATE_PREFERENCES: '/api/users/preferences',

  // Courses
  COURSES_LIST: '/api/courses',
  COURSES_DETAILS: '/api/courses/:id',
  COURSES_SEARCH: '/api/courses/search',
  COURSES_BY_CATEGORY: '/api/courses/category/:category',

  // Lessons
  LESSONS_LIST: '/api/lessons',
  LESSONS_DETAILS: '/api/lessons/:id',
  LESSONS_MARK_COMPLETE: '/api/lessons/:id/complete',
  LESSONS_PROGRESS: '/api/lessons/:id/progress',

  // Enrollments
  ENROLLMENTS_LIST: '/api/enrollments',
  ENROLLMENTS_CREATE: '/api/enrollments',
  ENROLLMENTS_DETAILS: '/api/enrollments/:id',
  ENROLLMENTS_PROGRESS: '/api/enrollments/:id/progress',

  // Assignments
  ASSIGNMENTS_LIST: '/api/assignments',
  ASSIGNMENTS_DETAILS: '/api/assignments/:id',
  SUBMISSIONS_CREATE: '/api/submissions',
  SUBMISSIONS_LIST: '/api/submissions',

  // Payments
  PAYMENTS_CREATE_ORDER: '/api/payments/create-order',
  PAYMENTS_VERIFY: '/api/payments/verify',
  PAYMENTS_HISTORY: '/api/payments/history',

  // Notifications
  NOTIFICATIONS_LIST: '/api/notifications',
  NOTIFICATIONS_MARK_READ: '/api/notifications/:id/read',
  NOTIFICATIONS_REGISTER_TOKEN: '/api/notifications/register-token',

  // Reviews
  REVIEWS_LIST: '/api/reviews',
  REVIEWS_CREATE: '/api/reviews',
  REVIEWS_BY_COURSE: '/api/reviews/course/:courseId',

  // Live Classes
  LIVE_CLASSES_LIST: '/api/live-classes',
  LIVE_CLASSES_DETAILS: '/api/live-classes/:id',
  LIVE_CLASSES_JOIN: '/api/live-classes/:id/join',

  // Certificates
  CERTIFICATES_LIST: '/api/certificates',
  CERTIFICATES_DOWNLOAD: '/api/certificates/:id/download',
  CERTIFICATES_VERIFY: '/api/certificates/:id/verify',
};

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network connection failed. Please check your internet connection.',
  TIMEOUT_ERROR: 'Request timed out. Please try again.',
  AUTH_ERROR: 'Authentication failed. Please log in again.',
  VALIDATION_ERROR: 'Please fill all required fields correctly.',
  SERVER_ERROR: 'Server error. Please try again later.',
  UNKNOWN_ERROR: 'Something went wrong. Please try again.',
  PAYMENT_ERROR: 'Payment failed. Please try again.',
  ENROLLMENT_ERROR: 'Enrollment failed. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
  LOGIN_SUCCESS: 'Logged in successfully',
  SIGNUP_SUCCESS: 'Account created successfully',
  LOGOUT_SUCCESS: 'Logged out successfully',
  PROFILE_UPDATED: 'Profile updated successfully',
  PAYMENT_SUCCESS: 'Payment processed successfully',
  ENROLLMENT_SUCCESS: 'Enrolled successfully',
  ASSIGNMENT_SUBMITTED: 'Assignment submitted successfully',
};

// Validation Rules
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE_REGEX: /^[0-9]{10}$/,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
};

// Cache Duration (in milliseconds)
export const CACHE_DURATION = {
  SHORT: 5 * 60 * 1000, // 5 minutes
  MEDIUM: 30 * 60 * 1000, // 30 minutes
  LONG: 24 * 60 * 60 * 1000, // 24 hours
};

// Retry Configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  INITIAL_DELAY: 1000, // 1 second
  MAX_DELAY: 10000, // 10 seconds
  BACKOFF_MULTIPLIER: 2,
};

// Video Player Configuration
export const VIDEO_PLAYER_CONFIG = {
  BUFFER_FOR_PLAYBACK: 2500,
  BUFFER_FOR_PLAYBACK_AFTER_REBUFFER: 5000,
  MIN_PLAYBACK_START_DELAY: 1500,
};

// Course Levels
export const COURSE_LEVELS = {
  BEGINNER: 'beginner',
  INTERMEDIATE: 'intermediate',
  ADVANCED: 'advanced',
};

// Assignment Status
export const ASSIGNMENT_STATUS = {
  NOT_SUBMITTED: 'not_submitted',
  SUBMITTED: 'submitted',
  GRADED: 'graded',
  OVERDUE: 'overdue',
};

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed',
  CANCELLED: 'cancelled',
};

// Notification Types
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  SUCCESS: 'success',
  ERROR: 'error',
};

// Route Names
export const ROUTE_NAMES = {
  // Auth Routes
  LOGIN: 'Login',
  SIGNUP: 'Signup',
  OTP_VERIFICATION: 'OTPVerification',
  FORGOT_PASSWORD: 'ForgotPassword',
  RESET_PASSWORD: 'ResetPassword',
  SPLASH: 'Splash',

  // Main Routes
  HOME: 'Home',
  COURSES: 'Courses',
  COURSE_DETAILS: 'CourseDetails',
  LESSONS: 'Lessons',
  LESSON_DETAILS: 'LessonDetails',
  MY_ENROLLMENTS: 'MyEnrollments',
  ASSIGNMENTS: 'Assignments',
  ASSIGNMENT_DETAILS: 'AssignmentDetails',
  LIVE_CLASSES: 'LiveClasses',
  LIVE_CLASS_DETAILS: 'LiveClassDetails',
  NOTIFICATIONS: 'Notifications',
  CART: 'Cart',
  CHECKOUT: 'Checkout',
  PAYMENT_SUCCESS: 'PaymentSuccess',
  CERTIFICATES: 'Certificates',
  PROFILE: 'Profile',
  EDIT_PROFILE: 'EditProfile',
  SETTINGS: 'Settings',
};

// Deep Link URLs
export const DEEP_LINKS = {
  COURSE: 'jdcareertalks://course/:id',
  LESSON: 'jdcareertalks://lesson/:id',
  ASSIGNMENT: 'jdcareertalks://assignment/:id',
  LIVE_CLASS: 'jdcareertalks://live-class/:id',
  CERTIFICATE: 'jdcareertalks://certificate/:id',
};
