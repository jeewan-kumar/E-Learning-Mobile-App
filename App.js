// // App.js
// import React, { useState, useRef } from 'react';
// import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import SignIn from './src/signupSignin/SignIn';
// import SignUp from './src/signupSignin/SignUp';
// import ForgotPassword from './src/signupSignin/ForgotPassword';
// import Home from './src/homeScreen/Home';

// const slides = [
//   {
//     id: '1',
//     image: require('./src/images/onbod_01.png'),
//     title: 'Skillup Coding',
//   },
//   {
//     id: '2',
//     image: require('./src/images/onbod_02.png'),
//     title: 'Skillup Coding Free Trial Courses',
//     subtitle: 'Free courses for you to find your way to learning.',
//   },
//   {
//     id: '3',
//     image: require('./src/images/onbod_03.png'),
//     title: 'Quick and easy learning',
//     subtitle: 'Easy and fast learning at any time to help you improve various skills.',
//   },
//   {
//     id: '4',
//     image: require('./src/images/onbod_04.png'),
//     title: 'Personalized for you',
//     subtitle: 'Get recommendations based on your enrolled courses and searches.',
//   },
//   {
//     id: '5',
//     image: require('./src/images/onbod_05.png'),
//     title: 'Get Online Certificate',
//     subtitle: 'Analyse your scores and Track your results.',
//   },
// ];

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
//         <AppIntroSlider
//           ref={sliderRef}
//           data={slides}
//           renderItem={renderSlideItem}
//           activeDotStyle={styles.activeDot}
//           showSkipButton
//           renderNextButton={() => renderButton('Next', handleNext)}
//           renderSkipButton={() => renderButton('Skip', handleSkip)}
//           renderDoneButton={() => renderButton('Done', handleSkip)}
//           onDone={() => setShowHomePage(true)}
//         />
//       );
//     } else {
//       return (
//         <NavigationContainer>
//           <Stack.Navigator initialRouteName="SignIn">
//             {/* <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
//             <Stack.Screen name="SignUp" component={SignUp} />
//             <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
//             <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
//           </Stack.Navigator>
//         </NavigationContainer>
//       );
//     }
//   };

//   const renderSlideItem = ({ item }) => (
//     <View style={styles.slide}>
//       <Image source={item.image} style={styles.image} resizeMode="contain" />
//       <Text style={styles.title}>{item.title}</Text>
//       {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
//     </View>
//   );

//   const renderButton = (label, onPress) => (
//     <TouchableOpacity style={styles.button} onPress={onPress}>
//       <Text style={styles.buttonText}>{label}</Text>
//     </TouchableOpacity>
//   );

//   return renderContent();
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingHorizontal: 20,
//   },
//   image: {
//     width: '90%',
//     height: 300,
//     borderRadius: 10,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   activeDot: {
//     backgroundColor: '#007AFF',
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//   },
//   button: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#007AFF',
//     borderRadius: 20,
//     marginBottom: 20,
//   },
//   buttonText: {
//     color: '#ffffff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });


import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/homeScreen/Home';
import Onboarding from './src/onboarding/Onboarding';
import CourseDetails from './src/components/CourseDetails';
import SignIn from './src/signupSignin/SignIn';
import SignUp from './src/signupSignin/SignUp';
import ForgotPassword from './src/signupSignin/ForgotPassword';


const Stack = createStackNavigator();

export default function App() {
  const [showHomePage, setShowHomePage] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

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
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            {/* <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} /> */}
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="CourseDetails" component={CourseDetails}  options={{ headerShown: false }}/>
          </Stack.Navigator>
        </NavigationContainer>
      );
    }
  };

  return renderContent();
}
