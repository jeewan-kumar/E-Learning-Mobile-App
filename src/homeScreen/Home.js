
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import { getCourses, getPopularCourses, getEnrolledCourses, searchCourses } from '../services/courses';

// import Loader from '../components/Loader';
// import ErrorMessage from '../components/ErrorMessage';
// import Header from '../components/Header';

// const Home = ({ navigation, route }) => {
//   const [courses, setCourses] = useState([]);
//   const [popularCourses, setPopularCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const { email } = route.params || {};

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const allCourses = await getCourses();
//         const popular = await getPopularCourses();
//         const enrolled = await getEnrolledCourses();
//         setCourses(allCourses);
//         setPopularCourses(popular);
//         setEnrolledCourses(enrolled);
//       } catch (e) {
//         setError('Failed to load courses.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleSearch = async () => {
//     setLoading(true);
//     try {
//       const results = await searchCourses(searchQuery);
//       setSearchResults(results);
//     } catch (e) {
//       setError('Failed to search courses.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const renderCourseItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.courseItem}
//       onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
//     >
//       <Text style={styles.courseTitle}>{item.title}</Text>
//       <Text style={styles.courseDescription}>{item.description}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage error={error} />;

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.welcomeText}>Welcome, {email}!</Text>
//       <Header />
      
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search courses..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         onSubmitEditing={handleSearch}
//       />
      
//       {/* <Text style={styles.sectionTitle}>Search Results</Text> */}
//       <FlatList
//         data={searchResults}
//         renderItem={renderCourseItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
      
//       <Text style={styles.sectionTitle}>Popular Courses</Text>
//       <FlatList
//         data={popularCourses}
//         renderItem={renderCourseItem}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal
//       />
      
//       <Text style={styles.sectionTitle}>Enrolled Courses</Text>
//       <FlatList
//         data={enrolledCourses}
//         renderItem={renderCourseItem}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal
//       />
      
//       <Text style={styles.sectionTitle}>All Courses</Text>
//       <FlatList
//         data={courses}
//         renderItem={renderCourseItem}
//         keyExtractor={(item) => item.id.toString()}
//       />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//     paddingHorizontal: 16,
//   },
//   welcomeText: {
//     fontSize: 20,
//     marginBottom: 10,
//     textAlign: 'center',
//     fontWeight: "bold",
//   },
//   searchInput: {
//     marginTop:10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 10,
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
// });

// export default Home;


import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getCourses, getPopularCourses, getEnrolledCourses, searchCourses } from '../services/courses';

import Loader from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import Header from '../components/Header';

const Home = ({ navigation }) => {
  const [courses, setCourses] = useState([]);
  const [popularCourses, setPopularCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const allCourses = await getCourses();
      const popular = await getPopularCourses();
      const enrolled = await getEnrolledCourses();
      setCourses(allCourses);
      setPopularCourses(popular);
      setEnrolledCourses(enrolled);
    } catch (e) {
      setError('Failed to load courses.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const results = await searchCourses(searchQuery);
      setSearchResults(results);
    } catch (e) {
      setError('Failed to search courses.');
    } finally {
      setLoading(false);
    }
  };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <ScrollView style={styles.container}>
      <Header />
      
      <TextInput
        style={styles.searchInput}
        placeholder="Search courses..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        onSubmitEditing={handleSearch}
      />
      
      {/* <Text style={styles.sectionTitle}>Search Results</Text> */}
      <FlatList
        data={searchResults}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
      />
      
      <Text style={styles.sectionTitle}>Popular Courses</Text>
      <FlatList
        data={popularCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
      
      <Text style={styles.sectionTitle}>Enrolled Courses</Text>
      <FlatList
        data={enrolledCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
      />
      
      <Text style={styles.sectionTitle}>All Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 16,
  },
  searchInput: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  courseItem: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default Home;