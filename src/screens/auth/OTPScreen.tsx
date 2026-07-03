import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants';

const OTPScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>OTP Verification Screen - Coming Soon</Text>
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

export default OTPScreen;