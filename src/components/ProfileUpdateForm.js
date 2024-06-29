import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileUpdateForm = ({ navigation }) => {
  const [profileData, setProfileData] = useState({
    profile_picture: '',
    first_name: '',
    last_name: '',
    date_of_birth: '',
    gender: '',
    bio: '',
  });
  const [isProfileUpdated, setIsProfileUpdated] = useState(false); // State to track profile update status

  useEffect(() => {
    // Fetch existing user profile data from AsyncStorage or API if needed
    fetchUserProfile();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);
      // Fetch user profile data based on skillup_id or any identifier
      // Example API call:
      // const response = await fetch(`http://192.168.33.157:5164/skillup_UserProfile?id=${userInfo.rData.id}`);
      // const data = await response.json();
      // Update profileData state with fetched data
      // setProfileData(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleInputChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      const userInfoString = await AsyncStorage.getItem('userInfo');
      const userInfo = JSON.parse(userInfoString);

      const response = await fetch('http://192.168.33.157:5164/skillup_UserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventID: '1001',
          addInfo: {
            skillup_id: userInfo.rData.id,
            ...profileData,
          },
        }),
      });

      const data = await response.json();
      if (data.rStatus === 0) {
        Alert.alert('Success', 'Profile updated successfully.');
        setIsProfileUpdated(true); // Update state to indicate profile has been updated
        // Optionally update AsyncStorage with new profile data
        // await AsyncStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
      } else {
        Alert.alert('Error', data.rData.rMessage || 'Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      Alert.alert('Error', 'Failed to update profile. Please try again.');
    }
  };

  // Ensure navigation to Home screen only if profile has been updated successfully
  useEffect(() => {
    if (isProfileUpdated) {
      navigation.navigate('Home');
    }
  }, [isProfileUpdated, navigation]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Profile Picture URL"
        value={profileData.profile_picture}
        onChangeText={(text) => handleInputChange('profile_picture', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={profileData.first_name}
        onChangeText={(text) => handleInputChange('first_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={profileData.last_name}
        onChangeText={(text) => handleInputChange('last_name', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Date of Birth"
        value={profileData.date_of_birth}
        onChangeText={(text) => handleInputChange('date_of_birth', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Gender"
        value={profileData.gender}
        onChangeText={(text) => handleInputChange('gender', text)}
      />
      <TextInput
        style={[styles.input, styles.bioInput]}
        placeholder="Bio"
        multiline
        numberOfLines={4}
        value={profileData.bio}
        onChangeText={(text) => handleInputChange('bio', text)}
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Update Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  bioInput: {
    height: 80,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileUpdateForm;
