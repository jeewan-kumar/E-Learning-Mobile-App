
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import axios from 'axios';
import SearchBar from './SearchBar';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';

const courseUrl = "http://192.168.33.157:5164/skillup_Course";

const FilterCours = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    setError('');
    try {
      const requestData = {
        eventID: "1005",
        addInfo: {
          "req": {}
        }
      };
      const response = await axios.post(courseUrl, requestData);
      if (response.data.rData.rCode === 0) {
        setCourses(response.data.rData.courses[0]);
        setFilteredCourses(response.data.rData.courses[0]); // Initialize filtered courses with all courses
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

  const getImageUri = (base64String) => {
    if (base64String.startsWith('/9j/')) {
      return `data:image/jpeg;base64,${base64String}`;
    } else if (base64String.startsWith('iVBORw0KGgo=')) {
      return `data:image/png;base64,${base64String}`;
    } else {
      return `data:image/jpg;base64,${base64String}`; // Default to JPEG if unknown
    }
  };

  const handleSearch = (text) => {
    setQuery(text);
    if (text.trim() === '') {
      setFilteredCourses(courses); // Reset to all courses if search query is empty
    } else {
      const filtered = courses.filter(course => course[1].toLowerCase().includes(text.toLowerCase()));
      setFilteredCourses(filtered);
    }
  };

  const Item = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedId(item[0])} style={[styles.item, selectedId === item[0] && styles.selectedItem]}>
      <Image source={{ uri: getImageUri(item[6]) }} style={styles.courseImage} onError={() => console.log(`Failed to load image for course: ${item[1]}`)} />
      <View style={styles.courseDetails}>
        <Text numberOfLines={1} style={styles.courseTitle}>{item[1]}</Text>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.courseDescription}>{item[2]}</Text>
        <TouchableOpacity style={styles.enrollButton} onPress={() => handleEnroll(item[0])}>
          <Text style={styles.enrollButtonText}>Enroll Now</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <SearchBar query={query} onSearch={handleSearch} />

      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={filteredCourses}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.flatList}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loader: {
    marginTop: 20,
  },
  errorText: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 16,
    color: 'red',
  },
  flatList: {
    paddingVertical: 10,
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  selectedItem: {
    borderColor: '#007AFF',
    borderWidth: 2,
  },
  courseImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
  },
  courseDetails: {
    flex: 1,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  courseDescription: {
    fontSize: 14,
    color: '#555',
  },
  enrollButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default FilterCours;

