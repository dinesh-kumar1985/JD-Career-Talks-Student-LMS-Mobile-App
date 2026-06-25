// Dashboard Screen
import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchUserProfile } from '../../redux/slices/authSlice';
import { fetchCourses } from '../../redux/slices/coursesSlice';
import { fetchMyEnrollments } from '../../redux/slices/enrollmentsSlice';
import Header from '../../components/common/Header';
import CourseCard from '../../components/courses/CourseCard';
import ProgressBar from '../../components/courses/ProgressBar';
import { colors } from '../../constants/colors';

const DashboardScreen = ({ navigation }: any) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { data: enrollments } = useSelector((state: RootState) => state.enrollments);
  const { data: courses } = useSelector((state: RootState) => state.courses);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    setRefreshing(true);
    try {
      await dispatch(fetchUserProfile());
      await dispatch(fetchMyEnrollments());
      await dispatch(fetchCourses());
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    initializeData();
  };

  const continueLearning = enrollments?.slice(0, 1) || [];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header title="Dashboard" showBack={false} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome, {user?.fullName}! 👋</Text>
          <Text style={styles.profileImageUrl}>{user?.profileImage}</Text>
        </View>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user?.totalCoursesEnrolled}</Text>
            <Text style={styles.statLabel}>Courses</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user?.totalCoursesCompleted}</Text>
            <Text style={styles.statLabel}>Completed</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{user?.totalCertificates}</Text>
            <Text style={styles.statLabel}>Certificates</Text>
          </View>
        </View>

        {/* Continue Learning */}
        {continueLearnin.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Continue Learning</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Lessons', { enrollmentId: continueLearnig[0].id })}>
                <Text style={styles.viewAll}>View All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={continueLearnig}
              renderItem={({ item }) => (
                <View style={styles.courseItem}>
                  <CourseCard course={item.course} />
                  <ProgressBar percentage={item.progressPercentage} />
                </View>
              )}
              keyExtractor={(item) => item.id.toString()}
              scrollEnabled={false}
            />
          </View>
        )}

        {/* Recent Courses */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Courses</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Courses')}>
              <Text style={styles.viewAll}>View All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={courses?.slice(0, 3)}
            renderItem={({ item }) => <CourseCard course={item} />}
            keyExtractor={(item) => item.id.toString()}
            scrollEnabled={false}
            numColumns={2}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  welcomeSection: { padding: 20, backgroundColor: colors.primary, borderBottomLeftRadius: 20, borderBottomRightRadius: 20 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#FFF' },
  profileImageUrl: { fontSize: 12, color: '#FFF', marginTop: 4 },
  statsContainer: { flexDirection: 'row', paddingHorizontal: 20, marginTop: -30, marginBottom: 20, gap: 12 },
  statCard: { flex: 1, backgroundColor: '#FFF', padding: 16, borderRadius: 12, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 4, elevation: 2 },
  statValue: { fontSize: 24, fontWeight: 'bold', color: colors.primary },
  statLabel: { fontSize: 12, color: colors.textSecondary, marginTop: 4 },
  section: { paddingHorizontal: 20, marginBottom: 24 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: colors.text },
  viewAll: { color: colors.primary, fontSize: 14, fontWeight: '500' },
  courseItem: { marginBottom: 12 },
});

export default DashboardScreen;
