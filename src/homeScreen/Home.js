
// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
// import { getCourses, getPopularCourses, getEnrolledCourses, searchCourses } from '../services/courses';
// import Icon from 'react-native-vector-icons/FontAwesome';

// import Loader from '../components/Loader';
// import ErrorMessage from '../components/ErrorMessage';
// import Header from '../components/Header';

// const Home = ({ navigation }) => {
//   const [courses, setCourses] = useState([]);
//   const [popularCourses, setPopularCourses] = useState([]);
//   const [enrolledCourses, setEnrolledCourses] = useState([]);
//   const [searchResults, setSearchResults] = useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const allCourses = await getCourses();
//       const popular = await getPopularCourses();
//       const enrolled = await getEnrolledCourses();
//       setCourses(allCourses);
//       setPopularCourses(popular);
//       setEnrolledCourses(enrolled);
//     } catch (e) {
//       setError('Failed to load courses.');
//     } finally {
//       setLoading(false);
//     }
//   };

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
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search courses..."
//         value={searchQuery}
//         onChangeText={setSearchQuery}
//         onSubmitEditing={handleSearch}

//       /> 

//       <FlatList
//         data={searchResults}
//         renderItem={renderCourseItem}
//         keyExtractor={(item) => item.id.toString()}
//       />

//       <Text style={styles.sectionTitle}>Enrolled Courses</Text>
//       <FlatList
//         data={enrolledCourses}
//         renderItem={renderCourseItem}
//         keyExtractor={(item) => item.id.toString()}
//         horizontal
//       />

//       <Text style={styles.sectionTitle}>Popular Courses</Text>
//       <FlatList
//         data={popularCourses}
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
//   searchInput: {
//     marginTop: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 15,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 10,
//     // marginHorizontal: 10,
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



// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, ScrollView, Alert } from 'react-native';
// import SearchBar from '../components/SearchBar';
// import axios from 'axios';
// import Loader from '../components/Loader';
// import ErrorMessage from '../components/ErrorMessage';
// import { FlatList } from 'react-native-gesture-handler';

// const courseUrl = "http://192.168.33.157:5164/skillup_Course";

// const Home = () => {
//   const [data, setData] = useState([]);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     course();
//   }, []);

//   const course = async () => {
//     setLoading(true);
//     try {
//       const requestData = {
//         eventID: "1006",
//         addInfo: {
//           "req": {}
//         }
//       };
//       const response = await axios.post(courseUrl, requestData);
//       console.log(response.data);
//       if (response.data.rData.rCode === 0) {
//         setData(response.data.rData.courses[0]); // Set the first array of courses
//       } else {
//         setError(response.data.rData.rMessage);
//       }
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//       Alert.alert("Error", `Failed to fetch data: ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView
//       showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
//       contentContainerStyle={styles.scrollViewContent}
//     >
//       <View>
//         <SearchBar />
//       </View>
//       <View>
//         <Text style={styles.coursesTitle}>Popular Courses</Text>
//         {loading ? (
//           <Loader /> // Show loader while fetching data
//         ) : error ? (
//           <ErrorMessage message={error} /> // Show error message if there's an error
//         ) : (
//           <FlatList 
//             horizontal
//             data={data}
//             keyExtractor={(item, index) => index.toString()} // Assuming index can be used as a unique key
//             renderItem={({ item }) => (
//               <View style={styles.courseItem}>
//                 <Text style={styles.courseTitle}>{item[1]}</Text>
//                 <Text style={styles.courseDescription}>{item[2]}</Text>
//                 <Text style={styles.courseDescription}>{item[3]}</Text>
//               </View>
//             )}
//           />
//         )}
//       </View>
//     </ScrollView>
//   );
// };

// export default Home;

// const styles = StyleSheet.create({
//   coursesTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 10,
//     marginLeft: 10,
//   },
//   courseItem: {
//     width: 250, // Adjust width as per your design
//     marginRight: 10, // Add some margin between items
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//   },
//   courseTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   courseDescription: {
//     fontSize: 16,
//     marginTop: 5,
//   },
//   noCoursesText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     fontStyle: 'italic',
//   },
//   scrollViewContent: {
//     flexGrow: 1, // Ensure content expands to fill ScrollView
//   },
// });


// import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View, ScrollView, ActivityIndicator, Image, TouchableOpacity, Alert } from 'react-native';
// import axios from 'axios';

// const courseUrl = "http://192.168.33.157:5164/skillup_Course";

// const Home = () => {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   const fetchCourses = async () => {
//     setLoading(true);
//     try {
//       const requestData = {
//         eventID: "1006",
//         addInfo: {
//           "req": {}
//         }
//       };
//       const response = await axios.post(courseUrl, requestData);
//       if (response.data.rData.rCode === 0) {
//         setCourses(response.data.rData.courses[0]); // Assuming courses are an array of objects
//       } else {
//         setError(response.data.rData.rMessage || 'Failed to fetch courses');
//       }
//     } catch (error) {
//       setError(error.message || 'Failed to fetch courses');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleEnroll = (courseId) => {
//     Alert.alert('Enroll', `Enroll button clicked for course ID: ${courseId}`);
//     // Implement your enroll logic here, e.g., navigate to enrollment screen
//   };

//   return (
//     <ScrollView contentContainerStyle={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Popular Courses</Text>
//       </View>

//       {loading ? (
//         <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
//       ) : error ? (
//         <Text style={styles.errorText}>{error}</Text>
//       ) : (
//         <ScrollView horizontal showsHorizontalScrollIndicator={false}>
//           {courses.map((course, index) => (
//             <View key={index} style={styles.courseCard}>
//               <Image source={{ uri: `data:image/png;base64,${course[6]}` }} style={styles.courseImage} />
//               <View style={styles.courseDetails}>
//                 <Text style={styles.courseTitle}>{course[1]}</Text>
//                 <Text style={styles.courseDescription}>{course[2]}</Text>
//                 {/* <Text style={styles.courseDescription}>{course[3]}</Text> */}
//                 <TouchableOpacity style={styles.enrollButton} onPress={() => handleEnroll(course[0])}>
//                   <Text style={styles.enrollButtonText}>Enroll Now</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           ))}
//         </ScrollView>
//       )}
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexGrow: 1,
//     paddingVertical: 20,
//   },
//   header: {
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   loader: {
//     marginTop: 20,
//   },
//   errorText: {
//     textAlign: 'center',
//     marginTop: 20,
//     fontSize: 16,
//     color: 'red',
//   },
//   courseCard: {
//     width: 250,
//     height: 250,
//     marginHorizontal: 10,
//     padding: 10,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//     elevation: 2, // for Android shadow
//     shadowColor: '#000', // for iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//   },
//   courseImage: {
//     width: '90%',
//     height: 140,
//     borderTopLeftRadius: 8,
//     borderTopRightRadius: 8,
//   },
//   courseDetails: {
//     padding: 10,
//     flex: 1,
//     // justifyContent: 'space-between',
//   },
//   courseTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   courseDescription: {
//     fontSize: 16,
//     marginTop: 5,
//     lineHeight: 20,
//   },
//   enrollButton: {
//     backgroundColor: '#007AFF',
//     paddingVertical: 5,
//     borderRadius: 5,
//     alignItems: 'center',
//   },
//   enrollButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default Home;

import { StyleSheet, Text, View } from 'react-native'
import PopularCourses from '../components/PopularCourses'
import SearchBar from '../components/SearchBar'
const Home = () => {
  return (
    <View>
      <SearchBar/>
      <PopularCourses/>
    </View>
  )
}
export default Home
const styles = StyleSheet.create({})