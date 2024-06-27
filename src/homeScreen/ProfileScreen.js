import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
const profileUrl = "http://192.168.33.157:5164/skillup_UserProfile";
const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData(); // Fetch data when component mounts
  }, []);

  const fetchData = async () => {
    try {
      // Replace with your API endpoint
      const response = await fetch(profileUrl);
      const data = await response.json();
      setUserData(data); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileInfo}>
        {userData && (
          <>
            <Text style={styles.name}>{userData.name}</Text>
            <Text style={styles.email}>{userData.email}</Text>
          </>
        )}
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
        <Ionicons name="person-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>My Account</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Search')}>
        <Ionicons name="compass-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>Explore Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EnrolledCourses')}>
        <Ionicons name="book-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>My Courses</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LearningPlan')}>
        <Ionicons name="reader-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>Learning Plan</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyCertificates')}>
        <Ionicons name="ribbon-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>My Certificates</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
        <Ionicons name="person-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>About Skillup coding</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ReportProblem')}>
        <Ionicons name="person-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>Report Problem</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
        <Ionicons name="help-circle-outline" size={25} style={styles.icon} />
        <Text style={styles.buttonText}>Help</Text>
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
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: '#DDDDDD',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  buttonText: {
    fontSize: 16,
    marginLeft: 12,
  },
  icon: {
    color: '#007AFF',
  },
});

export default ProfileScreen;
