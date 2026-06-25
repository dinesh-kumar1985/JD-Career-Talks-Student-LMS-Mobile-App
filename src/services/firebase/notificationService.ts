// Firebase Notification Service
import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';

export const initializeNotifications = async () => {
  try {
    // Request permission
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      // Get FCM token
      const token = await messaging().getToken();
      console.log('FCM Token:', token);

      // Save token to backend
      // await api.post('/api/notifications/register-token', { token });

      // Handle foreground messages
      const unsubscribe = messaging().onMessage(async (remoteMessage) => {
        console.log('Notification received:', remoteMessage);
        showNotification(remoteMessage);
      });

      return unsubscribe;
    }
  } catch (error) {
    console.error('Notification initialization error:', error);
  }
};

const showNotification = async (remoteMessage: any) => {
  if (Platform.OS === 'android') {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: remoteMessage.notification?.title,
        body: remoteMessage.notification?.body,
        data: remoteMessage.data,
      },
      trigger: null,
    });
  }
};

// Handle notification tap
export const setupNotificationHandlers = () => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
    }),
  });

  // Listen to notification responses
  const subscription = Notifications.addNotificationResponseReceivedListener((response) => {
    console.log('Notification tapped:', response);
    // Handle navigation based on notification type
  });

  return () => subscription.remove();
};
