
import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { AuthContext } from '../services/AuthContext';

const windowWidth = Dimensions.get('window').width;

const SignUp = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { signUp, isLoading } = useContext(AuthContext);

  const handleSignUp = async () => {
    // Basic email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Invalid email address');
      return;
    }

    // Basic phone number format validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Error', 'Invalid phone number. Phone number must be 10 digits');
      return;
    }

    // Other validations and sign up logic
    if (email && phone && password && password === confirmPassword) {
      const signUpSuccess = await signUp(email, phone, password);
      if (signUpSuccess) {
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', 'Sign-up failed. Please try again.');
      }
    } else {
      Alert.alert('Error', 'All fields are required and passwords must match');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
      {isLoading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.linkText}>Back to Sign In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'#000'
  },
  input: {
    width: windowWidth * 0.8,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 10,
  },
  button: {
    width: windowWidth * 0.8,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkText: {
    color: 'blue',
    marginTop: 20,
  },
});


// import React, { useContext, useState } from 'react';
// import { StyleSheet, Text, View, Dimensions, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
// import { AuthContext } from '../services/AuthContext';

// const windowWidth = Dimensions.get('window').width;

// const SignUp = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const { signUp, isLoading } = useContext(AuthContext);

//   const handleSignUp = async () => {
//     // Basic email format validation
//     const emailRegex = /\S+@\S+\.\S+/;
//     if (!emailRegex.test(email)) {
//       Alert.alert('Error', 'Invalid email address');
//       return;
//     }

//     // Basic phone number format validation
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(phone)) {
//       Alert.alert('Error', 'Invalid phone number. Phone number must be 10 digits');
//       return;
//     }

//     // Other validations and sign up logic
//     if (email && phone && password && password === confirmPassword) {
//       const signUpSuccess = await signUp(email, phone, password);
//       if (signUpSuccess) {
//         navigation.navigate('Home');
//       } else {
//         Alert.alert('Error', 'Sign-up failed. Please try again.');
//       }
//     } else {
//       Alert.alert('Error', 'All fields are required and passwords must match');
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign Up</Text>
//       <TextInput
//         style={styles.input}
//         placeholder="Email"
//         keyboardType="email-address"
//         autoCapitalize="none"
//         value={email}
//         onChangeText={setEmail}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Phone"
//         keyboardType="phone-pad"
//         value={phone}
//         onChangeText={setPhone}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Password"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Confirm Password"
//         secureTextEntry
//         value={confirmPassword}
//         onChangeText={setConfirmPassword}
//       />
//       {isLoading ? (
//         <ActivityIndicator size="large" color="blue" />
//       ) : (
//         <TouchableOpacity style={styles.button} onPress={handleSignUp}>
//           <Text style={styles.buttonText}>Sign Up</Text>
//         </TouchableOpacity>
//       )}
//       <TouchableOpacity onPress={() => navigation.goBack()}>
//         <Text style={styles.linkText}>Back to Sign In</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default SignUp;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color:'#000'
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
//   button: {
//     width: windowWidth * 0.8,
//     height: 40,
//     backgroundColor: 'blue',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderRadius: 5,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   linkText: {
//     color: 'blue',
//     marginTop: 20,
//   },
// });
