// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'

// const slides = [
//     {
//       id: '1',
//       image: require('../images/onbod_01.png'),
//       title: 'Skillup Coding',
//     },
//     {
//       id: '2',
//       image: require('../images/onbod_02.png'),
//       title: 'Skillup Coding Free Trial Courses',
//       subtitle: 'Free courses for you to find your way to learning.',
//     },
//     {
//       id: '3',
//       image: require('../images/onbod_03.png'),
//       title: 'Quick and easy learning',
//       subtitle: 'Easy and fast learning at any time to help you improve various skills.',
//     },
//     {
//       id: '4',
//       image: require('../images/onbod_04.png'),
//       title: 'Personalized for you',
//       subtitle: 'Get recommendations based on your enrolled courses and searches.',
//     },
//     {
//       id: '5',
//       image: require('../images/onbod_05.png'),
//       title: 'Get Online Certificate',
//       subtitle: 'Analyse your scores and Track your results.',
//     },
//   ];
  

// const Onboard = () => {
//   return (
//     <View>
//       <Text>Onboard</Text>
//     </View>
//   )
// }

// export default Onboard

// const styles = StyleSheet.create({})

// import React, { useState } from 'react';
// import { View, Text, Image, StatusBar, StyleSheet } from 'react-native';
// import AppIntroSlider from 'react-native-app-intro-slider';

// const slides = [
//   {
//     id: '1',
//     image: require('../images/onbod_01.png'),
//     title: 'Skillup Coding',
//   },
//   {
//     id: '2',
//     image: require('../images/onbod_02.png'),
//     title: 'Skillup Coding Free Trial Courses',
//     subtitle: 'Free courses for you to find your way to learning.',
//   },
//   {
//     id: '3',
//     image: require('../images/onbod_03.png'),
//     title: 'Quick and easy learning',
//     subtitle: 'Easy and fast learning at any time to help you improve various skills.',
//   },
//   {
//     id: '4',
//     image: require('../images/onbod_04.png'),
//     title: 'Personalized for you',
//     subtitle: 'Get recommendations based on your enrolled courses and searches.',
//   },
//   {
//     id: '5',
//     image: require('../images/onbod_05.png'),
//     title: 'Get Online Certificate',
//     subtitle: 'Analyse your scores and Track your results.',
//   },
// ];

// export default function App() {
//   const [showHomePage, setShowHomePage] = useState(false);

//   const buttonLabel = (label) => {
//     return (
//       <View style={styles.buttonContainer}>
//         <Text style={styles.buttonText}>{label}</Text>
//       </View>
//     );
//   };

//   if (!showHomePage) {
//     return (
//       <AppIntroSlider
//         data={slides}
//         renderItem={({ item }) => (
//           <View style={styles.slide}>
//             <Image source={item.image} style={styles.image} resizeMode="contain" />
//             <Text style={styles.title}>{item.title}</Text>
//             {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
//           </View>
//         )}
//         activeDotStyle={styles.activeDot}
//         showSkipButton
//         renderNextButton={() => buttonLabel('Next')}
//         renderSkipButton={() => buttonLabel('Skip')}
//         renderDoneButton={() => buttonLabel('Done')}
//         onDone={() => {
//           setShowHomePage(true);
//         }}
//       />
//     );
//   }

//   // Render your home page component here
//   return (
//     <View style={styles.container}>
//       <Text>Welcome to the Home Page</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   buttonContainer: {
//     padding: 12,
//   },
//   buttonText: {
//     fontWeight: '600',
//     fontSize: 16,
//   },
//   slide: {
//     flex: 1,
//     alignItems: 'center',
//     padding: 15,
//     paddingTop: 100,
//   },
//   image: {
//     width: '80%',
//     height: 400,
//   },
//   title: {
//     fontWeight: 'bold',
//     fontSize: 24,
//     marginTop: 20,
//   },
//   subtitle: {
//     textAlign: 'center',
//     marginTop: 10,
//   },
//   activeDot: {
//     backgroundColor: 'blue', // Customize active dot style
//     width: 30,
//   },
// });

import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    id: '1',
    image: require('../images/onbod_01.png'),
    title: 'Skillup Coding',
  },
  {
    id: '2',
    image: require('../images/onbod_02.png'),
    title: 'Skillup Coding Free Trial Courses',
    subtitle: 'Free courses for you to find your way to learning.',
  },
  {
    id: '3',
    image: require('../images/onbod_03.png'),
    title: 'Quick and easy learning',
    subtitle: 'Easy and fast learning at any time to help you improve various skills.',
  },
  {
    id: '4',
    image: require('../images/onbod_04.png'),
    title: 'Personalized for you',
    subtitle: 'Get recommendations based on your enrolled courses and searches.',
  },
  {
    id: '5',
    image: require('../images/onbod_05.png'),
    title: 'Get Online Certificate',
    subtitle: 'Analyse your scores and Track your results.',
  },
];

const Onboarding = ({
  sliderRef,
  handleNext,
  handleSkip,
  setShowHomePage,
  currentIndex,
  setCurrentIndex,
}) => {
  const renderSlideItem = ({ item }) => (
    <View style={styles.slide}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <Text style={styles.title}>{item.title}</Text>
      {item.subtitle && <Text style={styles.subtitle}>{item.subtitle}</Text>}
    </View>
  );

  const renderButton = (label, onPress) => (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1 }}>
      <AppIntroSlider
        ref={sliderRef}
        data={slides}
        renderItem={renderSlideItem}
        activeDotStyle={styles.activeDot}
        showSkipButton
        renderNextButton={() => renderButton('Next', handleNext)}
        renderSkipButton={() => renderButton('Skip', handleSkip)}
        renderDoneButton={() => renderButton('Done', handleSkip)}
        onDone={() => setShowHomePage(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: '90%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  activeDot: {
    backgroundColor: '#007AFF',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  button: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Onboarding;
