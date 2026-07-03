import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Card, Button } from 'react-native-paper';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchCourses } from '../../redux/slices/coursesSlice';
import { Colors, Typography } from '../../constants';

const HomeScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading } = useSelector((state: RootState) => state.courses);
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(fetchCourses({ page: 1, limit: 5 }));
  }, [dispatch]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome, {user?.firstName}!</Text>
        <Text style={styles.subtitle}>Continue your learning journey</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recommended Courses</Text>
        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={courses.slice(0, 5)}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Card style={styles.courseCard}>
                <Card.Content>
                  <Text style={styles.courseTitle}>{item.title}</Text>
                  <Text numberOfLines={2} style={styles.courseDescription}>
                    {item.description}
                  </Text>
                  <View style={styles.courseFooter}>
                    <Text style={styles.rating}>⭐ {item.rating}</Text>
                    <Text style={styles.price}>₹{item.price}</Text>
                  </View>
                </Card.Content>
              </Card>
            )}
            keyExtractor={(item) => item.id}
          />
        )}
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
    paddingTop: 40,
  },
  greeting: {
    ...Typography.heading2,
    color: Colors.white,
    marginBottom: 8,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.secondary,
  },
  section: {
    padding: 16,
  },
  sectionTitle: {
    ...Typography.heading3,
    marginBottom: 12,
  },
  courseCard: {
    marginBottom: 12,
  },
  courseTitle: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    marginBottom: 8,
  },
  courseDescription: {
    ...Typography.bodySmall,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    ...Typography.body,
  },
  price: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default HomeScreen;