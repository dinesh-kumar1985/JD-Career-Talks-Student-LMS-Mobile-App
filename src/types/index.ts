// Authentication Types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupData {
  fullName: string;
  email: string;
  phone?: string;
  password: string;
  role: 'student' | 'instructor' | 'admin';
}

export interface User {
  id: number;
  email: string;
  fullName: string;
  phone?: string;
  profileImage?: string;
  role: 'student' | 'instructor' | 'admin';
  totalCoursesEnrolled: number;
  totalCoursesCompleted: number;
  totalCertificates: number;
  averageRating: number;
  createdAt: string;
}

export interface AuthToken {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  tokenType: string;
}

// Course Types
export interface Course {
  id: number;
  title: string;
  description: string;
  thumbnail?: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  instructorName: string;
  instructorImage?: string;
  durationHours: number;
  totalLessons: number;
  price: number;
  discountPercentage: number;
  totalStudents: number;
  averageRating: number;
  totalReviews: number;
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: string;
}

export interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  status: 'active' | 'completed' | 'dropped';
  progressPercentage: number;
  enrollmentDate: string;
  completionDate?: string;
}

// Lesson Types
export interface Lesson {
  id: number;
  courseId: number;
  title: string;
  description: string;
  videoUrl?: string;
  durationMinutes: number;
  lessonType: 'video' | 'quiz' | 'assignment' | 'resource';
  order: number;
  isPublished: boolean;
  createdAt: string;
}

export interface LessonProgress {
  id: number;
  userId: number;
  lessonId: number;
  status: 'not_started' | 'in_progress' | 'completed';
  progressPercentage: number;
  startedAt?: string;
  completedAt?: string;
}

// Assignment Types
export interface Assignment {
  id: number;
  courseId: number;
  title: string;
  description: string;
  dueDate: string;
  maxScore: number;
  createdAt: string;
}

export interface Submission {
  id: number;
  assignmentId: number;
  userId: number;
  fileUrl: string;
  score?: number;
  feedback?: string;
  status: 'pending' | 'submitted' | 'graded';
  submittedAt: string;
}

// Payment Types
export interface Payment {
  id: number;
  userId: number;
  courseId: number;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: 'pending' | 'success' | 'failed';
  razorpayPaymentId?: string;
  createdAt: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  status: string;
}

// Notification Types
export interface Notification {
  id: number;
  userId: number;
  title: string;
  message: string;
  type: 'assignment' | 'class' | 'payment' | 'certificate' | 'general';
  isRead: boolean;
  createdAt: string;
}

// Certificate Types
export interface Certificate {
  id: number;
  userId: number;
  courseId: number;
  certificateUrl: string;
  issuedAt: string;
  verificationCode: string;
}

// Live Class Types
export interface LiveClass {
  id: number;
  courseId: number;
  title: string;
  description: string;
  meetingLink: string;
  scheduledAt: string;
  durationMinutes: number;
  instructorName: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

export interface ApiError {
  status: number;
  message: string;
  errors?: Record<string, string>;
}
