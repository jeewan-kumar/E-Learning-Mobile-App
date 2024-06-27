import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

const CourseDetails = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text>←</Text>
      </TouchableOpacity>
      <Image source={{ uri: 'https://via.placeholder.com/300' }} style={styles.image} />
      <Text style={styles.title}>Principle of Java Language</Text>
      <Text style={styles.subtitle}>3:40hrs   12 Lessons</Text>
      <Text style={styles.sectionTitle}>Description</Text>
      <Text style={styles.description}>
        The aim of the UI/UX course is to provide students with the knowledge of user-centered design, user-centered methods in design, graphic design on screens, simulation and prototyping techniques, usability testing methods, interactive technologies and user-centered design in corporate perspective.
      </Text>
      <Text style={styles.sectionTitle}>Course Syllabus</Text>
      <View style={styles.syllabusItem}>
        <Text>Visual Design Principles</Text>
      </View>
      <View style={styles.syllabusItem}>
        <Text>Information Design and Data Visualization</Text>
      </View>
      <View style={styles.syllabusItem}>
        <Text>Interaction Design</Text>
      </View>
      <View style={styles.syllabusItem}>
        <Text>Information Architecture</Text>
      </View>
      <View style={styles.syllabusItem}>
        <Text>Wire Framing & Storyboarding</Text>
      </View>
      <View style={styles.syllabusItem}>
        <Text>Elements and Widgets</Text>
      </View>
      <View style={styles.syllabusItem}>
        <Text>Screen Design and Layouts</Text>
      </View>
      <View style={styles.syllabusItem}>
        <Text>Hands-on Assignments and Quiz</Text>
      </View>
      <TouchableOpacity style={styles.enrollButton}>
        <Text style={styles.enrollButtonText}>Enroll Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  syllabusItem: {
    padding: 16,
    backgroundColor: '#f0f0f0',
    marginVertical: 4,
  },
  enrollButton: {
    padding: 16,
    backgroundColor: 'green',
    alignItems: 'center',
    marginVertical: 16,
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CourseDetails;


// import { View, Text  ,Image ,StyleSheet} from 'react-native'
// import React from 'react'

// const CourseDetails = ({route}) => {
//     const { title, lessons, image } = route.params;
//     console.log(title, lessons, image ,"title, lessons, image")
//   return (
//     <View>
//  <Text>{title}</Text>
//  <Text>{lessons}</Text>
//  <Image source={image} style={styles.image} />
//     </View>
//   )
// }


// const styles = StyleSheet.create({
//     card: {
//       flexDirection: 'row',
//       backgroundColor: '#fff',
//       borderRadius: 10,
//       marginBottom: 10,
//       overflow: 'hidden',
//       elevation: 2,
//     },
//     popularCard: {
//       backgroundColor: '#6200EE',
//     },
//     image: {
//       width: 100,
//       height: 100,
//       resizeMode: 'cover',
//     },
   
//   });

// export default CourseDetails

// import React from 'react';
// import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, ScrollView } from 'react-native';

// const CourseDetails = ({ route, navigation }) => {
//     const { title, lessons, image } = route.params;

//     const handleEnrollPress = () => {
//         // Add your enrollment logic here
//         console.log("Enrolled in course:", title);
//     };

//     const handleBackPress = () => {
//         navigation.goBack();
//     };

//     return (
//         <View style={styles.container}>
//             <Text>{title}</Text>
//             <Text>{lessons}</Text>
//             {/* <Image source={image} style={styles.image} /> */}
//             <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
//                 <Text style={styles.enrollText}>Enroll in Course</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
//                 <Text style={styles.backText}>Back</Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         backgroundColor: '#fff',
//     },
//     image: {
//         width: 100,
//         height: 100,
//         resizeMode: 'cover',
//         marginBottom: 10,
//     },
//     enrollButton: {
//         backgroundColor: '#6200EE',
//         padding: 10,
//         borderRadius: 5,
//         marginTop: 20,
//     },
//     enrollText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
//     backButton: {
//         marginTop: 10,
//     },
//     backText: {
//         color: '#6200EE',
//         fontSize: 16,
//         fontWeight: 'bold',
//     },
// });

// export default CourseDetails;
