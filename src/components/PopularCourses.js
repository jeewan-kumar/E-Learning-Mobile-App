
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const courseUrl = "http://192.168.33.157:5164/skillup_Course";

const PopularCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const requestData = {
        eventID: "1006",
        addInfo: {
          "req": {}
        }
      };
      const response = await axios.post(courseUrl, requestData);
      if (response.data.rData.rCode === 0) {
        setCourses(response.data.rData.courses[0]); // Assuming courses are an array of objects
      } else {
        setError(response.data.rData.rMessage || 'Failed to fetch courses');
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = (courseId) => {
    Alert.alert('Enroll', `Enroll button clicked for course ID: ${courseId}`);
    // Implement your enroll logic here, e.g., navigate to enrollment screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Popular Courses</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {courses.map((course, index) => (
            <View key={index} style={styles.courseCard}>
              <Image source={{ uri: `data:image/png;base64,${course[6]}` }} style={styles.courseImage} />
              <View style={styles.courseDetails}>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.courseTitle}>{course[1]}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail" style={styles.courseDescription}>{course[2]}</Text>
                <TouchableOpacity style={styles.enrollButton} onPress={() => handleEnroll(course[0])}>
                  <Text style={styles.enrollButtonText}>Enroll Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 10,

  },
  header: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  courseCard: {
    width: 250,
    height: 260,
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 2, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  courseImage: {
    width: '90%',
    height: 140,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  courseDetails: {
    padding: 10,
    flexDirection: 'column', // Ensure text elements are aligned vertically
    justifyContent: 'space-between', // Align elements with space between them
    flex: 1,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5, // Add spacing between title and description
  },
  courseDescription: {
    fontSize: 16,
    lineHeight: 20,
    marginBottom: 10, // Add spacing between description and button
  },
  enrollButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    borderRadius: 5,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PopularCourses;
