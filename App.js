
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
import Ionicons from 'react-native-vector-icons/Ionicons';

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
            <Stack.Navigator initialRouteName="Splash" screenOptions={{headerShown:false}}>
              <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
              <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
              <Stack.Screen name="SignUp" component={SignUp} />
              <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
              <Stack.Screen name="Home" component={MainTabNavigator}  />
              <Stack.Screen name="Profile" component={ProfileScreen} />
              <Stack.Screen name="CourseDetails" component={CourseDetailsScreen} />
              <Stack.Screen name="Search" component={SearchScreen} />
              {/* <Stack.Screen name="AllCourses" component={AllCourses} /> */}

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
      <Tab.Screen name="Home" component={Home}  options={{headerTitle:'Explore Courses', headerTitleAlign:"center", 
        tabBarIcon:()=>{
          return<Ionicons name="home-outline" size={25}/>
        }
      }}/>      
      <Tab.Screen name="Search" component={SearchScreen} options={{ headerTitleAlign:"center",
        tabBarIcon:()=>{
          return<Ionicons name="search-outline" size={25}/>
        }
      }}/>
      <Tab.Screen name="EnrolledCourses" component={EnrolledCoursesScreen} options={{ headerTitleAlign:"center",
        tabBarIcon:()=>{
          return<Ionicons name="laptop-outline" size={25}/>
        }
      }}/>
      <Tab.Screen name="Profile" component={ProfileScreen} options={{headerTitleAlign:"center",
        tabBarIcon:()=>{
          return<Ionicons name="person-outline" size={25}/>
        }
       }}/>
    </Tab.Navigator>
  );
}


