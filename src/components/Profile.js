
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TextInput, Button, Alert, TouchableOpacity } from 'react-native';
import axios from 'axios';
import Loader from './Loader';
import ErrorMessage from './ErrorMessage';
import { useNavigation } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import EnrolledCourses from './EnrolledCourses';

const profileUrl = "http://192.168.33.157:5164/skillup_UserProfile";

const Profile = ({ navigation }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const requestData = {
          eventID: "1002",
          addInfo: {
            id: "1"  // Replace with the actual user ID or fetch dynamically
          }
        };
        const response = await axios.post(profileUrl, requestData);
        console.log(response.data);
        if (response.data.rData.rCode === 0) {
          const userData = response.data.rData.lessons[0][0];
          setUser(userData);
          setName(userData.first_name);  // Assuming 'first_name' field
          setEmail(userData.email);  // Assuming 'email' field
          setDateOfBirth(userData.date_of_birth);  // Assuming 'date_of_birth' field
          setGender(userData.gender);  // Assuming 'gender' field
          setBio(userData.bio);  // Assuming 'bio' field
        } else {
          setError(response.data.rData.rMessage);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load user data.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const requestData = {
        eventID: "1003",  // Example eventID for updating profile
        addInfo: {
          id: user.id,  // Assuming 'id' is part of user data
          first_name: name,
          email: email,
          date_of_birth: dateOfBirth,
          gender: gender,
          bio: bio,
          // Add other fields as needed for updating
        }
      };
      const response = await axios.post(profileUrl, requestData);
      console.log(response.data);
      if (response.data.rData.rCode === 0) {
        setUser(response.data.rData.updatedUser);
        setIsEditing(false);
      } else {
        setError(response.data.rData.rMessage);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    // Simulate logout action
    Alert.alert('Logout', 'You have been logged out.', [
      {
        text: 'OK',
        onPress: () => navigation.navigate('SignIn'),
      },
    ]);
  };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity
      style={styles.courseItem}
      onPress={() => navigation.navigate('CourseDetails', { courseId: item.id })}
    >
      <Text style={styles.courseTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  if (loading) return <Loader />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {isEditing ? (
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Date of Birth (YYYY-MM-DD)"
            value={dateOfBirth}
            onChangeText={setDateOfBirth}
          />
          <TextInput
            style={styles.input}
            placeholder="Gender"
            value={gender}
            onChangeText={setGender}
          />
          <TextInput
            style={styles.input}
            placeholder="Bio"
            multiline
            numberOfLines={4}
            value={bio}
            onChangeText={setBio}
          />
          <Button title="Save" onPress={handleUpdateProfile} />
          <Button title="Cancel" onPress={() => setIsEditing(false)} color="red" />
        </View>
      ) : (
        <View>
          <Text style={styles.label}>Name: {user.first_name} {user.last_name}</Text>
          <Text style={styles.label}>Email: {user.email}</Text>
          <Text style={styles.label}>Date of Birth: {user.date_of_birth}</Text>
          <Text style={styles.label}>Gender: {user.gender}</Text>
          <Text style={styles.label}>Bio: {user.bio}</Text>
          <Button title="Edit Profile" onPress={() => setIsEditing(true)} />
        </View>
      )}
      <Text style={styles.sectionTitle}>Enrolled Courses</Text>
     
        <EnrolledCourses/>
      
      <Button title="Logout" onPress={handleLogout} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 20,
  },
  courseItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10,
    elevation: 2,
  },
  courseTitle: {
    fontSize: 16,
  },
});

export default Profile;
