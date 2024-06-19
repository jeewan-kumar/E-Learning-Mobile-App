
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { AuthContext } from '../services/AuthContext'; // Ensure AuthContext is properly set up in your services

import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';

const windowWidth = Dimensions.get('window').width;

const SignIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const { signIn, isLoading } = useContext(AuthContext);

  const handleSignInPress = async () => {
    // Basic email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    if (email && password) {
      const signInSuccess = await signIn(email, password);
      if (signInSuccess) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Invalid email or password. Please try again.');
      }
    } else {
      Alert.alert('Error', 'All fields are required');
    }
  };



  const handleSignup = () => {
    navigation.navigate('SignUp');
  };

  return (
    <View style={styles.container}>
     
      <View style={styles.textContainer}>
        <Text style={styles.headingText}>Hey,</Text>
        <Text style={styles.headingText}>Welcome</Text>
        <Text style={styles.headingText}>Back</Text>
      </View>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={colors.secondary}
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={styles.inputContainer}>
          <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={colors.secondary}
            secureTextEntry={secureEntry}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
            <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
        {isLoading ? (
          <ActivityIndicator size="large" color={colors.primary} />
        ) : (
          <TouchableOpacity style={styles.loginButtonWrapper} onPress={handleSignInPress}>
            <Text style={styles.loginText}>Sign-In</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.continueText}>or continue with</Text>
        <TouchableOpacity style={styles.googleButtonContainer} onPress={() => {}}>
          <Image source={require('../images/Google.png')} style={styles.googleImage} />
          <Text style={styles.googleText}>Google</Text>
        </TouchableOpacity>
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Don’t have an account?</Text>
          <TouchableOpacity onPress={handleSignup}>
            <Text style={styles.signupText}>Sign-Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
   
  },
  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
    marginTop:100,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    fontWeight:'bold'
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 100,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 100,
    marginTop: 20,
  },
  loginText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  googleImage: {
    height: 40,
    width: 40,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
    color:'blue',
    fontWeight:'bold',
  },
});



// import React, { useContext, useState } from 'react';
// import { Image, StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { AuthContext } from '../services/AuthContext';

// const windowWidth = Dimensions.get('window').width;

// const SignIn = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const { signIn, isLoading } = useContext(AuthContext);

//   const handleSignInPress = async () => {
//     // Basic email format validation
//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Invalid email address');
//       return;
//     }

//     // Other validations and sign-in logic
//     if (email && password) {
//       const signInSuccess = await signIn(email, password);
//       console.log(signInSuccess ,'api response')
//       if (signInSuccess) {
//         navigation.navigate('Home');
//       } else {
//         Alert.alert('Error', 'Invalid email or password. Please try again.');
//       }
//     } else {
//       Alert.alert('Error', 'All fields are required');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Getting Started!</Text>
//       <Text style={styles.subtitle}>Create an Account to Continue your allCourses</Text>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={styles.input}
//           placeholder='Email address'
//           keyboardType='email-address'
//           autoCapitalize='none'
//           value={email}
//           onChangeText={setEmail}
//         />
//         <TextInput
//           style={styles.input}
//           placeholder='Password'
//           secureTextEntry={true}
//           value={password}
//           onChangeText={setPassword}
//         />
//       </View>
//       {isLoading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <TouchableOpacity style={styles.signInButton} onPress={handleSignInPress}>
//           <Text style={styles.signInButtonText}>Sign In</Text>
//         </TouchableOpacity>
//       )}
//       <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
//         <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//       </TouchableOpacity>
//       <Text>Or Continue With</Text>
//       <View style={styles.socialLoginContainer}>
//         <TouchableOpacity onPress={() => { }}>
//           <Image source={require('../images/Google.png')} style={styles.socialLoginImage} />
//         </TouchableOpacity>
//         <TouchableOpacity onPress={() => { }}>
//           <Image source={require('../images/Apple.png')} style={styles.socialLoginImage} />
//         </TouchableOpacity>
//       </View>
//       <View style={styles.signUpContainer}>
//         <Text style={styles.signUpText}>Don't have an account? </Text>
//         <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//           <Text style={styles.signUpLink}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default SignIn;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   subtitle: {
//     fontSize: 16,
//     marginBottom: 20,
//     textAlign: 'center',
//     paddingHorizontal: 20,
//   },
//   inputContainer: {
//     width: windowWidth * 0.8,
//     marginBottom: 20,
//   },
//   input: {
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 10,
//   },
//   signInButton: {
//     width: windowWidth * 0.8,
//     height: 40,
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   signInButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   socialLoginContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     width: windowWidth * 0.8,
//     marginTop: 20,
//   },
//   socialLoginImage: {
//     width: 50,
//     height: 50,
//     marginHorizontal: 10,
//   },
//   signUpContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
//   signUpText: {
//     marginRight: 5,
//   },
//   signUpLink: {
//     color: 'blue',
//   },
//   forgotPasswordContainer: {
//     marginTop: 10,
//     alignSelf: 'flex-end',
//     marginRight: windowWidth * 0.1,
//   },
//   forgotPasswordText: {
//     color: 'blue',
//     textDecorationLine: 'underline',
//   },
// });
