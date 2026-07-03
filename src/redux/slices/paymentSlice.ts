import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PaymentState } from '../../types';
import { paymentsAPI } from '../../services/api/endpoints';

const initialState: PaymentState = {
  cart: [],
  payments: [],
  isProcessing: false,
  error: null,
  totalAmount: 0,
};

export const createPaymentOrder = createAsyncThunk(
  'payment/createOrder',
  async ({ courseId, amount }: { courseId: string; amount: number }, { rejectWithValue }) => {
    try {
      const response = await paymentsAPI.createOrder(courseId, amount);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create order');
    }
  }
);

export const verifyPayment = createAsyncThunk(
  'payment/verify',
  async (
    { orderId, paymentId, signature }: { orderId: string; paymentId: string; signature: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await paymentsAPI.verifyPayment(orderId, paymentId, signature);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Payment verification failed');
    }
  }
);

export const fetchPaymentHistory = createAsyncThunk(
  'payment/fetchHistory',
  async ({ page = 1, limit = 10 }: { page?: number; limit?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await paymentsAPI.getPaymentHistory(page, limit);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch payment history');
    }
  }
);

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cart.find(c => c.courseId === action.payload.courseId);
      if (!item) {
        state.cart.push(action.payload);
        state.totalAmount += action.payload.course.price;
      }
    },
    removeFromCart: (state, action) => {
      const index = state.cart.findIndex(c => c.courseId === action.payload);
      if (index >= 0) {
        state.totalAmount -= state.cart[index].course.price;
        state.cart.splice(index, 1);
      }
    },
    clearCart: (state) => {
      state.cart = [];
      state.totalAmount = 0;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPaymentOrder.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(createPaymentOrder.fulfilled, (state) => {
        state.isProcessing = false;
      })
      .addCase(createPaymentOrder.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload as string;
      })
      .addCase(verifyPayment.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(verifyPayment.fulfilled, (state, action: any) => {
        state.isProcessing = false;
        state.payments.push(action.payload);
        state.cart = [];
        state.totalAmount = 0;
      })
      .addCase(verifyPayment.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPaymentHistory.pending, (state) => {
        state.isProcessing = true;
        state.error = null;
      })
      .addCase(fetchPaymentHistory.fulfilled, (state, action: any) => {
        state.isProcessing = false;
        state.payments = action.payload.data;
      })
      .addCase(fetchPaymentHistory.rejected, (state, action) => {
        state.isProcessing = false;
        state.error = action.payload as string;
      });
  },
});

export const { addToCart, removeFromCart, clearCart, clearError } = paymentSlice.actions;
export default paymentSlice.reducer;