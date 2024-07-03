import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, Image, TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';

const SignUpForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');
  const [profilePicture, setProfilePicture] = useState(null); // State to hold selected image URI

  const selectProfilePicture = () => {
    const options = {
      title: 'Select Profile Picture',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        // Set selected image URI to state
        setProfilePicture(response.uri);
      }
    });
  };

  const handleSignUp = async () => {
    // Prepare the data object in the required format
    const signUpData = {
      eventID: '1001',
      addInfo: {
        skillup_id: '26',
        profile_picture: profilePicture, // Use selected image URI
        first_name: firstName,
        last_name: lastName,
        date_of_birth: dateOfBirth,
        gender,
        bio,
      }
    };

    // Perform API call
    try {
      const response = await fetch('http://192.168.33.157:5164/skillup_UserProfile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });

      const data = await response.json();
      console.log('API response:', data);

      // Handle success or show message to user
      Alert.alert('Signup Successful', 'You have successfully signed up!');
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Signup Failed', 'An error occurred during signup.');
    }
  };

  return (
    <View>
      <Text>First Name</Text>
      <TextInput
        placeholder="Enter first name"
        value={firstName}
        onChangeText={text => setFirstName(text)}
      />

      <Text>Last Name</Text>
      <TextInput
        placeholder="Enter last name"
        value={lastName}
        onChangeText={text => setLastName(text)}
      />

      <Text>Date of Birth</Text>
      <TextInput
        placeholder="YYYY-MM-DD"
        value={dateOfBirth}
        onChangeText={text => setDateOfBirth(text)}
      />

      <Text>Gender</Text>
      <TextInput
        placeholder="Enter gender"
        value={gender}
        onChangeText={text => setGender(text)}
      />

      <Text>Bio</Text>
      <TextInput
        placeholder="Enter bio"
        value={bio}
        onChangeText={text => setBio(text)}
        multiline
      />

      {profilePicture && (
        <Image
          source={{ uri: profilePicture }}
          style={{ width: 200, height: 200, marginVertical: 10 }}
        />
      )}

      <TouchableOpacity onPress={selectProfilePicture}>
        <Text style={{ color: 'blue', textDecorationLine: 'underline' }}>Select Profile Picture</Text>
      </TouchableOpacity>

      <Button
        title="Sign Up"
        onPress={handleSignUp}
      />
    </View>
  );
};

export default SignUpForm;
