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

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const CourseDetails = ({ route, navigation }) => {
    const { title, lessons, image } = route.params;

    const handleEnrollPress = () => {
        // Add your enrollment logic here
        console.log("Enrolled in course:", title);
    };

    const handleBackPress = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <Text>{title}</Text>
            <Text>{lessons}</Text>
            <Image source={image} style={styles.image} />
            <TouchableOpacity style={styles.enrollButton} onPress={handleEnrollPress}>
                <Text style={styles.enrollText}>Enroll in Course</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    enrollButton: {
        backgroundColor: '#6200EE',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    enrollText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    backButton: {
        marginTop: 10,
    },
    backText: {
        color: '#6200EE',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CourseDetails;
