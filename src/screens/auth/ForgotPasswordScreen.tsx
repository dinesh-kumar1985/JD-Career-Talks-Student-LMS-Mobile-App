import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants';

const ForgotPasswordScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Forgot Password Screen - Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
});

export default ForgotPasswordScreen;