// import React, { useContext, useEffect } from 'react';
// import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { AuthContext } from '../services/AuthContext'; 

// const SplashScreen = ({ navigation }) => {
//   const { splashLoading, userInfo } = useContext(AuthContext);

//   useEffect(() => {
//     const checkAuthStatus = async () => {
//       try {
//         // Wait for splash loading to complete and user info to be available
//         if (!splashLoading) {
//           // Simulate a brief delay for the splash screen
//           setTimeout(() => {
//             if (userInfo) {
//               navigation.navigate('Home', { email: userInfo.email }); // Pass the user email or other details as needed
//             } else {
//               navigation.navigate('Login');
//             }
//           }, 10); // Adjust the delay as needed
//         }
//       } catch (e) {
//         console.error('Failed to load auth status', e);
//         navigation.navigate('Login');
//       }
//     };

//     checkAuthStatus();
//   }, [navigation, splashLoading, userInfo]);

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Skillup Coding</Text>
//       {splashLoading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : null}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f8f8',
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
// });

// export default SplashScreen;


import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { AuthContext } from '../services/AuthContext';

const SplashScreen = ({ navigation }) => {
  const { splashLoading, userInfo } = useContext(AuthContext);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        if (!splashLoading) {
          const userInfo = await AsyncStorage.getItem('userInfo');
          const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
  
          setTimeout(() => {
            if (userInfo) {
              if (onboardingCompleted) {
                navigation.navigate('Home', { email: userInfo.email });
              } else {
                navigation.navigate('Onboarding');
              }
            } else {
              navigation.navigate('Login');
            }
          }, 1000); // Adjust delay as needed
        }
      } catch (e) {
        console.error('Failed to load auth status', e);
        navigation.navigate('Login');
      }
    };
  
    checkAuthStatus();
  }, [navigation, splashLoading]);
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skillup Coding</Text>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default SplashScreen;
