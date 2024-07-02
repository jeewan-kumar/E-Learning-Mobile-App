// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, Image, StyleSheet, Button, Alert, ActivityIndicator, TouchableOpacity } from 'react-native';
// import BackButton from './BackButton';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { AuthContext } from '../services/AuthContext';

// const Profile = ({ navigation }) => {
//   const{logout} = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     const userInfoString = await AsyncStorage.getItem('userInfo');
//     const userInfo = JSON.parse(userInfoString);
//     try {
//       const response = await fetch('http://192.168.33.157:5164/skillup_UserProfile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           eventID: "1006",
//           addInfo: {
//             skillup_id: userInfo.rData.id
//           },
//         }),
//       });
//       const jsonResponse = await response.json();
      
//       if (jsonResponse.rStatus === 0 && jsonResponse.rData && jsonResponse.rData.profile) {
//         const userArray = jsonResponse.rData.profile[0];
        
//         if (userArray && userArray.length > 0) {
//           const user = {
//             profile_picture: userArray[0],
//             first_name: userArray[1],
//             last_name: userArray[2],
//             date_of_birth: userArray[3],
//             bio: userArray[4],
//             email: userArray[5],
//             phone_number: userArray[6],
//             name: userArray[7],
//             gender: userArray[8],
//           };
          
//           setUserData(user);
//         } else {
//           console.error('No user data found in profile array');
//         }
//       } else {
//         console.error('Invalid response structure or rStatus is not 0');
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: async () => {
//             await logout(); // Call logout function from AuthContext
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'SignIn' }],
//             });
//           },
//           style: 'destructive', // Change button style to indicate danger
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View style={styles.container}>
//         <Text>No data available</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <BackButton navigation={navigation} />
//       <View style={styles.profileCard}>
//         {userData.profile_picture && (
//           <Image
//             source={{ uri: `data:image/jpeg;base64,${userData.profile_picture}` }}
//             style={styles.image}
//           />
//         )}
//         <Text style={styles.title}>Profile Details</Text>
//         <Text style={styles.label}>Name: {userData.name}</Text>
//         <Text style={styles.label}>Email: {userData.email}</Text>
//         <Text style={styles.label}>Phone Number: {userData.phone_number}</Text>
//         <Text style={styles.label}>Date of Birth: {userData.date_of_birth}</Text>
//         <Text style={styles.label}>Gender: {userData.gender}</Text>
//         <Text style={styles.label}>Bio: {userData.bio}</Text>
//       </View>
//       <Button title="Logout" onPress={handleLogout} color="#f44336" />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   profileCard: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
// });

// export default Profile;


// import React, { useState, useEffect, useContext } from 'react';
// import { View, Text, Image, StyleSheet, Button, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
// import BackButton from './BackButton';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { AuthContext } from '../services/AuthContext';

// const Profile = ({ navigation }) => {
//   const { logout } = useContext(AuthContext);
//   const [userData, setUserData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [isEditing, setIsEditing] = useState(false);

//   useEffect(() => {
//     fetchUserProfile();
//   }, []);

//   const fetchUserProfile = async () => {
//     const userInfoString = await AsyncStorage.getItem('userInfo');
//     const userInfo = JSON.parse(userInfoString);
//     try {
//       const response = await fetch('http://192.168.33.157:5164/skillup_UserProfile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           eventID: "1006",
//           addInfo: {
//             skillup_id: userInfo.rData.id,
//           },
//         }),
//       });
//       const jsonResponse = await response.json();

//       if (jsonResponse.rStatus === 0 && jsonResponse.rData && jsonResponse.rData.profile) {
//         const userArray = jsonResponse.rData.profile[0];

//         if (userArray && userArray.length > 0) {
//           const user = {
//             profile_picture: userArray[0],
//             first_name: userArray[1],
//             last_name: userArray[2],
//             date_of_birth: userArray[3],
//             bio: userArray[4],
//             email: userArray[5],
//             phone_number: userArray[6],
//             name: userArray[7],
//             gender: userArray[8],
//           };

//           setUserData(user);
//         } else {
//           console.error('No user data found in profile array');
//         }
//       } else {
//         console.error('Invalid response structure or rStatus is not 0');
//       }
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching user profile:', error);
//       setLoading(false);
//     }
//   };

//   const handleLogout = () => {
//     Alert.alert(
//       'Logout',
//       'Are you sure you want to logout?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'OK',
//           onPress: async () => {
//             await logout(); // Call logout function from AuthContext
//             navigation.reset({
//               index: 0,
//               routes: [{ name: 'SignIn' }],
//             });
//           },
//           style: 'destructive', // Change button style to indicate danger
//         },
//       ],
//       { cancelable: false }
//     );
//   };

//   const handleEdit = () => {
//     setIsEditing(true);
//   };

//   const handleSave = async () => {
//     try {
//       const response = await fetch('http://192.168.33.157:5164/skillup_UserProfile', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           eventID: "1003",
//           rData: {
//             skillup_id: userData.id,
//             profile: [
//               userData.profile_picture,
//               userData.first_name,
//               userData.last_name,
//               userData.date_of_birth,
//               userData.bio,
//               userData.email,
//               userData.phone_number,
//               userData.name,
//               userData.gender,
//             ],
//           },
//         }),
//       });
//       const jsonResponse = await response.json();

//       if (jsonResponse.rStatus === 0) {
//         Alert.alert('Success', 'Profile updated successfully');
//         setIsEditing(false);
//       } else {
//         Alert.alert('Error', 'Failed to update profile');
//       }
//     } catch (error) {
//       console.error('Error updating profile:', error);
//       Alert.alert('Error', 'Failed to update profile');
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.container}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   if (!userData) {
//     return (
//       <View style={styles.container}>
//         <Text>No data available</Text>
//       </View>
//     );
//   }

//   return (
//     <ScrollView contentContainerStyle={styles.scrollContainer}>
//       <BackButton navigation={navigation} />
//       <View style={styles.profileCard}>
//         {userData.profile_picture && (
//           <Image
//             source={{ uri: `data:image/jpeg;base64,${userData.profile_picture}` }}
//             style={styles.image}
//           />
//         )}
//         {isEditing ? (
//           <>
//             <TextInput
//               style={styles.input}
//               value={userData.name}
//               onChangeText={(text) => setUserData({ ...userData, name: text })}
//               placeholder="Name"
//             />
//             <TextInput
//               style={styles.input}
//               value={userData.email}
//               onChangeText={(text) => setUserData({ ...userData, email: text })}
//               placeholder="Email"
//               keyboardType="email-address"
//             />
//             <TextInput
//               style={styles.input}
//               value={userData.phone_number}
//               onChangeText={(text) => setUserData({ ...userData, phone_number: text })}
//               placeholder="Phone Number"
//               keyboardType="phone-pad"
//             />
//             <TextInput
//               style={styles.input}
//               value={userData.date_of_birth}
//               onChangeText={(text) => setUserData({ ...userData, date_of_birth: text })}
//               placeholder="Date of Birth"
//             />
//             <TextInput
//               style={styles.input}
//               value={userData.gender}
//               onChangeText={(text) => setUserData({ ...userData, gender: text })}
//               placeholder="Gender"
//             />
//             <TextInput
//               style={styles.input}
//               value={userData.bio}
//               onChangeText={(text) => setUserData({ ...userData, bio: text })}
//               placeholder="Bio"
//             />
//             <Button title="Save" onPress={handleSave} color="#4CAF50" />
//           </>
//         ) : (
//           <>
//             <Text style={styles.title}>Profile Details</Text>
//             <Text style={styles.label}>Name: {userData.name}</Text>
//             <Text style={styles.label}>Email: {userData.email}</Text>
//             <Text style={styles.label}>Phone Number: {userData.phone_number}</Text>
//             <Text style={styles.label}>Date of Birth: {userData.date_of_birth}</Text>
//             <Text style={styles.label}>Gender: {userData.gender}</Text>
//             <Text style={styles.label}>Bio: {userData.bio}</Text>
//             <Button title="Edit" onPress={handleEdit} color="#FFA500" />
//           </>
//         )}
//       </View>
//       <Button title="Logout" onPress={handleLogout} color="#f44336" />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#f8f8f8',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   profileCard: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     marginBottom: 20,
//     width: '100%',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//     alignSelf: 'center',
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   label: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginTop: 10,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 5,
//   },
// });

// export default Profile;

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, Alert, ActivityIndicator, TextInput, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-picker';

import { AuthContext } from '../services/AuthContext';

const Profile = ({ navigation }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [newProfilePicture, setNewProfilePicture] = useState(null); // State for new profile picture

  const { logout } = useContext(AuthContext);

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
            skillup_id: userInfo.rData.id,
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
            skillup_id: userInfo.rData.id,
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
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'SignIn' }],
            });
          },
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChooseImage = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.error('ImagePicker Error:', response.error);
      } else {
        const source = { uri: response.uri };
        setNewProfilePicture(source);
      }
    });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append('eventID', '1007');
      formData.append('addInfo[skillup_id]', userData.skillup_id);
      
      if (newProfilePicture) {
        formData.append('addInfo[profile_picture]', {
          uri: newProfilePicture.uri,
          type: 'image/jpeg',
          name: 'profile_picture.jpg',
        });
      }
      
      formData.append('addInfo[first_name]', userData.first_name);
      formData.append('addInfo[last_name]', userData.last_name);
      formData.append('addInfo[date_of_birth]', userData.date_of_birth);
      formData.append('addInfo[bio]', userData.bio);
      formData.append('addInfo[email]', userData.email);
      formData.append('addInfo[phone_number]', userData.phone_number);
      formData.append('addInfo[gender]', userData.gender);
  
      const response = await fetch('http://192.168.33.157:5164/skillup_UserProfile', {
        method: 'POST',
        body: formData,
      });
  
      const jsonResponse = await response.json();
  
      if (jsonResponse.rStatus === 0) {
        Alert.alert('Success', 'Profile updated successfully');
        setIsEditing(false);
      } else {
        Alert.alert('Error', 'Failed to update profile');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile');
    }
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
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.profileCard}>
        {userData.profile_picture ? (
          <Image
            source={{ uri: `data:image/jpeg;base64,${userData.profile_picture}` }}
            style={styles.image}
          />
        ) : (
          <Text>No profile picture</Text>
        )}
        {isEditing ? (
          <>
            <Button title="Choose New Image" onPress={handleChooseImage} />
            <TextInput
              style={styles.input}
              value={userData.first_name}
              onChangeText={(text) => setUserData({ ...userData, first_name: text })}
              placeholder="First Name"
            />
            <TextInput
              style={styles.input}
              value={userData.last_name}
              onChangeText={(text) => setUserData({ ...userData, last_name: text })}
              placeholder="Last Name"
            />
            <TextInput
              style={styles.input}
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
              placeholder="Email"
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              value={userData.phone_number}
              onChangeText={(text) => setUserData({ ...userData, phone_number: text })}
              placeholder="Phone Number"
              keyboardType="phone-pad"
            />
            <TextInput
              style={styles.input}
              value={userData.date_of_birth}
              onChangeText={(text) => setUserData({ ...userData, date_of_birth: text })}
              placeholder="Date of Birth"
            />
            <TextInput
              style={styles.input}
              value={userData.gender}
              onChangeText={(text) => setUserData({ ...userData, gender: text })}
              placeholder="Gender"
            />
            <TextInput
              style={styles.input}
              value={userData.bio}
              onChangeText={(text) => setUserData({ ...userData, bio: text })}
              placeholder="Bio"
            />
            <Button title="Save" onPress={handleSave} color="#4CAF50" />
          </>
        ) : (
          <>
            <Text style={styles.title}>Profile Details</Text>
            <Text style={styles.label}>Name: {userData.name}</Text>
            <Text style={styles.label}>Email: {userData.email}</Text>
            <Text style={styles.label}>Phone Number: {userData.phone_number}</Text>
            <Text style={styles.label}>Date of Birth: {userData.date_of_birth}</Text>
            <Text style={styles.label}>Gender: {userData.gender}</Text>
            <Text style={styles.label}>Bio: {userData.bio}</Text>
            <Button title="Edit" onPress={handleEdit} color="#FFA500" />
          </>
        )}
      </View>
      <Button title="Logout" onPress={handleLogout} color="#f44336" />
    </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default Profile;
