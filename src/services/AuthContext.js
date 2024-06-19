// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';
// import React, { createContext, useEffect, useState } from 'react';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [userInfo, setUserInfo] = useState(null);
//     const [isLoading, setIsLoading] = useState(false);
//     const [splashLoading, setSplashLoading] = useState(true);
//     const BASE_URL = "http://192.168.33.157:5164/";

//     const signUp = async (email, phone, password) => {
//         setIsLoading(true);
//         const parems = {
//             eventID: "1001",
//             addInfo: {
//               phone_number: phone,
//               email: email,
//               password: password
//             }
//         }
//         try {
//             const response = await axios.post(`${BASE_URL}skillup_UserSignUp`, parems);
//             console.log(response, 'api response')
//             const userInfo = response.data;
//             setUserInfo(userInfo);
//             await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//             setIsLoading(false);
//             console.log(userInfo);
//             return userInfo
//         } catch (error) {
//             console.error(`Sign up failed: ${error}`);
//             setIsLoading(false);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const signIn = async (email, password) => {
//         setIsLoading(true);
//         const parems = {
//             eventID: "1001",
//             addInfo: {
//               email: email ,
//                 // PhoneNumber:,
//                 password: password
//             }
//         }
//         try {
//             const response = await axios.post(`${BASE_URL}skillup_UserSignIn`, parems);
//             const userInfo = response.data;
//             setUserInfo(userInfo);
//             await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
//             setIsLoading(false);
//             console.log(userInfo);
//             return userInfo
//         } catch (error) {
//             console.error(`Sign in failed: ${error}`);
//             setIsLoading(false);
//         }
//     };

//     const logout = async () => {
//         setIsLoading(true);
//         try {
//             await axios.post(
//                 `${BASE_URL}/logout`,
//                 {},
//                 {
//                     headers: { Authorization: `Bearer ${userInfo?.access_token}` },
//                 }
//             );
//             await AsyncStorage.removeItem('userInfo');
//             setUserInfo(null);
//             setIsLoading(false);
//         } catch (error) {
//             console.error(`Logout failed: ${error}`);
//             setIsLoading(false);
//         }
//     };

//     const isLoggedIn = async () => {
//         try {
//             setSplashLoading(true);
//             const userInfo = await AsyncStorage.getItem('userInfo');
//             if (userInfo) {
//                 setUserInfo(JSON.parse(userInfo));
//             }
//             setSplashLoading(false);
//         } catch (error) {
//             setSplashLoading(false);
//             console.error(`Is logged in check failed: ${error}`);
//         }
//     };

//     useEffect(() => {
//         isLoggedIn();
//     }, []);

//     return (
//         <AuthContext.Provider
//             value={{
//                 isLoading,
//                 userInfo,
//                 splashLoading,
//                 signUp,
//                 signIn,
//                 logout,
//             }}
//         >
//             {children}
//         </AuthContext.Provider>
//     );
// };




// import React, { createContext, useEffect, useState } from 'react';
// import { ActivityIndicator } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import axios from 'axios';

// export const AuthContext = createContext();

// const BASE_URL = "http://192.168.33.157:5164/";

// export const AuthProvider = ({ children }) => {
//   const [userInfo, setUserInfo] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [splashLoading, setSplashLoading] = useState(true); // Start with splash screen loading

//   // Function to sign up a user
//   const signUp = async (email, phone, password) => {
//     setIsLoading(true);
//     try {
//       const params = {
//         eventID: "1001",
//         addInfo: {
//           phone_number: phone,
//           email: email,
//           password: password
//         }
//       };
//       const response = await axios.post(`${BASE_URL}skillup_UserSignUp`, params);
//       const userData = response.data;
//       setUserInfo(userData);
//       await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
//       return userData;
//     } catch (error) {
//       console.error(`Sign up failed: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to sign in a user
//   const signIn = async (email, password) => {
//     setIsLoading(true);
//     try {
//       const params = {
//         eventID: "1001",
//         addInfo: {
//           Emaill: email,
//           Password: password
//         }
//       };
//       const response = await axios.post(`${BASE_URL}skillup_UserSignIn`, params);
//       const userData = response.data;
//       setUserInfo(userData);
//       await AsyncStorage.setItem('userInfo', JSON.stringify(userData));
//       return userData;
//     } catch (error) {
//       console.error(`Sign in failed: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to log out a user
//   const logout = async () => {
//     setIsLoading(true);
//     try {
//       // Add appropriate logout endpoint URL and headers as needed
//       await axios.post(`${BASE_URL}/logout`, {}, {
//         headers: { Authorization: `Bearer ${userInfo?.access_token}` }
//       });
//       await AsyncStorage.removeItem('userInfo');
//       setUserInfo(null);
//     } catch (error) {
//       console.error(`Logout failed: ${error}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Function to check if user is already logged in from AsyncStorage
//   const isLoggedIn = async () => {
//     try {
//       setSplashLoading(true);
//       const userInfo = await AsyncStorage.getItem('userInfo');
//       const onboardingCompleted = await AsyncStorage.getItem('onboardingCompleted');
  
//       if (userInfo) {
//         setUserInfo(JSON.parse(userInfo));
//       }
  
//       if (onboardingCompleted) {
//         navigation.navigate('Home', { email: userInfo.email });
//       } else {
//         navigation.navigate('Onboarding');
//       }
  
//       setSplashLoading(false);
//     } catch (error) {
//       setSplashLoading(false);
//       console.error(`Failed to check logged in status: ${error}`);
//     }
//   };
  

//   useEffect(() => {
//     isLoggedIn(); // Check logged in status on component mount
//   }, []);

//   return (
//     <AuthContext.Provider
//       value={{
//         isLoading,
//         userInfo,
//         signUp,
//         signIn,
//         logout,
//         splashLoading
//       }}
//     >
//       {splashLoading ? <ActivityIndicator size="large" color="#0000ff" /> : children}
//     </AuthContext.Provider>
//   );
// };


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [splashLoading, setSplashLoading] = useState(true);
    const BASE_URL = "http://192.168.33.157:5164/";

    const signUp = async (email, phone, password) => {
        setIsLoading(true);
        const params = {
            eventID: "1001",
            addInfo: {
              phone_number: phone,
              email: email,
              password: password
            }
        }
        try {
            const response = await axios.post(`${BASE_URL}skillup_UserSignUp`, params);
            console.log(response, 'api response')
            const userInfo = response.data;
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
            return userInfo;
        } catch (error) {
            console.error(`Sign up failed: ${error}`);
            setIsLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setIsLoading(true);
        const params = {
            eventID: "1001",
            addInfo: {
              email: email,
              password: password
            }
        }
        try {
            const response = await axios.post(`${BASE_URL}skillup_UserSignIn`, params);
            const userInfo = response.data;
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
            return userInfo;
        } catch (error) {
            console.error(`Sign in failed: ${error}`);
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            await axios.post(
                `${BASE_URL}/logout`,
                {},
                {
                    headers: { Authorization: `Bearer ${userInfo?.access_token}` },
                }
            );
            await AsyncStorage.removeItem('userInfo');
            setUserInfo(null);
            setIsLoading(false);
        } catch (error) {
            console.error(`Logout failed: ${error}`);
            setIsLoading(false);
        }
    };

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                setUserInfo(JSON.parse(userInfo));
            }
            setSplashLoading(false);
        } catch (error) {
            setSplashLoading(false);
            console.error(`Is logged in check failed: ${error}`);
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                isLoading,
                userInfo,
                splashLoading,
                signUp,
                signIn,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
