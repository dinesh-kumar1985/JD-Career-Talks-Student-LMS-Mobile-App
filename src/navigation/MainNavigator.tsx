import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import HomeScreen from '../screens/main/HomeScreen';
import CoursesScreen from '../screens/main/CoursesScreen';
import CourseDetailsScreen from '../screens/main/CourseDetailsScreen';
import ProfileScreen from '../screens/main/ProfileScreen';
import { Colors } from '../constants/colors';
import { ROUTE_NAMES } from '../constants';

const Tab = createBottomTabNavigator();
const CourseStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

const CourseStackNavigator: React.FC = () => {
  return (
    <CourseStack.Navigator>
      <CourseStack.Screen
        name={ROUTE_NAMES.COURSES}
        component={CoursesScreen}
        options={{ headerShown: false }}
      />
      <CourseStack.Screen
        name={ROUTE_NAMES.COURSE_DETAILS}
        component={CourseDetailsScreen}
        options={{ headerShown: false }}
      />
    </CourseStack.Navigator>
  );
};

const ProfileStackNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name={ROUTE_NAMES.PROFILE}
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
};

const MainNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textTertiary,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          paddingBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name={ROUTE_NAMES.HOME}
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="CoursesStack"
        component={CourseStackNavigator}
        options={{
          tabBarLabel: 'Courses',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="book" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStackNavigator}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;