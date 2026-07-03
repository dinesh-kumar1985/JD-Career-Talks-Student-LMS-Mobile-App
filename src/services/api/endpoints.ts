import apiClient from './client';
import {
  User,
  AuthToken,
  SignupPayload,
  LoginPayload,
  OTPVerificationPayload,
  PasswordResetPayload,
  Course,
  CourseDetail,
  Lesson,
  Enrollment,
  Assignment,
  Submission,
  Payment,
  Notification,
  Review,
  LiveClass,
  Certificate,
  PaginatedResponse,
} from '../../types';
import { API_ENDPOINTS } from '../../constants';

// Auth Endpoints
export const authAPI = {
  login: async (payload: LoginPayload) => {
    const response = await apiClient.post<{ user: User; tokens: AuthToken }>(
      API_ENDPOINTS.AUTH_LOGIN,
      payload
    );
    return response;
  },

  signup: async (payload: SignupPayload) => {
    const response = await apiClient.post<{ user: User; tokens: AuthToken }>(
      API_ENDPOINTS.AUTH_SIGNUP,
      payload
    );
    return response;
  },

  logout: async () => {
    return apiClient.post(API_ENDPOINTS.AUTH_LOGOUT);
  },

  refreshToken: async (refreshToken: string) => {
    const response = await apiClient.post<AuthToken>(
      API_ENDPOINTS.AUTH_REFRESH,
      { refreshToken }
    );
    return response;
  },

  sendOTP: async (email: string) => {
    return apiClient.post(API_ENDPOINTS.AUTH_SEND_OTP, { email });
  },

  verifyOTP: async (payload: OTPVerificationPayload) => {
    const response = await apiClient.post<{ user: User; tokens: AuthToken }>(
      API_ENDPOINTS.AUTH_VERIFY_OTP,
      payload
    );
    return response;
  },

  forgotPassword: async (email: string) => {
    return apiClient.post(API_ENDPOINTS.AUTH_FORGOT_PASSWORD, { email });
  },

  resetPassword: async (payload: PasswordResetPayload) => {
    return apiClient.post(API_ENDPOINTS.AUTH_RESET_PASSWORD, payload);
  },
};

// User Endpoints
export const userAPI = {
  getProfile: async () => {
    const response = await apiClient.get<User>(API_ENDPOINTS.USER_PROFILE);
    return response;
  },

  updateProfile: async (data: Partial<User>) => {
    const response = await apiClient.put<User>(
      API_ENDPOINTS.USER_UPDATE_PROFILE,
      data
    );
    return response;
  },

  changePassword: async (oldPassword: string, newPassword: string) => {
    return apiClient.post(API_ENDPOINTS.USER_CHANGE_PASSWORD, {
      oldPassword,
      newPassword,
    });
  },

  updatePreferences: async (preferences: Record<string, any>) => {
    return apiClient.post(API_ENDPOINTS.USER_UPDATE_PREFERENCES, preferences);
  },
};

// Course Endpoints
export const coursesAPI = {
  listCourses: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Course>>(
      `${API_ENDPOINTS.COURSES_LIST}?page=${page}&limit=${limit}`
    );
    return response;
  },

  getCourseDetails: async (courseId: string) => {
    const response = await apiClient.get<CourseDetail>(
      API_ENDPOINTS.COURSES_DETAILS.replace(':id', courseId)
    );
    return response;
  },

  searchCourses: async (query: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Course>>(
      `${API_ENDPOINTS.COURSES_SEARCH}?query=${query}&page=${page}&limit=${limit}`
    );
    return response;
  },

  getCoursesByCategory: async (category: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Course>>(
      `${API_ENDPOINTS.COURSES_BY_CATEGORY.replace(':category', category)}?page=${page}&limit=${limit}`
    );
    return response;
  },
};

// Lesson Endpoints
export const lessonsAPI = {
  listLessons: async (courseId: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Lesson>>(
      `${API_ENDPOINTS.LESSONS_LIST}?courseId=${courseId}&page=${page}&limit=${limit}`
    );
    return response;
  },

  getLessonDetails: async (lessonId: string) => {
    const response = await apiClient.get<Lesson>(
      API_ENDPOINTS.LESSONS_DETAILS.replace(':id', lessonId)
    );
    return response;
  },

  markLessonComplete: async (lessonId: string) => {
    return apiClient.post(
      API_ENDPOINTS.LESSONS_MARK_COMPLETE.replace(':id', lessonId)
    );
  },

  updateLessonProgress: async (lessonId: string, progress: number) => {
    return apiClient.post(
      API_ENDPOINTS.LESSONS_PROGRESS.replace(':id', lessonId),
      { progress }
    );
  },
};

// Enrollment Endpoints
export const enrollmentsAPI = {
  listEnrollments: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Enrollment>>(
      `${API_ENDPOINTS.ENROLLMENTS_LIST}?page=${page}&limit=${limit}`
    );
    return response;
  },

  createEnrollment: async (courseId: string) => {
    const response = await apiClient.post<Enrollment>(
      API_ENDPOINTS.ENROLLMENTS_CREATE,
      { courseId }
    );
    return response;
  },

  getEnrollmentDetails: async (enrollmentId: string) => {
    const response = await apiClient.get<Enrollment>(
      API_ENDPOINTS.ENROLLMENTS_DETAILS.replace(':id', enrollmentId)
    );
    return response;
  },

  getEnrollmentProgress: async (enrollmentId: string) => {
    const response = await apiClient.get<{ progress: number; completedLessons: number; totalLessons: number }>(
      API_ENDPOINTS.ENROLLMENTS_PROGRESS.replace(':id', enrollmentId)
    );
    return response;
  },
};

// Assignment Endpoints
export const assignmentsAPI = {
  listAssignments: async (courseId: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Assignment>>(
      `${API_ENDPOINTS.ASSIGNMENTS_LIST}?courseId=${courseId}&page=${page}&limit=${limit}`
    );
    return response;
  },

  getAssignmentDetails: async (assignmentId: string) => {
    const response = await apiClient.get<Assignment>(
      API_ENDPOINTS.ASSIGNMENTS_DETAILS.replace(':id', assignmentId)
    );
    return response;
  },

  submitAssignment: async (assignmentId: string, content: string) => {
    const response = await apiClient.post<Submission>(
      API_ENDPOINTS.SUBMISSIONS_CREATE,
      { assignmentId, content }
    );
    return response;
  },

  listSubmissions: async (assignmentId: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Submission>>(
      `${API_ENDPOINTS.SUBMISSIONS_LIST}?assignmentId=${assignmentId}&page=${page}&limit=${limit}`
    );
    return response;
  },
};

// Payment Endpoints
export const paymentsAPI = {
  createOrder: async (courseId: string, amount: number) => {
    const response = await apiClient.post<{ orderId: string; amount: number }>(
      API_ENDPOINTS.PAYMENTS_CREATE_ORDER,
      { courseId, amount }
    );
    return response;
  },

  verifyPayment: async (
    orderId: string,
    paymentId: string,
    signature: string
  ) => {
    const response = await apiClient.post<Payment>(
      API_ENDPOINTS.PAYMENTS_VERIFY,
      { orderId, paymentId, signature }
    );
    return response;
  },

  getPaymentHistory: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Payment>>(
      `${API_ENDPOINTS.PAYMENTS_HISTORY}?page=${page}&limit=${limit}`
    );
    return response;
  },
};

// Notification Endpoints
export const notificationsAPI = {
  listNotifications: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Notification>>(
      `${API_ENDPOINTS.NOTIFICATIONS_LIST}?page=${page}&limit=${limit}`
    );
    return response;
  },

  markAsRead: async (notificationId: string) => {
    return apiClient.post(
      API_ENDPOINTS.NOTIFICATIONS_MARK_READ.replace(':id', notificationId)
    );
  },

  registerFCMToken: async (token: string) => {
    return apiClient.post(API_ENDPOINTS.NOTIFICATIONS_REGISTER_TOKEN, { token });
  },
};

// Review Endpoints
export const reviewsAPI = {
  listReviews: async (courseId: string, page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Review>>(
      `${API_ENDPOINTS.REVIEWS_BY_COURSE.replace(':courseId', courseId)}?page=${page}&limit=${limit}`
    );
    return response;
  },

  createReview: async (courseId: string, rating: number, title: string, comment: string) => {
    const response = await apiClient.post<Review>(
      API_ENDPOINTS.REVIEWS_CREATE,
      { courseId, rating, title, comment }
    );
    return response;
  },
};

// Live Class Endpoints
export const liveClassesAPI = {
  listLiveClasses: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<LiveClass>>(
      `${API_ENDPOINTS.LIVE_CLASSES_LIST}?page=${page}&limit=${limit}`
    );
    return response;
  },

  getLiveClassDetails: async (classId: string) => {
    const response = await apiClient.get<LiveClass>(
      API_ENDPOINTS.LIVE_CLASSES_DETAILS.replace(':id', classId)
    );
    return response;
  },

  joinLiveClass: async (classId: string) => {
    const response = await apiClient.post(
      API_ENDPOINTS.LIVE_CLASSES_JOIN.replace(':id', classId)
    );
    return response;
  },
};

// Certificate Endpoints
export const certificatesAPI = {
  listCertificates: async (page: number = 1, limit: number = 10) => {
    const response = await apiClient.get<PaginatedResponse<Certificate>>(
      `${API_ENDPOINTS.CERTIFICATES_LIST}?page=${page}&limit=${limit}`
    );
    return response;
  },

  downloadCertificate: async (certificateId: string) => {
    return apiClient.get<Blob>(
      API_ENDPOINTS.CERTIFICATES_DOWNLOAD.replace(':id', certificateId)
    );
  },

  verifyCertificate: async (certificateId: string) => {
    const response = await apiClient.get(
      API_ENDPOINTS.CERTIFICATES_VERIFY.replace(':id', certificateId)
    );
    return response;
  },
};
