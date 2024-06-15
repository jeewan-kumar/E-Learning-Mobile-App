// import React, { useState, useRef } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Home from './src/homeScreen/Home';
// import Onboarding from './src/onboarding/Onboarding';
// // import CourseDetails from './src/components/CourseDetails';
// import SignIn from './src/signupSignin/SignIn';
// import SignUp from './src/signupSignin/SignUp';
// import ForgotPassword from './src/signupSignin/ForgotPassword';
// import ProfileScreen from './src/homeScreen/ProfileScreen';
// import EnrolledCoursesScreen from './src/homeScreen/EnrolledCoursesScreen';
// import CourseDetails from './src/components/CourseDetails';
// import LessonDetailsScreen from './src/homeScreen/LessonDetailsScreen';
// import SearchScreen from './src/homeScreen/SearchScreen';
// import CourseListScreen from './src/homeScreen/CourseListScreen'
// import CourseDetailsScreen from './src/homeScreen/CourseListScreen';
// import { AuthProvider } from './src/services/AuthContext';
// import SplashScreen from './src/homeScreen/SplashScreen';




// const Stack = createStackNavigator();

// export default function App() {
//   const [showHomePage, setShowHomePage] = useState(false);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const sliderRef = useRef(null);

//   const handleNext = () => {
//     if (sliderRef.current) {
//       setCurrentIndex(currentIndex + 1);
//       sliderRef.current.goToSlide(currentIndex + 1);
//     }
//   };

//   const handleSkip = () => {
//     setShowHomePage(true);
//   };

//   const renderContent = () => {
//     if (!showHomePage) {
//       return (
//         <Onboarding
//           sliderRef={sliderRef}
//           handleNext={handleNext}
//           handleSkip={handleSkip}
//           setShowHomePage={setShowHomePage}
//           currentIndex={currentIndex}
//           setCurrentIndex={setCurrentIndex}
//         />
//       );
//     } else {
//       return (
//         <AuthProvider>
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="SignIn">
//           <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
//             <Stack.Screen name="SignUp" component={SignUp} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
//             <Stack.Screen name="Home" component={Home} />            
//             <Stack.Screen name="Profile" component={ProfileScreen} />
//             <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
//             <Stack.Screen name="Search" component={SearchScreen} />
//             <Stack.Screen name="CourseList" component={CourseListScreen} />
//             <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
//             <Stack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} />
//           </Stack.Navigator>
//         </NavigationContainer>
//         </AuthProvider>
//       );
//     }
//   };

//   return renderContent();
// }



// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './src/homeScreen/Home';
import ProfileScreen from './src/homeScreen/ProfileScreen';
import SearchScreen from './src/homeScreen/SearchScreen';
import EnrolledCoursesScreen from './src/homeScreen/EnrolledCoursesScreen';
import SplashScreen from './src/homeScreen/SplashScreen';
import SignIn from './src/signupSignin/SignIn';
import SignUp from './src/signupSignin/SignUp';
import ForgotPassword from './src/signupSignin/ForgotPassword';
import CourseDetailsScreen from './src/homeScreen/CourseDetailsScreen';
import LessonDetailsScreen from './src/homeScreen/LessonDetailsScreen';
import CourseListScreen from './src/homeScreen/CourseListScreen';
import Onboarding from './src/onboarding/Onboarding';
import { AuthProvider } from './src/services/AuthContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [showHomePage, setShowHomePage] = React.useState(false);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const sliderRef = React.useRef(null);

  const handleNext = () => {
    if (sliderRef.current) {
      setCurrentIndex(currentIndex + 1);
      sliderRef.current.goToSlide(currentIndex + 1);
    }
  };

  const handleSkip = () => {
    setShowHomePage(true);
  };

  const renderContent = () => {
    if (!showHomePage) {
      return (
        <Onboarding
          sliderRef={sliderRef}
          handleNext={handleNext}
          handleSkip={handleSkip}
          setShowHomePage={setShowHomePage}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      );
    } else {
      return (
        <AuthProvider>
          <NavigationContainer>
            <Stack.Navigator initialRouteName="SignIn" screenOptions={{headerShown:false}}>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="Home" component={MainTabNavigator}  />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              <Stack.Screen name="CourseList" component={CourseListScreen} />
              <Stack.Screen name="LessonDetails" component={LessonDetailsScreen} />
              <Stack.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </AuthProvider>
      );
    }
  };

  return renderContent();
}

function MainTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}  />      
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

