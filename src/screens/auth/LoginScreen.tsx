// Login Screen Component
import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Text,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { loginUser } from '../../redux/slices/authSlice';
import { RootState, AppDispatch } from '../../redux/store';
import TextInput from '../../components/common/TextInput';
import Button from '../../components/common/Button';
import { colors } from '../../constants/colors';

const LoginScreen = ({ navigation }: any) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  });

  const onSubmit = async (data: any) => {
    const result = await dispatch(loginUser(data));
    if (result.meta.requestStatus === 'fulfilled') {
      // Navigation handled by Redux
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back!</Text>
          <Text style={styles.subtitle}>Login to continue learning</Text>
        </View>

        {/* Error Message */}
        {error && <View style={styles.errorBox}><Text style={styles.errorText}>{error}</Text></View>}

        {/* Form */}
        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Email or Phone"
                keyboardType="email-address"
                editable={!isLoading}
                error={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={{
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters' },
            }}
            render={({ field }) => (
              <TextInput
                {...field}
                placeholder="Password"
                secureTextEntry={!showPassword}
                editable={!isLoading}
                error={errors.password?.message}
                rightIcon={showPassword ? 'eye-off' : 'eye'}
                onRightIconPress={() => setShowPassword(!showPassword)}
              />
            )}
          />

          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>

        {/* Login Button */}
        <Button
          title="Login"
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}
          style={styles.loginButton}
        />

        {/* Divider */}
        <View style={styles.divider}>
          <View style={styles.line} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Social Login */}
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <Text style={styles.socialText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        {/* Signup Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20, paddingTop: 40 },
  header: { marginBottom: 30 },
  title: { fontSize: 28, fontWeight: 'bold', color: colors.primary },
  subtitle: { fontSize: 16, color: colors.textSecondary, marginTop: 8 },
  errorBox: { backgroundColor: '#FFEBEE', padding: 12, borderRadius: 8, marginBottom: 20 },
  errorText: { color: '#C62828', fontSize: 14 },
  form: { marginBottom: 20 },
  forgotPassword: { color: colors.primary, fontSize: 14, marginTop: 12, textAlign: 'right' },
  loginButton: { marginTop: 20 },
  divider: { flexDirection: 'row', alignItems: 'center', marginVertical: 24 },
  line: { flex: 1, height: 1, backgroundColor: '#DDD' },
  dividerText: { marginHorizontal: 10, color: colors.textSecondary },
  socialContainer: { flexDirection: 'row', gap: 12 },
  socialButton: { flex: 1, paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: '#DDD', alignItems: 'center' },
  socialText: { fontSize: 14, fontWeight: '600', color: colors.text },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  footerText: { color: colors.textSecondary, fontSize: 14 },
  signupLink: { color: colors.primary, fontWeight: '600', fontSize: 14 },
});

export default LoginScreen;
