// Razorpay Payment Service
import RazorpayCheckout from 'react-native-razorpay';
import { apiClient } from '../api/client';

export const razorpayService = {
  // Create order on backend
  createOrder: (courseId: number, amount: number) =>
    apiClient.post('/api/payments/create-order', {
      course_id: courseId,
      amount,
    }),

  // Initiate payment
  initiatePayment: async (
    orderId: string,
    amount: number,
    email: string,
    phone: string,
    courseName: string
  ) => {
    try {
      const options = {
        key: process.env.EXPO_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount * 100, // Convert to paise
        currency: 'INR',
        order_id: orderId,
        description: `Enroll in ${courseName}`,
        image: 'https://your-logo-url.com/logo.png',
        prefill: {
          email,
          contact: phone,
        },
        theme: {
          color: '#0D47A1',
        },
      };

      return new Promise((resolve, reject) => {
        RazorpayCheckout.open(options)
          .then((data) => {
            // Payment success
            resolve(data);
          })
          .catch((error) => {
            // Payment failed
            reject(error);
          });
      });
    } catch (error) {
      throw error;
    }
  },

  // Verify payment
  verifyPayment: (razorpayPaymentId: string, razorpayOrderId: string, razorpaySignature: string) =>
    apiClient.post('/api/payments/verify', {
      razorpay_payment_id: razorpayPaymentId,
      razorpay_order_id: razorpayOrderId,
      razorpay_signature: razorpaySignature,
    }),

  // Get payment history
  getPaymentHistory: (page: number = 1) =>
    apiClient.get('/api/payments/history', {
      params: { page },
    }),
};
