import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
import BackButton from './BackButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AuthContext } from '../services/AuthContext';

const Profile = ({ navigation }) => {
  const{logout} = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    const userInfoString = await AsyncStorage.getItem('userInfo');
    const userInfo = JSON.parse(userInfoString);
    try {
      const response = await fetch('http://192.168.33.157:5164/skillup_UserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventID: "1006",
          addInfo: {
            skillup_id: userInfo.rData.id
          },
        }),
      });
      const jsonResponse = await response.json();
      
      if (jsonResponse.rStatus === 0 && jsonResponse.rData && jsonResponse.rData.profile) {
        const userArray = jsonResponse.rData.profile[0];
        
        if (userArray && userArray.length > 0) {
          const user = {
            profile_picture: userArray[0],
            first_name: userArray[1],
            last_name: userArray[2],
            date_of_birth: userArray[3],
            bio: userArray[4],
            email: userArray[5],
            phone_number: userArray[6],
            name: userArray[7],
            gender: userArray[8],
          };
          
          setUserData(user);
        } else {
          console.error('No user data found in profile array');
        }
      } else {
        console.error('Invalid response structure or rStatus is not 0');
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            await logout(); // Call logout function from AuthContext
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          },
          style: 'destructive', // Change button style to indicate danger
        },
      ],
      { cancelable: false }
    );
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (!userData) {
    return (
      <View style={styles.container}>
        <Text>No data available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BackButton navigation={navigation} />
      <View style={styles.profileCard}>
        {userData.profile_picture && (
          <Image
            source={{ uri: `data:image/jpeg;base64,${userData.profile_picture}` }}
            style={styles.image}
          />
        )}
        <Text style={styles.title}>Profile Details</Text>
        <Text style={styles.label}>Name: {userData.name}</Text>
        <Text style={styles.label}>Email: {userData.email}</Text>
        <Text style={styles.label}>Phone Number: {userData.phone_number}</Text>
        <Text style={styles.label}>Date of Birth: {userData.date_of_birth}</Text>
        <Text style={styles.label}>Gender: {userData.gender}</Text>
        <Text style={styles.label}>Bio: {userData.bio}</Text>
      </View>
      <Button title="Logout" onPress={handleLogout} color="#f44336" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Profile;


// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
// import axios from 'axios';
// import Loader from './Loader';
// import ErrorMessage from './ErrorMessage';
// import { useNavigation } from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';
// import EnrolledCourses from './EnrolledCourses';

// const profileUrl = "http://192.168.33.157:5164/skillup_UserProfile";

// const Profile = ({ navigation }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [isEditing, setIsEditing] = useState(false);
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState('');
//   const [gender, setGender] = useState('');
//   const [bio, setBio] = useState('');

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       try {
//         const requestData = {
//           eventID: "1002",
//           addInfo: {
//             id: "1"  // Replace with the actual user ID or fetch dynamically
//           }
//         };
//         const response = await axios.post(profileUrl, requestData);
//         console.log(response.data);
//         if (response.data.rData.rCode === 0) {
//           const userData = response.data.rData.lessons[0][0];
//           setUser(userData);
//           setName(userData.first_name);  // Assuming 'first_name' field
//           setEmail(userData.email);  // Assuming 'email' field
//           setDateOfBirth(userData.date_of_birth);  // Assuming 'date_of_birth' field
//           setGender(userData.gender);  // Assuming 'gender' field
//           setBio(userData.bio);  // Assuming 'bio' field
//         } else {
//           setError(response.data.rData.rMessage);
//         }
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load user data.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   const handleUpdateProfile = async () => {
//     setLoading(true);
//     try {
//       const requestData = {
//         eventID: "1003",  // Example eventID for updating profile
//         addInfo: {
//           id: user.id,  // Assuming 'id' is part of user data
//           first_name: name,
//           email: email,
//           date_of_birth: dateOfBirth,
//           gender: gender,
//           bio: bio,
//           // Add other fields as needed for updating
//         }
//       };
//       const response = await axios.post(profileUrl, requestData);
//       console.log(response.data);
//       if (response.data.rData.rCode === 0) {
//         setUser(response.data.rData.updatedUser);
//         setIsEditing(false);
//       } else {
//         setError(response.data.rData.rMessage);
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Failed to update profile.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     // Simulate logout action
//     Alert.alert('Logout', 'You have been logged out.', [
//       {
//         text: 'OK',
//         onPress: () => navigation.navigate('SignIn'),
//       },
//     ]);
//   };

//   const renderCourseItem = ({ item }) => (
//     <TouchableOpacity
//       style={styles.courseItem}
//       onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
//     >
//       <Text style={styles.courseTitle}>{item.title}</Text>
//     </TouchableOpacity>
//   );

//   if (loading) return <Loader />;
//   if (error) return <ErrorMessage error={error} />;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile</Text>
//       {isEditing ? (
//         <View style={styles.form}>
//           <TextInput
//             style={styles.input}
//             placeholder="Name"
//             value={name}
//             onChangeText={setName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Date of Birth (YYYY-MM-DD)"
//             value={dateOfBirth}
//             onChangeText={setDateOfBirth}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Gender"
//             value={gender}
//             onChangeText={setGender}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Bio"
//             multiline
//             numberOfLines={4}
//             value={bio}
//             onChangeText={setBio}
//           />
//           <Button title="Save" onPress={handleUpdateProfile} />
//           <Button title="Cancel" onPress={() => setIsEditing(false)} color="red" />
//         </View>
//       ) : (
//         <View>
//           <Text style={styles.label}>Name: {user.first_name} {user.last_name}</Text>
//           <Text style={styles.label}>Email: {user.email}</Text>
//           <Text style={styles.label}>Date of Birth: {user.date_of_birth}</Text>
//           <Text style={styles.label}>Gender: {user.gender}</Text>
//           <Text style={styles.label}>Bio: {user.bio}</Text>
//           <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
//         </View>
//       )}
//       <Text style={styles.sectionTitle}>Enrolled Courses</Text>

//         <EnrolledCourses/>

//       <Button title="Logout" onPress={handleLogout} color="red" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   form: {
//     marginBottom: 20,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   courseItem: {
//     padding: 15,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     marginBottom: 10,
//     elevation: 2,
//   },
//   courseTitle: {
//     fontSize: 16,
//   },
// });

// export default Profile;