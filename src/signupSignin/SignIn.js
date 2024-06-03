import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Image } from 'react-native';
import Home from '../homeScreen/Home';

const windowWidth = Dimensions.get('window').width;

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignInPress = () => {
    const correctEmail = "user@example.com";
    const correctPassword = "password123";

    if (email === correctEmail && password === correctPassword) {
      navigation.navigate('Home');
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Getting Started!</Text>
      <Text style={styles.subtitle}>Create an Account to Continue your allCourses</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder='Email address or Phone number'
          keyboardType='email-address'
          autoCapitalize='none'
          autoCompleteType='email'
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder='Password'
          secureTextEntry={true}
          autoCompleteType='password'
          value={password}
          onChangeText={setPassword}
        />
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.signInButton} onPress={handleSignInPress}>
        <Text style={styles.signInButtonText}>Sign In</Text>
      </TouchableOpacity>
      <View style={styles.forgotPasswordContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>
      <Text>Or Continue With</Text>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity onPress={() => { }}>
          <Image source={require('../images/Google.png')} style={styles.socialLoginImage} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { }}>
          <Image source={require('../images/Apple.png')} style={styles.socialLoginImage} />
        </TouchableOpacity>
      </View>
      <View style={styles.signUpContainer}>
        <Text style={styles.signUpText}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpLink}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  inputContainer: {
    width: windowWidth * 0.8,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  signInButton: {
    width: windowWidth * 0.8,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  signInButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: windowWidth * 0.8,
    marginTop: 20,
  },
  socialLoginImage: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  signUpContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpText: {
    marginRight: 5,
  },
  signUpLink: {
    color: 'blue',
  },
  forgotPasswordContainer: {
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: windowWidth * 0.1,
  },
  forgotPasswordText: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});
