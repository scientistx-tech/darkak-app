// // import React, { useState } from 'react';
// // import {
// //   View,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   StyleSheet,
// //   ScrollView,
// //   KeyboardAvoidingView,
// //   Platform,
// // } from 'react-native';
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

// // // Props interface update করুন
// // interface LoginScreenProps {
// //   onLoginSuccess?: () => void;
// //   onRegisterPress?: () => void;
// //   onGuestContinue?: () => void;
// //   onModeratorLogin?: () => void;
// //   onForgotPassword?: () => void;
// // }

// // const LoginScreen: React.FC<LoginScreenProps> = ({ 
// //   onLoginSuccess, 
// //   onRegisterPress,
// //   onGuestContinue,
// //   onModeratorLogin,
// //   onForgotPassword
// // }) => {
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [password, setPassword] = useState('');

// //   const handleLogin = () => {
// //     console.log('Login pressed');
// //     if (onLoginSuccess) {
// //       onLoginSuccess();
// //     }
// //   };

// //   const handleForgotPassword = () => {
// //     console.log('Forgot Password pressed');
// //     if (onForgotPassword) {
// //       onForgotPassword();
// //     }
// //   };

// //   const handleRegister = () => {
// //     console.log('Register Now pressed');
// //     if (onRegisterPress) {
// //       onRegisterPress();
// //     }
// //   };

// //   const handleGuestContinue = () => {
// //     console.log('Continue as Guest pressed');
// //     if (onGuestContinue) {
// //       onGuestContinue();
// //     }
// //   };

// //   const handleModeratorLogin = () => {
// //     console.log('Moderator Login pressed');
// //     if (onModeratorLogin) {
// //       onModeratorLogin();
// //     }
// //   };

// //   const handleSocialLogin = (provider: string) => {
// //     console.log(`${provider} login pressed`);
// //   };

// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// //         style={styles.keyboardAvoid}
// //       >
// //         <ScrollView contentContainerStyle={styles.scrollContainer}>
// //           {/* Header */}
// //           <View style={styles.header}>
// //             <Text style={styles.title}>Welcome Back</Text>
// //             <Text style={styles.subtitle}>
// //               Login using your social account or email
// //             </Text>
// //           </View>

// //           {/* Social Login Buttons */}
// //           <View style={styles.socialContainer}>
// //             {/* Google Login - Red Background */}
// //             <TouchableOpacity 
// //               style={[styles.socialButton, styles.googleButton]} 
// //               onPress={() => handleSocialLogin('Google')}
// //             >
// //               <View style={styles.socialButtonContent}>
// //                 <View style={styles.iconContainer}>
// //                   <FontAwesome5 name="google" size={20} color="#fff" />
// //                 </View>
// //                 <View style={styles.verticalDivider} />
// //                 <View style={styles.textContainer}>
// //                   <Text style={styles.socialButtonText}>LOGIN WITH GOOGLE</Text>
// //                 </View>
// //               </View>
// //             </TouchableOpacity>

// //             {/* Facebook Login - Blue Background */}
// //             <TouchableOpacity 
// //               style={[styles.socialButton, styles.facebookButton]} 
// //               onPress={() => handleSocialLogin('Facebook')}
// //             >
// //               <View style={styles.socialButtonContent}>
// //                 <View style={styles.iconContainer}>
// //                   <FontAwesome5 name="facebook" size={20} color="#fff" />
// //                 </View>
// //                 <View style={styles.verticalDivider} />
// //                 <View style={styles.textContainer}>
// //                   <Text style={styles.socialButtonText}>LOGIN WITH FACEBOOK</Text>
// //                 </View>
// //               </View>
// //             </TouchableOpacity>

// //             {/* Phone Login - Light Green Background */}
// //             <TouchableOpacity 
// //               style={[styles.socialButton, styles.phoneButton]} 
// //               onPress={() => handleSocialLogin('Phone')}
// //             >
// //               <View style={styles.socialButtonContent}>
// //                 <View style={styles.iconContainer}>
// //                   <MaterialIcons name="phone-android" size={20} color="#fff" />
// //                 </View>
// //                 <View style={styles.verticalDivider} />
// //                 <View style={styles.textContainer}>
// //                   <Text style={styles.socialButtonText}>LOGIN WITH PHONE</Text>
// //                 </View>
// //               </View>
// //             </TouchableOpacity>
// //           </View>

// //           {/* OR Divider */}
// //           <View style={styles.dividerContainer}>
// //             <View style={styles.dividerLine} />
// //             <Text style={styles.dividerText}>OR</Text>
// //             <View style={styles.dividerLine} />
// //           </View>

// //           {/* Email and Password Inputs */}
// //           <View style={styles.formContainer}>
// //             <TextInput
// //               style={styles.input}
// //               placeholder="Email"
// //               placeholderTextColor="#999"
// //               keyboardType="email-address"
// //               autoCapitalize="none"
// //             />

// //             <View style={styles.passwordContainer}>
// //               <TextInput
// //                 style={styles.passwordInput}
// //                 placeholder="Enter Password"
// //                 placeholderTextColor="#999"
// //                 secureTextEntry={!showPassword}
// //                 value={password}
// //                 onChangeText={setPassword}
// //               />
// //               <TouchableOpacity 
// //                 style={styles.eyeButton}
// //                 onPress={togglePasswordVisibility}
// //               >
// //                 <Ionicons 
// //                   name={showPassword ? "eye-off" : "eye"} 
// //                   size={24} 
// //                   color="#666" 
// //                 />
// //               </TouchableOpacity>
// //             </View>

// //             {/* Forgot Password Button with Underline */}
// //             <TouchableOpacity 
// //               style={styles.forgotPasswordButton} 
// //               onPress={handleForgotPassword}
// //             >
// //               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
// //             </TouchableOpacity>

// //             {/* Login Button - Navy Blue */}
// //             <TouchableOpacity 
// //               style={styles.loginButton} 
// //               onPress={handleLogin}
// //             >
// //               <Text style={styles.loginButtonText}>Login</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* Register Section */}
// //           <View style={styles.registerContainer}>
// //             <Text style={styles.registerText}>
// //               Dont have an account?{' '}
// //             </Text>
// //             <TouchableOpacity onPress={handleRegister}>
// //               <Text style={styles.registerButton}>Register Now</Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* OR Divider */}
// //           <View style={styles.dividerContainer}>
// //             <View style={styles.dividerLine} />
// //             <Text style={styles.dividerText}>OR</Text>
// //             <View style={styles.dividerLine} />
// //           </View>

// //           {/* Additional Options - Text Buttons with Underline */}
// //           <View style={styles.optionsContainer}>
// //             <TouchableOpacity 
// //               style={styles.textButton} 
// //               onPress={handleGuestContinue}
// //             >
// //               <Text style={styles.textButtonText}>Continue as a Guest</Text>
// //             </TouchableOpacity>

// //             <TouchableOpacity 
// //               style={styles.textButton} 
// //               onPress={handleModeratorLogin}
// //             >
// //               <Text style={styles.textButtonText}>Moderator Login</Text>
// //             </TouchableOpacity>
// //           </View>
// //         </ScrollView>
// //       </KeyboardAvoidingView>
// //     </SafeAreaView>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     flex: 1,
// //     backgroundColor: '#fff',
// //   },
// //   keyboardAvoid: {
// //     flex: 1,
// //   },
// //   scrollContainer: {
// //     flexGrow: 1,
// //     paddingHorizontal: 24,
// //     paddingVertical: 32,
// //   },
// //   header: {
// //     alignItems: 'center',
// //     marginBottom: 40,
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: 'bold',
// //     color: '#333',
// //     marginBottom: 8,
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: '#666',
// //     textAlign: 'center',
// //   },
// //   socialContainer: {
// //     marginBottom: 24,
// //   },
// //   socialButton: {
// //     borderRadius: 8,
// //     marginBottom: 12,
// //     height: 50,
// //     overflow: 'hidden',
// //   },
// //   socialButtonContent: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     flex: 1,
// //   },
// //   iconContainer: {
// //     width: 60,
// //     height: '100%',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     backgroundColor: 'rgba(0,0,0,0.1)',
// //   },
// //   textContainer: {
// //     flex: 1,
// //     height: '100%',
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //   },
// //   verticalDivider: {
// //     width: 2,
// //     height: '100%',
// //     backgroundColor: '#ffffff',
// //   },
// //   socialButtonText: {
// //     fontSize: 16,
// //     fontWeight: '600',
// //     color: '#fff',
// //   },
// //   googleButton: {
// //     backgroundColor: '#DB4437',
// //   },
// //   facebookButton: {
// //     backgroundColor: '#4267B2',
// //   },
// //   phoneButton: {
// //     backgroundColor: '#25D366',
// //   },
// //   dividerContainer: {
// //     flexDirection: 'row',
// //     alignItems: 'center',
// //     marginVertical: 24,
// //   },
// //   dividerLine: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: '#dee2e6',
// //   },
// //   dividerText: {
// //     marginHorizontal: 16,
// //     color: '#666',
// //     fontWeight: '600',
// //   },
// //   formContainer: {
// //     marginBottom: 24,
// //   },
// //   input: {
// //     backgroundColor: '#f8f9fa',
// //     borderWidth: 1,
// //     borderColor: '#dee2e6',
// //     borderRadius: 8,
// //     paddingVertical: 16,
// //     paddingHorizontal: 16,
// //     fontSize: 16,
// //     marginBottom: 16,
// //   },
// //   passwordContainer: {
// //     position: 'relative',
// //     marginBottom: 16,
// //   },
// //   passwordInput: {
// //     backgroundColor: '#f8f9fa',
// //     borderWidth: 1,
// //     borderColor: '#dee2e6',
// //     borderRadius: 8,
// //     paddingVertical: 16,
// //     paddingHorizontal: 16,
// //     fontSize: 16,
// //     paddingRight: 50,
// //   },
// //   eyeButton: {
// //     position: 'absolute',
// //     right: 16,
// //     top: 16,
// //     padding: 4,
// //   },
// //   forgotPasswordButton: {
// //     alignSelf: 'flex-end',
// //     marginBottom: 24,
// //   },
// //   forgotPasswordText: {
// //     color: '#dc3545',
// //     fontSize: 14,
// //     fontWeight: '600',
// //     textDecorationLine: 'underline',
// //   },
// //   loginButton: {
// //     backgroundColor: '#003366', 
// //     paddingVertical: 16,
// //     borderRadius: 8,
// //     alignItems: 'center',
// //   },
// //   loginButtonText: {
// //     color: '#fff',
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   registerContainer: {
// //     alignItems: 'center',
// //     marginBottom: 24,
// //     flexDirection: 'row',
// //     justifyContent: 'center',
// //   },
// //   registerText: {
// //     fontSize: 14,
// //     color: '#666',
// //   },
// //   registerButton: {
// //     color: '#007bff',
// //     fontWeight: 'bold',
// //   },
// //   optionsContainer: {
// //     gap: 16,
// //     alignItems: 'center',
// //   },
// //   textButton: {
// //     paddingVertical: 8,
// //   },
// //   textButtonText: {
// //     color: '#007bff',
// //     fontSize: 16,
// //     fontWeight: '600',
// //     textDecorationLine: 'underline',
// //   },
// // });

// // export default LoginScreen;


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
//   Alert,
//   ActivityIndicator,
// } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';
// import { setLogInUserRequest } from '@/redux/actions/registration.action';

// // Props interface update করুন
// interface LoginScreenProps {
//   onLoginSuccess?: () => void;
//   onRegisterPress?: () => void;
//   onGuestContinue?: () => void;
//   onModeratorLogin?: () => void;
//   onForgotPassword?: () => void;
//   navigation?: any; // Navigation prop add করুন
// }

// const LoginScreen: React.FC<LoginScreenProps> = ({ 
//   onLoginSuccess, 
//   onRegisterPress,
//   onGuestContinue,
//   onModeratorLogin,
//   onForgotPassword,
//   navigation
// }) => {
//   const dispatch = useDispatch();
  
//   // State থেকে data নিন
//   const { 
//     loading: loginLoading,
//     error: loginError,
//     loginData,
//     loginRequest 
//   } = useSelector((state: RootState) => state.registrationUser);
  
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//   });

//   // Error handling
//   useEffect(() => {
//     if (loginError) {
//       Alert.alert('Login Error', loginError);
//     }
//   }, [loginError]);

//   // Success handling
//   useEffect(() => {
//     if (loginData && loginData.message) {
//       console.log('Login response:', loginData);
      
//       // Check if login was successful
//       if (loginData.message.toLowerCase().includes('success') || 
//           loginData.statusCode === 200) {
        
//         // Check if user is active
//         const user = loginData.data;
//         if (user && user.isActive) {
//           Alert.alert('Success', 'Login successful!', [
//             {
//               text: 'OK',
//               onPress: () => {
//                 console.log('✅ User logged in:', user);
//                 if (onLoginSuccess) {
//                   onLoginSuccess();
//                 }
//                 // Navigate to main page
//                 if (navigation) {
//                   navigation.navigate('MainPage');
//                 }
//               }
//             }
//           ]);
//         } else if (user && !user.isActive) {
//           // User is registered but not active
//           Alert.alert(
//             'Account Not Verified',
//             'Please verify your email first. We have sent an OTP to your email.',
//             [
//               {
//                 text: 'OK',
//                 onPress: () => {
//                   // Navigate to OTP verification screen
//                   if (navigation) {
//                     navigation.navigate('OtpVerification', { 
//                       email: user.email 
//                     });
//                   }
//                 }
//               }
//             ]
//           );
//         }
//       } else {
//         // Login failed
//         Alert.alert('Login Failed', loginData.message || 'Invalid credentials');
//       }
//     }
//   }, [loginData]);

//   const handleLogin = () => {
//     // Validate form
//     if (!formData.email || !formData.password) {
//       Alert.alert('Validation Error', 'Please enter both email and password');
//       return;
//     }

//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(formData.email)) {
//       Alert.alert('Validation Error', 'Please enter a valid email address');
//       return;
//     }

//     console.log('Login pressed with:', formData);
    
//     // Dispatch login request
//     dispatch(setLogInUserRequest({
//       email: formData.email,
//       password: formData.password
//     }));
//   };

//   const handleForgotPassword = () => {
//     console.log('Forgot Password pressed');
//     if (onForgotPassword) {
//       onForgotPassword();
//     }
//   };

//   const handleRegister = () => {
//     console.log('Register Now pressed');
//     if (onRegisterPress) {
//       onRegisterPress();
//     }
//     // Navigate to registration screen
//     if (navigation) {
//       navigation.navigate('Registration');
//     }
//   };

//   const handleGuestContinue = () => {
//     console.log('Continue as Guest pressed');
//     if (onGuestContinue) {
//       onGuestContinue();
//     }
//     // Navigate as guest
//     if (navigation) {
//       navigation.navigate('GuestHome');
//     }
//   };

//   const handleModeratorLogin = () => {
//     console.log('Moderator Login pressed');
//     if (onModeratorLogin) {
//       onModeratorLogin();
//     }
//     // Navigate to moderator login
//     if (navigation) {
//       navigation.navigate('ModeratorLogin');
//     }
//   };

//   const handleSocialLogin = (provider: string) => {
//     console.log(`${provider} login pressed`);
//     Alert.alert('Coming Soon', `${provider} login will be available soon!`);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData({
//       ...formData,
//       [field]: value
//     });
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Welcome Back</Text>
//             <Text style={styles.subtitle}>
//               Login using your social account or email
//             </Text>
//           </View>

//           {/* Social Login Buttons */}
//           <View style={styles.socialContainer}>
//             {/* Google Login - Red Background */}
//             <TouchableOpacity 
//               style={[styles.socialButton, styles.googleButton]} 
//               onPress={() => handleSocialLogin('Google')}
//               disabled={loginLoading}
//             >
//               <View style={styles.socialButtonContent}>
//                 <View style={styles.iconContainer}>
//                   <FontAwesome5 name="google" size={20} color="#fff" />
//                 </View>
//                 <View style={styles.verticalDivider} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.socialButtonText}>LOGIN WITH GOOGLE</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Facebook Login - Blue Background */}
//             <TouchableOpacity 
//               style={[styles.socialButton, styles.facebookButton]} 
//               onPress={() => handleSocialLogin('Facebook')}
//               disabled={loginLoading}
//             >
//               <View style={styles.socialButtonContent}>
//                 <View style={styles.iconContainer}>
//                   <FontAwesome5 name="facebook" size={20} color="#fff" />
//                 </View>
//                 <View style={styles.verticalDivider} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.socialButtonText}>LOGIN WITH FACEBOOK</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             {/* Phone Login - Light Green Background */}
//             <TouchableOpacity 
//               style={[styles.socialButton, styles.phoneButton]} 
//               onPress={() => handleSocialLogin('Phone')}
//               disabled={loginLoading}
//             >
//               <View style={styles.socialButtonContent}>
//                 <View style={styles.iconContainer}>
//                   <MaterialIcons name="phone-android" size={20} color="#fff" />
//                 </View>
//                 <View style={styles.verticalDivider} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.socialButtonText}>LOGIN WITH PHONE</Text>
//                 </View>
//               </View>
//             </TouchableOpacity>
//           </View>

//           {/* OR Divider */}
//           <View style={styles.dividerContainer}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           {/* Email and Password Inputs */}
//           <View style={styles.formContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#999"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={formData.email}
//               onChangeText={(text) => handleInputChange('email', text)}
//               editable={!loginLoading}
//             />

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={styles.passwordInput}
//                 placeholder="Enter Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showPassword}
//                 value={formData.password}
//                 onChangeText={(text) => handleInputChange('password', text)}
//                 editable={!loginLoading}
//               />
//               <TouchableOpacity 
//                 style={styles.eyeButton}
//                 onPress={togglePasswordVisibility}
//                 disabled={loginLoading}
//               >
//                 <Ionicons 
//                   name={showPassword ? "eye-off" : "eye"} 
//                   size={24} 
//                   color="#666" 
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Forgot Password Button with Underline */}
//             <TouchableOpacity 
//               style={styles.forgotPasswordButton} 
//               onPress={handleForgotPassword}
//               disabled={loginLoading}
//             >
//               <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
//             </TouchableOpacity>

//             {/* Login Button - Navy Blue */}
//             <TouchableOpacity 
//               style={[
//                 styles.loginButton, 
//                 loginLoading && styles.loginButtonDisabled
//               ]} 
//               onPress={handleLogin}
//               disabled={loginLoading || !formData.email || !formData.password}
//             >
//               {loginLoading ? (
//                 <ActivityIndicator color="#fff" size="small" />
//               ) : (
//                 <Text style={styles.loginButtonText}>Login</Text>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* Register Section */}
//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>
//               Dont have an account?{' '}
//             </Text>
//             <TouchableOpacity onPress={handleRegister} disabled={loginLoading}>
//               <Text style={styles.registerButton}>Register Now</Text>
//             </TouchableOpacity>
//           </View>

//           {/* OR Divider */}
//           <View style={styles.dividerContainer}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           {/* Additional Options - Text Buttons with Underline */}
//           <View style={styles.optionsContainer}>
//             <TouchableOpacity 
//               style={styles.textButton} 
//               onPress={handleGuestContinue}
//               disabled={loginLoading}
//             >
//               <Text style={styles.textButtonText}>Continue as a Guest</Text>
//             </TouchableOpacity>

//             <TouchableOpacity 
//               style={styles.textButton} 
//               onPress={handleModeratorLogin}
//               disabled={loginLoading}
//             >
//               <Text style={styles.textButtonText}>Moderator Login</Text>
//             </TouchableOpacity>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   keyboardAvoid: {
//     flex: 1,
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     paddingHorizontal: 24,
//     paddingVertical: 32,
//   },
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   socialContainer: {
//     marginBottom: 24,
//   },
//   socialButton: {
//     borderRadius: 8,
//     marginBottom: 12,
//     height: 50,
//     overflow: 'hidden',
//   },
//   socialButtonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//   },
//   iconContainer: {
//     width: 60,
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: 'rgba(0,0,0,0.1)',
//   },
//   textContainer: {
//     flex: 1,
//     height: '100%',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   verticalDivider: {
//     width: 2,
//     height: '100%',
//     backgroundColor: '#ffffff',
//   },
//   socialButtonText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#fff',
//   },
//   googleButton: {
//     backgroundColor: '#DB4437',
//   },
//   facebookButton: {
//     backgroundColor: '#4267B2',
//   },
//   phoneButton: {
//     backgroundColor: '#25D366',
//   },
//   dividerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 24,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: '#dee2e6',
//   },
//   dividerText: {
//     marginHorizontal: 16,
//     color: '#666',
//     fontWeight: '600',
//   },
//   formContainer: {
//     marginBottom: 24,
//   },
//   input: {
//     backgroundColor: '#f8f9fa',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   passwordContainer: {
//     position: 'relative',
//     marginBottom: 16,
//   },
//   passwordInput: {
//     backgroundColor: '#f8f9fa',
//     borderWidth: 1,
//     borderColor: '#dee2e6',
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     paddingRight: 50,
//   },
//   eyeButton: {
//     position: 'absolute',
//     right: 16,
//     top: 16,
//     padding: 4,
//   },
//   forgotPasswordButton: {
//     alignSelf: 'flex-end',
//     marginBottom: 24,
//   },
//   forgotPasswordText: {
//     color: '#dc3545',
//     fontSize: 14,
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
//   loginButton: {
//     backgroundColor: '#003366', 
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   loginButtonDisabled: {
//     opacity: 0.7,
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   registerContainer: {
//     alignItems: 'center',
//     marginBottom: 24,
//     flexDirection: 'row',
//     justifyContent: 'center',
//   },
//   registerText: {
//     fontSize: 14,
//     color: '#666',
//   },
//   registerButton: {
//     color: '#007bff',
//     fontWeight: 'bold',
//   },
//   optionsContainer: {
//     gap: 16,
//     alignItems: 'center',
//   },
//   textButton: {
//     paddingVertical: 8,
//   },
//   textButtonText: {
//     color: '#007bff',
//     fontSize: 16,
//     fontWeight: '600',
//     textDecorationLine: 'underline',
//   },
// });

// export default LoginScreen;