import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { ScrollView } from 'react-native-gesture-handler';

const courseUrl = "http://192.168.33.157:5164/skillup_Course";

const SearchScreen = () => {
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
        eventID: "1009",
        addInfo: {
          "keyword": "ai"
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

  const renderItem = ({ item }) => {
    const imageUri = getImageUri(item[6]);
    return (
      <View style={styles.courseCard}>
        <Image
          source={{ uri: imageUri }}
          style={styles.courseImage}
          onError={() => console.log(`Failed to load image for course: ${item[1]}`)}
        />
        <View style={styles.courseDetails}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.courseTitle}>{item[1]}</Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.courseDescription}>{item[2]}</Text>
          <TouchableOpacity style={styles.enrollButton} onPress={() => handleEnroll(item[0])}>
            <Text style={styles.enrollButtonText}>Enroll Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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

  return (
    <ScrollView>
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <FlatList
          data={courses}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${index}-${item[0]}`} // Using a combination of index and courseId as key
          contentContainerStyle={styles.flatListContainer}
          ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
        />
      )}
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
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
  flatListContainer: {
    paddingHorizontal: 10,
  },
  courseCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  courseImage: {
    width: 120,
    height: 90,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  courseDetails: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
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
  noResults: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#666',
  },
});

export default SearchScreen;



// import React, { useState } from 'react';
// import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import { searchCourses } from '../services/courses';
// import Loader from '../components/Loader';
// import ErrorMessage from '../components/ErrorMessage';

// const SearchScreen = ({ navigation }) => {
//   const [query, setQuery] = useState('');
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSearch = async () => {
//     setLoading(true);
//     setError('');
//     try {
//       const searchResults = await searchCourses(query);
//       setResults(searchResults);
//     } catch (e) {
//       setError('Failed to load search results.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.courseItem}
//       onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
//     >
//       <Text style={styles.courseTitle}>{item.title}</Text>
//       <Text style={styles.courseDescription}>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search for courses"
//         value={query}
//         onChangeText={setQuery}
//         onSubmitEditing={handleSearch}
//       />
//       {loading ? (
//         <Loader />
//       ) : error ? (
//         <ErrorMessage error={error} />
//       ) : (
//         <FlatList
//           data={results}
//           renderItem={renderItem}
//           keyExtractor={(item) => item.id.toString()}
//           ListEmptyComponent={<Text style={styles.noResults}>No results found</Text>}
//         />
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   searchInput: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 20,
//   },
//   courseItem: {
//     padding: 20,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   courseTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   courseDescription: {
//     fontSize: 14,
//     color: '#666',
//   },
//   noResults: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: '#666',
//   },
// });

// export default SearchScreen;
