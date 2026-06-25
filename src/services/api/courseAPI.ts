// Course API Service
import { apiClient } from './client';
import { Course, Enrollment, PaginatedResponse, ApiResponse } from '../../types';

export const courseAPI = {
  // Get all courses
  getCourses: (page: number = 1, perPage: number = 10, filters?: any) =>
    apiClient.get<PaginatedResponse<Course>>('/api/courses', {
      params: { page, per_page: perPage, ...filters },
    }),

  // Get course details
  getCourseDetails: (courseId: number) =>
    apiClient.get<ApiResponse<Course>>(`/api/courses/${courseId}`),

  // Search courses
  searchCourses: (query: string, page: number = 1) =>
    apiClient.get<PaginatedResponse<Course>>('/api/courses/search', {
      params: { q: query, page },
    }),

  // Get featured courses
  getFeaturedCourses: () =>
    apiClient.get<PaginatedResponse<Course>>('/api/courses/featured'),

  // Get course reviews
  getCourseReviews: (courseId: number, page: number = 1) =>
    apiClient.get('/api/courses/' + courseId + '/reviews', {
      params: { page },
    }),

  // Enroll in course
  enrollCourse: (courseId: number) =>
    apiClient.post<ApiResponse<Enrollment>>(`/api/courses/${courseId}/enroll`),

  // Get my enrollments
  getMyEnrollments: (status?: string) =>
    apiClient.get<PaginatedResponse<Enrollment>>('/api/enrollments', {
      params: { status },
    }),

  // Get enrollment details
  getEnrollmentDetails: (enrollmentId: number) =>
    apiClient.get<ApiResponse<Enrollment>>(`/api/enrollments/${enrollmentId}`),
};
