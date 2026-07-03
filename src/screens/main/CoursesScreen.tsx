import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Card, Searchbar } from 'react-native-paper';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchCourses, searchCourses } from '../../redux/slices/coursesSlice';
import { Colors, Typography } from '../../constants';

const CoursesScreen: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, isLoading } = useSelector((state: RootState) => state.courses);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (searchQuery.trim()) {
      dispatch(searchCourses({ query: searchQuery }));
    } else {
      dispatch(fetchCourses({ page: 1, limit: 20 }));
    }
  }, [searchQuery, dispatch]);

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search courses"
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchbar}
      />

      {isLoading ? (
        <View style={styles.loadingContainer}>
          <Text>Loading courses...</Text>
        </View>
      ) : (
        <FlatList
          data={courses}
          renderItem={({ item }) => (
            <Card style={styles.courseCard}>
              <Card.Content>
                <Text style={styles.courseTitle}>{item.title}</Text>
                <Text numberOfLines={2} style={styles.courseDescription}>
                  {item.description}
                </Text>
                <View style={styles.courseInfo}>
                  <Text style={styles.instructor}>{item.instructor}</Text>
                  <Text style={styles.price}>₹{item.price}</Text>
                </View>
              </Card.Content>
            </Card>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchbar: {
    margin: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
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
  courseInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  instructor: {
    ...Typography.caption,
    color: Colors.textSecondary,
  },
  price: {
    ...Typography.body,
    fontWeight: '600',
    color: Colors.primary,
  },
});

export default CoursesScreen;