import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Text, Divider } from 'react-native-paper';
import { RootState, AppDispatch } from '../../redux/store';
import { logout } from '../../redux/slices/authSlice';
import { Colors, Typography } from '../../constants';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  const handleLogout = async () => {
    await dispatch(logout());
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.firstName[0]}{user?.lastName[0]}
          </Text>
        </View>
        <Text style={styles.name}>
          {user?.firstName} {user?.lastName}
        </Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Divider />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.settingItem}>
          <Text>Email: {user?.email}</Text>
        </View>
        <View style={styles.settingItem}>
          <Text>Phone: {user?.phone || 'Not set'}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={handleLogout}
          buttonColor={Colors.error}
          style={styles.logoutButton}
        >
          Logout
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    backgroundColor: Colors.primary,
    padding: 20,
    alignItems: 'center',
    paddingTop: 40,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    ...Typography.heading1,
    color: Colors.primary,
  },
  name: {
    ...Typography.heading2,
    color: Colors.white,
    marginBottom: 4,
  },
  email: {
    ...Typography.body,
    color: Colors.secondary,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 16,
  },
  settingItem: {
    paddingVertical: 12,
    borderBottomColor: Colors.border,
    borderBottomWidth: 1,
  },
  buttonContainer: {
    padding: 16,
  },
  logoutButton: {
    paddingVertical: 6,
  },
});

export default ProfileScreen;