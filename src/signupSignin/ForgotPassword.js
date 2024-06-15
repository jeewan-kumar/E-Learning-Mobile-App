// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

// const ForgotPassword = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleResetPassword = () => {
//     // Add logic for resetting password here
//     if (email.trim() === '') {
//       setError('Email is required');
//       return;
//     }
//     // Here you would implement your password reset logic.
//     // For demo purposes, just showing success message.
//     setSuccessMessage(`Password reset link sent to ${email}`);
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <Text style={styles.subtitle}>Enter your email to receive a password reset link</Text>
//       <TextInput
//         style={styles.input}
//         placeholder='Email address'
//         keyboardType='email-address'
//         autoCapitalize='none'
//         autoCompleteType='email'
//         value={email}
//         onChangeText={setEmail}
//       />
//       {error ? <Text style={styles.errorText}>{error}</Text> : null}
//       {successMessage ? <Text style={styles.successText}>{successMessage}</Text> : null}
//       <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
//         <Text style={styles.resetButtonText}>Reset Password</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={styles.backLink}>Back to Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default ForgotPassword;

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
//   input: {
//     width: windowWidth * 0.8,
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 10,
//   },
//   errorText: {
//     color: 'red',
//     marginBottom: 10,
//   },
//   successText: {
//     color: 'green',
//     marginBottom: 10,
//   },
//   resetButton: {
//     width: windowWidth * 0.8,
//     height: 40,
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   resetButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   backLink: {
//     color: 'blue',
//     marginTop: 20,
//   },
// });

import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async () => {
    // Basic email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    // Reset password logic
    setIsLoading(true);
    // Simulate reset password API call
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert('Password Reset', 'Password reset instructions have been sent to your email.');
      navigation.goBack();
    }, 2000); // Simulating a delay of 2 seconds
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  input: {
    width: windowWidth * 0.8,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  button: {
    width: windowWidth * 0.8,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
