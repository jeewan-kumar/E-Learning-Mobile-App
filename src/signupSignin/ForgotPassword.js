import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const windowWidth = Dimensions.get('window').width;
const apiUrl = 'http://192.168.33.157:5164/skillup_UserSignUp';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const forgotPassword = async (email) => {
    try {
      setIsLoading(true);
      const requestData = {
        eventID: '1002',
        addInfo: {
          email: email,
        },
      };
      const response = await axios.post(apiUrl, requestData);
      const userData = response.data;
      if (userData.exists) {
        // Email exists in the database
        await AsyncStorage.setItem('email', email); // Store email in AsyncStorage if needed
        setEmail(email); // Set email state
        setIsLoading(false); // Disable loading indicator
        setShowOtpInput(true); // Show OTP input field
        return userData;
      } else {
        // Email does not exist in the database
        setIsLoading(false); // Disable loading indicator
        Alert.alert('Error', 'Email does not exist in the database');
      }
    } catch (error) {
      setIsLoading(false); // Disable loading indicator
      Alert.alert('Error', 'Failed to send OTP. Please try again.');
      console.error('Failed to send OTP:', error);
    }
  };

  const handleVerifyOTP = async (email,otp) => {
    try {
      setIsLoading(true);
      const requestData = {
        eventID: '1004',
        addInfo: {
          email: email,
          otp: otp,
        },
      };
      const response = await axios.post(apiUrl, requestData);
      setIsLoading(false);
      setShowOtpInput(false);
      setShowResetPassword(true);
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Invalid OTP. Please try again.');
      console.error('Failed to verify OTP:', error);
    }
  };

  const handleResetPasswordFinal = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    try {
      setIsLoading(true);
      const requestData = {
        eventID: '1003',
        addInfo: {
          email: email,
          newPassword: newPassword,
        },
      };
      const response = await axios.post(apiUrl, requestData);
      setIsLoading(false);
      Alert.alert('Password Reset', 'Password has been reset successfully.');
      navigation.goBack();
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to reset password. Please try again.');
      console.error('Failed to reset password:', error);
    }
  };

  const handleResetPassword = () => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    forgotPassword(email);
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
      {showOtpInput && (
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          keyboardType="numeric"
          value={otp}
          onChangeText={setOtp}
        />
      )}
      {showResetPassword && (
        <>
          <TextInput
            style={styles.input}
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </>
      )}
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : showOtpInput ? (
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      ) : showResetPassword ? (
        <TouchableOpacity style={styles.button} onPress={handleResetPasswordFinal}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
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

// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

// const ForgotPassword = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

//   const handleResetPassword = async () => {
//     // Basic email format validation
//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Invalid email address');
//       return;
//     }

//     // Reset password logic
//     setIsLoading(true);
//     // Simulate reset password API call
//     setTimeout(() => {
//       setIsLoading(false);
//       Alert.alert('Password Reset', 'Password reset instructions have been sent to your email.');
//       navigation.goBack();
//     }, 2000); // Simulating a delay of 2 seconds
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email address"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />
//       {isLoading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default ForgotPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#000',
//   },
//   input: {
//     width: windowWidth * 0.8,
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 20,
//   },
//   button: {
//     width: windowWidth * 0.8,
//     height: 40,
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });


// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';

// const windowWidth = Dimensions.get('window').width;

// const ForgotPassword = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);

//   const handleResetPassword = async () => {
//     // Basic email format validation
//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Invalid email address');
//       return;
//     }

//     // Simulate sending OTP to email and show OTP input
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       setShowOtpInput(true);
//     }, 1000); // Simulate a delay of 1 second
//   };

//   const handleVerifyOTP = () => {
//     // Simulate OTP verification (replace with actual verification logic)
//     if (otp === '123456') { // Example OTP for demonstration
//       setShowOtpInput(false);
//       setShowResetPassword(true);
//     } else {
//       Alert.alert('Error', 'Invalid OTP');
//     }
//   };

//   const handleResetPasswordFinal = () => {
//     // Validate password fields
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     // Reset password logic (simulated here)
//     setIsLoading(true);
//     setTimeout(() => {
//       setIsLoading(false);
//       Alert.alert('Password Reset', 'Password has been reset successfully.');
//       navigation.goBack();
//     }, 2000); // Simulate a delay of 2 seconds
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email address"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />
//       {showOtpInput && (
//         <TextInput
//           style={styles.input}
//           placeholder="Enter OTP"
//           keyboardType="numeric"
//           value={otp}
//           onChangeText={setOtp}
//         />
//       )}
//       {showResetPassword && (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="New Password"
//             secureTextEntry
//             value={newPassword}
//             onChangeText={setNewPassword}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//         </>
//       )}
//       {isLoading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : showOtpInput ? (
//         <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//           <Text style={styles.buttonText}>Verify OTP</Text>
//         </TouchableOpacity>
//       ) : showResetPassword ? (
//         <TouchableOpacity style={styles.button} onPress={handleResetPasswordFinal}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default ForgotPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#000',
//   },
//   input: {
//     width: windowWidth * 0.8,
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 20,
//   },
//   button: {
//     width: windowWidth * 0.8,
//     height: 40,
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });


// import React, { useState } from 'react';
// import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
// import axios from 'axios';

// const windowWidth = Dimensions.get('window').width;
// const apiUrl = 'http://192.168.33.157:5164/skillup_UserSignUp'; // Replace with your API URL

// const ForgotPassword = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [otp, setOtp] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showOtpInput, setShowOtpInput] = useState(false);
//   const [showResetPassword, setShowResetPassword] = useState(false);

//   const handleResetPassword = async () => {
//     // Basic email format validation
//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Invalid email address');
//       return;
//     }

//     // Call API to send OTP to email
//     try {
//       setIsLoading(true);
//       const requestData = {
//         eventID: '1002',
//         addInfo: {
//           email: email,
//         },
//       };
//       const response = await axios.post(apiUrl, requestData);
//       setIsLoading(false);
//       setShowOtpInput(true);
//     } catch (error) {
//       setIsLoading(false);
//       Alert.alert('Error', 'Failed to send OTP. Please try again.');
//       console.error('Failed to send OTP:', error);
//     }
//   };

//   const handleVerifyOTP = async () => {
//     // Call API to verify OTP
//     try {
//       setIsLoading(true);
//       const requestData = {
//         eventID: '1004',
//         addInfo: {
//           email: email,
//           otp: otp,
//         },
//       };
//       const response = await axios.post(apiUrl, requestData);
//       setIsLoading(false);
//       setShowOtpInput(false);
//       setShowResetPassword(true);
//     } catch (error) {
//       setIsLoading(false);
//       Alert.alert('Error', 'Invalid OTP. Please try again.');
//       console.error('Failed to verify OTP:', error);
//     }
//   };

//   const handleResetPasswordFinal = async () => {
//     // Validate password fields
//     if (newPassword !== confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return;
//     }

//     // Call API to reset password
//     try {
//       setIsLoading(true);
//       const requestData = {
//         eventID: '1003',
//         addInfo: {
//           email: email,
//           newPassword: newPassword,
//         },
//       };
//       const response = await axios.post(apiUrl, requestData);
//       setIsLoading(false);
//       Alert.alert('Password Reset', 'Password has been reset successfully.');
//       navigation.goBack();
//     } catch (error) {
//       setIsLoading(false);
//       Alert.alert('Error', 'Failed to reset password. Please try again.');
//       console.error('Failed to reset password:', error);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Forgot Password</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email address"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />
//       {showOtpInput && (
//         <TextInput
//           style={styles.input}
//           placeholder="Enter OTP"
//           keyboardType="numeric"
//           value={otp}
//           onChangeText={setOtp}
//         />
//       )}
//       {showResetPassword && (
//         <>
//           <TextInput
//             style={styles.input}
//             placeholder="New Password"
//             secureTextEntry
//             value={newPassword}
//             onChangeText={setNewPassword}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Confirm Password"
//             secureTextEntry
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//           />
//         </>
//       )}
//       {isLoading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : showOtpInput ? (
//         <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
//           <Text style={styles.buttonText}>Verify OTP</Text>
//         </TouchableOpacity>
//       ) : showResetPassword ? (
//         <TouchableOpacity style={styles.button} onPress={handleResetPasswordFinal}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//       ) : (
//         <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//       )}
//     </View>
//   );
// };

// export default ForgotPassword;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#000',
//   },
//   input: {
//     width: windowWidth * 0.8,
//     height: 40,
//     borderWidth: 1,
//     borderColor: 'gray',
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 20,
//   },
//   button: {
//     width: windowWidth * 0.8,
//     height: 40,
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
// });

