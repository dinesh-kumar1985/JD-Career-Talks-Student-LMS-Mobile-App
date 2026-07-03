import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import OTPScreen from '../screens/auth/OTPScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import { ROUTE_NAMES } from '../constants';

const Stack = createNativeStackNavigator();

const AuthNavigator: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: 'white' },
      }}
    >
      <Stack.Screen name={ROUTE_NAMES.LOGIN} component={LoginScreen} />
      <Stack.Screen name={ROUTE_NAMES.SIGNUP} component={SignupScreen} />
      <Stack.Screen name={ROUTE_NAMES.OTP_VERIFICATION} component={OTPScreen} />
      <Stack.Screen name={ROUTE_NAMES.FORGOT_PASSWORD} component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;