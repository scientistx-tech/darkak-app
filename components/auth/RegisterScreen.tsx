// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   View,
// // //   Text,
// // //   TextInput,
// // //   TouchableOpacity,
// // //   StyleSheet,
// // //   ScrollView,
// // //   KeyboardAvoidingView,
// // //   Platform,
// // //   ActivityIndicator,
// // // } from 'react-native';
// // // import { SafeAreaView } from "react-native-safe-area-context";
// // // import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
// // // import { useDispatch, useSelector } from 'react-redux';
// // // import { clearRegistrationData, setRegistrationRequest } from '@/redux/actions/registration.action';
// // // import { RootState } from '@/redux/store';

// // // // Props interface
// // // interface RegisterScreenProps {
// // //   onRegisterSuccess?: () => void;
// // //   onLoginPress?: () => void;
// // //   onGuestContinue?: () => void;
// // // }

// // // const RegisterScreen: React.FC<RegisterScreenProps> = ({
// // //   onRegisterSuccess,
// // //   onLoginPress,
// // //   onGuestContinue
// // // }) => {
// // //   const dispatch = useDispatch();
// // //   const [showPassword, setShowPassword] = useState(false);
// // //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// // //   const [password, setPassword] = useState('');
// // //   const [confirmPassword, setConfirmPassword] = useState('');
// // //   const [name, setName] = useState('');
// // //   const [email, setEmail] = useState('');
// // //   const [validationError, setValidationError] = useState('');

// // //   const { registrationData, loading, error } = useSelector(
// // //     (state: RootState) => state?.registrationUser
// // //   );

// // //   // Watch for successful registration
// // //   useEffect(() => {
// // //     if (registrationData?.statusCode === 200 && registrationData?.data) {
// // //       console.log('Registration successful, calling onRegisterSuccess');
// // //       if (onRegisterSuccess) {
// // //         onRegisterSuccess();
// // //       }
// // //     }
// // //   }, [registrationData, onRegisterSuccess]);

// // //   // Show errors from Redux
// // //   useEffect(() => {
// // //     if (error) {
// // //       setValidationError(error);
// // //     }
// // //   }, [error]);

// // //   const validateForm = () => {
// // //     if (!name.trim()) {
// // //       setValidationError('Please enter your name');
// // //       return false;
// // //     }

// // //     if (!email.trim()) {
// // //       setValidationError('Please enter your email');
// // //       return false;
// // //     }

// // //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// // //     if (!emailRegex.test(email)) {
// // //       setValidationError('Please enter a valid email');
// // //       return false;
// // //     }

// // //     if (!password) {
// // //       setValidationError('Please enter a password');
// // //       return false;
// // //     }

// // //     if (password.length < 6) {
// // //       setValidationError('Password must be at least 6 characters');
// // //       return false;
// // //     }

// // //     if (password !== confirmPassword) {
// // //       setValidationError('Passwords do not match');
// // //       return false;
// // //     }

// // //     setValidationError('');
// // //     return true;
// // //   };

// // //   const handleRegister = () => {
// // //     if (!validateForm()) {
// // //       return;
// // //     }

// // //     console.log('Register pressed');
// // //     dispatch(clearRegistrationData());

// // //     const registrationPayload = {
// // //       name: name.trim(),
// // //       email: email.trim().toLowerCase(),
// // //       password: password,
// // //     };

// // //     dispatch(setRegistrationRequest(registrationPayload));
// // //   };

// // //   const handleLogin = () => {
// // //     console.log('Login pressed');
// // //     if (onLoginPress) {
// // //       onLoginPress();
// // //     }
// // //   };

// // //   const handleGuestContinue = () => {
// // //     console.log('Continue as Guest pressed');
// // //     if (onGuestContinue) {
// // //       onGuestContinue();
// // //     }
// // //   };

// // //   const handleSocialLogin = (provider: string) => {
// // //     console.log(`${provider} sign up pressed`);
// // //   };

// // //   const togglePasswordVisibility = () => {
// // //     setShowPassword(!showPassword);
// // //   };

// // //   const toggleConfirmPasswordVisibility = () => {
// // //     setShowConfirmPassword(!showConfirmPassword);
// // //   };

// // //   return (
// // //     <SafeAreaView style={styles.container}>
// // //       <KeyboardAvoidingView
// // //         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
// // //         style={styles.keyboardAvoid}
// // //       >
// // //         <ScrollView
// // //           contentContainerStyle={styles.scrollContainer}
// // //           showsVerticalScrollIndicator={false}
// // //         >
// // //           {/* Header */}
// // //           <View style={styles.header}>
// // //             <Text style={styles.title}>Sign Up to Darkak Mart</Text>
// // //             <Text style={styles.subtitle}>
// // //               Sign Up using social network
// // //             </Text>
// // //           </View>

// // //           {/* Social Login Buttons */}
// // //           <View style={styles.socialContainer}>
// // //             {/* Google Login - Red Background */}
// // //             <TouchableOpacity
// // //               style={[styles.socialButton, styles.googleButton]}
// // //               onPress={() => handleSocialLogin('Google')}
// // //               disabled={loading}
// // //             >
// // //               <View style={styles.socialButtonContent}>
// // //                 <View style={styles.iconContainer}>
// // //                   <FontAwesome5 name="google" size={20} color="#fff" />
// // //                 </View>
// // //                 <View style={styles.verticalDivider} />
// // //                 <View style={styles.textContainer}>
// // //                   <Text style={styles.socialButtonText}>LOGIN WITH GOOGLE</Text>
// // //                 </View>
// // //               </View>
// // //             </TouchableOpacity>

// // //             {/* Facebook Login - Blue Background */}
// // //             <TouchableOpacity
// // //               style={[styles.socialButton, styles.facebookButton]}
// // //               onPress={() => handleSocialLogin('Facebook')}
// // //               disabled={loading}
// // //             >
// // //               <View style={styles.socialButtonContent}>
// // //                 <View style={styles.iconContainer}>
// // //                   <FontAwesome5 name="facebook" size={20} color="#fff" />
// // //                 </View>
// // //                 <View style={styles.verticalDivider} />
// // //                 <View style={styles.textContainer}>
// // //                   <Text style={styles.socialButtonText}>LOGIN WITH FACEBOOK</Text>
// // //                 </View>
// // //               </View>
// // //             </TouchableOpacity>

// // //             {/* Phone Login - Light Green Background */}
// // //             <TouchableOpacity
// // //               style={[styles.socialButton, styles.phoneButton]}
// // //               onPress={() => handleSocialLogin('Phone')}
// // //               disabled={loading}
// // //             >
// // //               <View style={styles.socialButtonContent}>
// // //                 <View style={styles.iconContainer}>
// // //                   <MaterialIcons name="phone-android" size={20} color="#fff" />
// // //                 </View>
// // //                 <View style={styles.verticalDivider} />
// // //                 <View style={styles.textContainer}>
// // //                   <Text style={styles.socialButtonText}>LOGIN WITH PHONE</Text>
// // //                 </View>
// // //               </View>
// // //             </TouchableOpacity>
// // //           </View>

// // //           {/* OR Divider */}
// // //           <View style={styles.dividerContainer}>
// // //             <View style={styles.dividerLine} />
// // //             <Text style={styles.dividerText}>OR</Text>
// // //             <View style={styles.dividerLine} />
// // //           </View>

// // //           {/* Error Display */}
// // //           {validationError && (
// // //             <View style={styles.errorContainer}>
// // //               <Ionicons name="alert-circle" size={20} color="#c33" style={styles.errorIcon} />
// // //               <Text style={styles.errorText}>{validationError}</Text>
// // //             </View>
// // //           )}

// // //           {/* Form Inputs */}
// // //           <View style={styles.formContainer}>
// // //             <TextInput
// // //               style={[styles.input, validationError && !name && styles.inputError]}
// // //               placeholder="Full Name"
// // //               placeholderTextColor="#999"
// // //               autoCapitalize="words"
// // //               value={name}
// // //               onChangeText={(text) => {
// // //                 setName(text);
// // //                 setValidationError('');
// // //               }}
// // //               editable={!loading}
// // //             />

// // //             <TextInput
// // //               style={[styles.input, validationError && !email && styles.inputError]}
// // //               placeholder="Email"
// // //               placeholderTextColor="#999"
// // //               keyboardType="email-address"
// // //               autoCapitalize="none"
// // //               value={email}
// // //               onChangeText={(text) => {
// // //                 setEmail(text);
// // //                 setValidationError('');
// // //               }}
// // //               editable={!loading}
// // //             />

// // //             <View style={styles.passwordContainer}>
// // //               <TextInput
// // //                 style={[styles.passwordInput, validationError && !password && styles.inputError]}
// // //                 placeholder="Enter Password"
// // //                 placeholderTextColor="#999"
// // //                 secureTextEntry={!showPassword}
// // //                 value={password}
// // //                 onChangeText={(text) => {
// // //                   setPassword(text);
// // //                   setValidationError('');
// // //                 }}
// // //                 editable={!loading}
// // //               />
// // //               <TouchableOpacity
// // //                 style={styles.eyeButton}
// // //                 onPress={togglePasswordVisibility}
// // //                 disabled={loading}
// // //               >
// // //                 <Ionicons
// // //                   name={showPassword ? "eye-off" : "eye"}
// // //                   size={24}
// // //                   color="#666"
// // //                 />
// // //               </TouchableOpacity>
// // //             </View>

// // //             <View style={styles.passwordContainer}>
// // //               <TextInput
// // //                 style={[styles.passwordInput, validationError && password !== confirmPassword && styles.inputError]}
// // //                 placeholder="Confirm Password"
// // //                 placeholderTextColor="#999"
// // //                 secureTextEntry={!showConfirmPassword}
// // //                 value={confirmPassword}
// // //                 onChangeText={(text) => {
// // //                   setConfirmPassword(text);
// // //                   setValidationError('');
// // //                 }}
// // //                 editable={!loading}
// // //               />
// // //               <TouchableOpacity
// // //                 style={styles.eyeButton}
// // //                 onPress={toggleConfirmPasswordVisibility}
// // //                 disabled={loading}
// // //               >
// // //                 <Ionicons
// // //                   name={showConfirmPassword ? "eye-off" : "eye"}
// // //                   size={24}
// // //                   color="#666"
// // //                 />
// // //               </TouchableOpacity>
// // //             </View>

// // //             {/* Sign Up Button - Navy Blue */}
// // //             <TouchableOpacity
// // //               style={[styles.signUpButton, loading && styles.signUpButtonDisabled]}
// // //               onPress={handleRegister}
// // //               disabled={loading}
// // //               activeOpacity={0.8}
// // //             >
// // //               {loading ? (
// // //                 <View style={styles.loadingContainer}>
// // //                   <ActivityIndicator color="#fff" size="small" />
// // //                   <Text style={[styles.signUpButtonText, styles.loadingText]}>Signing Up...</Text>
// // //                 </View>
// // //               ) : (
// // //                 <Text style={styles.signUpButtonText}>Sign Up</Text>
// // //               )}
// // //             </TouchableOpacity>
// // //           </View>

// // //           {/* Login Section */}
// // //           <View style={styles.loginContainer}>
// // //             <Text style={styles.loginText}>
// // //               Already have an account?{' '}
// // //             </Text>
// // //             <TouchableOpacity onPress={handleLogin} disabled={loading}>
// // //               <Text style={[styles.loginButton, loading && styles.disabledText]}>Log In</Text>
// // //             </TouchableOpacity>
// // //           </View>

// // //           {/* OR Divider */}
// // //           <View style={styles.dividerContainer}>
// // //             <View style={styles.dividerLine} />
// // //             <Text style={styles.dividerText}>OR</Text>
// // //             <View style={styles.dividerLine} />
// // //           </View>

// // //           {/* Guest Continue Option */}
// // //           <View style={styles.optionsContainer}>
// // //             <TouchableOpacity
// // //               style={styles.textButton}
// // //               onPress={handleGuestContinue}
// // //               disabled={loading}
// // //             >
// // //               <Text style={[styles.textButtonText, loading && styles.disabledText]}>
// // //                 Continue as a Guest
// // //               </Text>
// // //             </TouchableOpacity>
// // //           </View>
// // //         </ScrollView>
// // //       </KeyboardAvoidingView>
// // //     </SafeAreaView>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     flex: 1,
// // //     backgroundColor: '#fff',
// // //   },
// // //   keyboardAvoid: {
// // //     flex: 1,
// // //   },
// // //   scrollContainer: {
// // //     flexGrow: 1,
// // //     paddingHorizontal: 24,
// // //     paddingVertical: 32,
// // //   },
// // //   header: {
// // //     alignItems: 'center',
// // //     marginBottom: 40,
// // //   },
// // //   title: {
// // //     fontSize: 28,
// // //     fontWeight: 'bold',
// // //     color: '#333',
// // //     marginBottom: 8,
// // //     textAlign: 'center',
// // //   },
// // //   subtitle: {
// // //     fontSize: 16,
// // //     color: '#666',
// // //     textAlign: 'center',
// // //   },
// // //   socialContainer: {
// // //     marginBottom: 24,
// // //   },
// // //   socialButton: {
// // //     borderRadius: 8,
// // //     marginBottom: 12,
// // //     height: 50,
// // //     overflow: 'hidden',
// // //   },
// // //   socialButtonContent: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     flex: 1,
// // //   },
// // //   iconContainer: {
// // //     width: 60,
// // //     height: '100%',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //     backgroundColor: 'rgba(0,0,0,0.1)',
// // //   },
// // //   textContainer: {
// // //     flex: 1,
// // //     height: '100%',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   verticalDivider: {
// // //     width: 2,
// // //     height: '100%',
// // //     backgroundColor: '#ffffff',
// // //   },
// // //   socialButtonText: {
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     color: '#fff',
// // //   },
// // //   googleButton: {
// // //     backgroundColor: '#DB4437',
// // //   },
// // //   facebookButton: {
// // //     backgroundColor: '#4267B2',
// // //   },
// // //   phoneButton: {
// // //     backgroundColor: '#25D366',
// // //   },
// // //   dividerContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     marginVertical: 24,
// // //   },
// // //   dividerLine: {
// // //     flex: 1,
// // //     height: 1,
// // //     backgroundColor: '#dee2e6',
// // //   },
// // //   dividerText: {
// // //     marginHorizontal: 16,
// // //     color: '#666',
// // //     fontWeight: '600',
// // //   },
// // //   errorContainer: {
// // //     backgroundColor: '#fee',
// // //     borderRadius: 8,
// // //     padding: 12,
// // //     marginBottom: 16,
// // //     borderWidth: 1,
// // //     borderColor: '#fcc',
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //   },
// // //   errorIcon: {
// // //     marginRight: 8,
// // //   },
// // //   errorText: {
// // //     color: '#c33',
// // //     fontSize: 14,
// // //     flex: 1,
// // //   },
// // //   formContainer: {
// // //     marginBottom: 24,
// // //   },
// // //   input: {
// // //     backgroundColor: '#f8f9fa',
// // //     borderWidth: 1,
// // //     borderColor: '#dee2e6',
// // //     borderRadius: 8,
// // //     paddingVertical: 16,
// // //     paddingHorizontal: 16,
// // //     fontSize: 16,
// // //     marginBottom: 16,
// // //   },
// // //   inputError: {
// // //     borderColor: '#c33',
// // //     borderWidth: 1.5,
// // //   },
// // //   passwordContainer: {
// // //     position: 'relative',
// // //     marginBottom: 16,
// // //   },
// // //   passwordInput: {
// // //     backgroundColor: '#f8f9fa',
// // //     borderWidth: 1,
// // //     borderColor: '#dee2e6',
// // //     borderRadius: 8,
// // //     paddingVertical: 16,
// // //     paddingHorizontal: 16,
// // //     fontSize: 16,
// // //     paddingRight: 50,
// // //   },
// // //   eyeButton: {
// // //     position: 'absolute',
// // //     right: 16,
// // //     top: 16,
// // //     padding: 4,
// // //   },
// // //   signUpButton: {
// // //     backgroundColor: '#003366',
// // //     paddingVertical: 16,
// // //     borderRadius: 8,
// // //     alignItems: 'center',
// // //     marginTop: 8,
// // //   },
// // //   signUpButtonDisabled: {
// // //     opacity: 0.6,
// // //   },
// // //   signUpButtonText: {
// // //     color: '#fff',
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // //   loadingContainer: {
// // //     flexDirection: 'row',
// // //     alignItems: 'center',
// // //     justifyContent: 'center',
// // //   },
// // //   loadingText: {
// // //     marginLeft: 10,
// // //   },
// // //   loginContainer: {
// // //     alignItems: 'center',
// // //     marginBottom: 24,
// // //     flexDirection: 'row',
// // //     justifyContent: 'center',
// // //   },
// // //   loginText: {
// // //     fontSize: 14,
// // //     color: '#666',
// // //   },
// // //   loginButton: {
// // //     color: '#007bff',
// // //     fontWeight: 'bold',
// // //     fontSize: 14,
// // //   },
// // //   disabledText: {
// // //     opacity: 0.5,
// // //   },
// // //   optionsContainer: {
// // //     alignItems: 'center',
// // //   },
// // //   textButton: {
// // //     paddingVertical: 8,
// // //   },
// // //   textButtonText: {
// // //     color: '#007bff',
// // //     fontSize: 16,
// // //     fontWeight: '600',
// // //     textDecorationLine: 'underline',
// // //   },
// // // });

// // // export default RegisterScreen;

// // import {
// //   clearRegistrationData,
// //   setRegistrationRequest,
// // } from "@/redux/actions/registration.action";
// // import { RootState } from "@/redux/store";
// // import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
// // import React, { useEffect, useState } from "react";
// // import {
// //   ActivityIndicator,
// //   KeyboardAvoidingView,
// //   Platform,
// //   ScrollView,
// //   StyleSheet,
// //   Text,
// //   TextInput,
// //   TouchableOpacity,
// //   View,
// // } from "react-native";
// // import { SafeAreaView } from "react-native-safe-area-context";
// // import { useDispatch, useSelector } from "react-redux";

// // // Props interface
// // interface RegisterScreenProps {
// //   onRegisterSuccess?: () => void;
// //   onLoginPress?: () => void;
// //   onGuestContinue?: () => void;
// // }

// // const RegisterScreen: React.FC<RegisterScreenProps> = ({
// //   onRegisterSuccess,
// //   onLoginPress,
// //   onGuestContinue,
// // }) => {
// //   const dispatch = useDispatch();
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [password, setPassword] = useState("");
// //   const [confirmPassword, setConfirmPassword] = useState("");
// //   const [name, setName] = useState("");
// //   const [email, setEmail] = useState("");
// //   const [validationError, setValidationError] = useState("");

// //   const { registrationData, loading, error } = useSelector(
// //     (state: RootState) => state?.registrationUser
// //   );

// //   useEffect(() => {
// //     if (registrationData?.statusCode === 200 && registrationData?.data) {
// //       console.log("Registration successful, calling onRegisterSuccess");

// //       setName("");
// //       setEmail("");
// //       setPassword("");
// //       setConfirmPassword("");
// //       setValidationError("");
// //       if (onRegisterSuccess) {
// //         onRegisterSuccess();
// //       }
// //     }
// //   }, [registrationData, onRegisterSuccess]);

// //   useEffect(() => {
// //     if (error) {
// //       setValidationError(error);
// //     }
// //   }, [error]);

// //   const validateForm = () => {
// //     if (!name.trim()) {
// //       setValidationError("Please enter your name");
// //       return false;
// //     }

// //     if (!email.trim()) {
// //       setValidationError("Please enter your email");
// //       return false;
// //     }

// //     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// //     if (!emailRegex.test(email)) {
// //       setValidationError("Please enter a valid email");
// //       return false;
// //     }

// //     if (!password) {
// //       setValidationError("Please enter a password");
// //       return false;
// //     }

// //     if (password.length < 6) {
// //       setValidationError("Password must be at least 6 characters");
// //       return false;
// //     }

// //     if (password !== confirmPassword) {
// //       setValidationError("Passwords do not match");
// //       return false;
// //     }

// //     setValidationError("");
// //     return true;
// //   };

// //   const handleRegister = () => {
// //     if (!validateForm()) {
// //       return;
// //     }

// //     console.log("Register pressed");
// //     dispatch(clearRegistrationData());

// //     const registrationPayload = {
// //       name: name.trim(),
// //       email: email.trim().toLowerCase(),
// //       password: password,
// //     };

// //     dispatch(setRegistrationRequest(registrationPayload));
// //   };

// //   const handleLogin = () => {
// //     console.log("Login pressed");
// //     if (onLoginPress) {
// //       onLoginPress();
// //     }
// //   };

// //   const handleGuestContinue = () => {
// //     console.log("Continue as Guest pressed");
// //     if (onGuestContinue) {
// //       onGuestContinue();
// //     }
// //   };

// //   const handleSocialLogin = (provider: string) => {
// //     console.log(`${provider} sign up pressed`);
// //   };

// //   const togglePasswordVisibility = () => {
// //     setShowPassword(!showPassword);
// //   };

// //   const toggleConfirmPasswordVisibility = () => {
// //     setShowConfirmPassword(!showConfirmPassword);
// //   };

// //   return (
// //     <SafeAreaView style={styles.container}>
// //       <KeyboardAvoidingView
// //         behavior={Platform.OS === "ios" ? "padding" : "height"}
// //         style={styles.keyboardAvoid}
// //       >
// //         <ScrollView
// //           contentContainerStyle={styles.scrollContainer}
// //           showsVerticalScrollIndicator={false}
// //         >
// //           {/* Header */}
// //           <View style={styles.header}>
// //             <Text style={styles.title}>Sign Up to Darkak Mart</Text>
// //             <Text style={styles.subtitle}>Sign Up using social network</Text>
// //           </View>

// //           {/* Social Login Buttons */}
// //           <View style={styles.socialContainer}>
// //             {/* Google Login - Red Background */}
// //             <TouchableOpacity
// //               style={[styles.socialButton, styles.googleButton]}
// //               onPress={() => handleSocialLogin("Google")}
// //               disabled={loading}
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
// //               onPress={() => handleSocialLogin("Facebook")}
// //               disabled={loading}
// //             >
// //               <View style={styles.socialButtonContent}>
// //                 <View style={styles.iconContainer}>
// //                   <FontAwesome5 name="facebook" size={20} color="#fff" />
// //                 </View>
// //                 <View style={styles.verticalDivider} />
// //                 <View style={styles.textContainer}>
// //                   <Text style={styles.socialButtonText}>
// //                     LOGIN WITH FACEBOOK
// //                   </Text>
// //                 </View>
// //               </View>
// //             </TouchableOpacity>

// //             {/* Phone Login - Light Green Background */}
// //             <TouchableOpacity
// //               style={[styles.socialButton, styles.phoneButton]}
// //               onPress={() => handleSocialLogin("Phone")}
// //               disabled={loading}
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

// //           {/* ✅ Error Display */}
// //           {validationError && (
// //             <View style={styles.errorContainer}>
// //               <Ionicons
// //                 name="alert-circle"
// //                 size={20}
// //                 color="#c33"
// //                 style={styles.errorIcon}
// //               />
// //               <Text style={styles.errorText}>{validationError}</Text>
// //             </View>
// //           )}

// //           {/* Form Inputs */}
// //           <View style={styles.formContainer}>
// //             <TextInput
// //               style={[
// //                 styles.input,
// //                 validationError && !name && styles.inputError,
// //               ]}
// //               placeholder="Full Name"
// //               placeholderTextColor="#999"
// //               autoCapitalize="words"
// //               value={name}
// //               onChangeText={(text) => {
// //                 setName(text);
// //                 setValidationError("");
// //               }}
// //               editable={!loading}
// //             />

// //             <TextInput
// //               style={[
// //                 styles.input,
// //                 validationError && !email && styles.inputError,
// //               ]}
// //               placeholder="Email"
// //               placeholderTextColor="#999"
// //               keyboardType="email-address"
// //               autoCapitalize="none"
// //               value={email}
// //               onChangeText={(text) => {
// //                 setEmail(text);
// //                 setValidationError("");
// //               }}
// //               editable={!loading}
// //             />

// //             <View style={styles.passwordContainer}>
// //               <TextInput
// //                 style={[
// //                   styles.passwordInput,
// //                   validationError && !password && styles.inputError,
// //                 ]}
// //                 placeholder="Enter Password"
// //                 placeholderTextColor="#999"
// //                 secureTextEntry={!showPassword}
// //                 value={password}
// //                 onChangeText={(text) => {
// //                   setPassword(text);
// //                   setValidationError("");
// //                 }}
// //                 editable={!loading}
// //               />
// //               <TouchableOpacity
// //                 style={styles.eyeButton}
// //                 onPress={togglePasswordVisibility}
// //                 disabled={loading}
// //               >
// //                 <Ionicons
// //                   name={showPassword ? "eye-off" : "eye"}
// //                   size={24}
// //                   color="#666"
// //                 />
// //               </TouchableOpacity>
// //             </View>

// //             <View style={styles.passwordContainer}>
// //               <TextInput
// //                 style={[
// //                   styles.passwordInput,
// //                   validationError &&
// //                     password !== confirmPassword &&
// //                     styles.inputError,
// //                 ]}
// //                 placeholder="Confirm Password"
// //                 placeholderTextColor="#999"
// //                 secureTextEntry={!showConfirmPassword}
// //                 value={confirmPassword}
// //                 onChangeText={(text) => {
// //                   setConfirmPassword(text);
// //                   setValidationError("");
// //                 }}
// //                 editable={!loading}
// //               />
// //               <TouchableOpacity
// //                 style={styles.eyeButton}
// //                 onPress={toggleConfirmPasswordVisibility}
// //                 disabled={loading}
// //               >
// //                 <Ionicons
// //                   name={showConfirmPassword ? "eye-off" : "eye"}
// //                   size={24}
// //                   color="#666"
// //                 />
// //               </TouchableOpacity>
// //             </View>

// //             {/* ✅ Sign Up Button with Loading State */}
// //             <TouchableOpacity
// //               style={[
// //                 styles.signUpButton,
// //                 loading && styles.signUpButtonDisabled,
// //               ]}
// //               onPress={handleRegister}
// //               disabled={loading}
// //               activeOpacity={0.8}
// //             >
// //               {loading ? (
// //                 <View style={styles.loadingContainer}>
// //                   <ActivityIndicator color="#fff" size="small" />
// //                   <Text style={[styles.signUpButtonText, styles.loadingText]}>
// //                     Signing Up...
// //                   </Text>
// //                 </View>
// //               ) : (
// //                 <Text style={styles.signUpButtonText}>Sign Up</Text>
// //               )}
// //             </TouchableOpacity>
// //           </View>

// //           {/* Login Section */}
// //           <View style={styles.loginContainer}>
// //             <Text style={styles.loginText}>Already have an account? </Text>
// //             <TouchableOpacity onPress={handleLogin} disabled={loading}>
// //               <Text
// //                 style={[styles.loginButton, loading && styles.disabledText]}
// //               >
// //                 Log In
// //               </Text>
// //             </TouchableOpacity>
// //           </View>

// //           {/* OR Divider */}
// //           <View style={styles.dividerContainer}>
// //             <View style={styles.dividerLine} />
// //             <Text style={styles.dividerText}>OR</Text>
// //             <View style={styles.dividerLine} />
// //           </View>

// //           {/* Guest Continue Option */}
// //           <View style={styles.optionsContainer}>
// //             <TouchableOpacity
// //               style={styles.textButton}
// //               onPress={handleGuestContinue}
// //               disabled={loading}
// //             >
// //               <Text
// //                 style={[styles.textButtonText, loading && styles.disabledText]}
// //               >
// //                 Continue as a Guest
// //               </Text>
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
// //     backgroundColor: "#fff",
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
// //     alignItems: "center",
// //     marginBottom: 40,
// //   },
// //   title: {
// //     fontSize: 28,
// //     fontWeight: "bold",
// //     color: "#333",
// //     marginBottom: 8,
// //     textAlign: "center",
// //   },
// //   subtitle: {
// //     fontSize: 16,
// //     color: "#666",
// //     textAlign: "center",
// //   },
// //   socialContainer: {
// //     marginBottom: 24,
// //   },
// //   socialButton: {
// //     borderRadius: 8,
// //     marginBottom: 12,
// //     height: 50,
// //     overflow: "hidden",
// //   },
// //   socialButtonContent: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     flex: 1,
// //   },
// //   iconContainer: {
// //     width: 60,
// //     height: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //     backgroundColor: "rgba(0,0,0,0.1)",
// //   },
// //   textContainer: {
// //     flex: 1,
// //     height: "100%",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   verticalDivider: {
// //     width: 2,
// //     height: "100%",
// //     backgroundColor: "#ffffff",
// //   },
// //   socialButtonText: {
// //     fontSize: 16,
// //     fontWeight: "600",
// //     color: "#fff",
// //   },
// //   googleButton: {
// //     backgroundColor: "#DB4437",
// //   },
// //   facebookButton: {
// //     backgroundColor: "#4267B2",
// //   },
// //   phoneButton: {
// //     backgroundColor: "#25D366",
// //   },
// //   dividerContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     marginVertical: 24,
// //   },
// //   dividerLine: {
// //     flex: 1,
// //     height: 1,
// //     backgroundColor: "#dee2e6",
// //   },
// //   dividerText: {
// //     marginHorizontal: 16,
// //     color: "#666",
// //     fontWeight: "600",
// //   },
// //   errorContainer: {
// //     backgroundColor: "#fee",
// //     borderRadius: 8,
// //     padding: 12,
// //     marginBottom: 16,
// //     borderWidth: 1,
// //     borderColor: "#fcc",
// //     flexDirection: "row",
// //     alignItems: "center",
// //   },
// //   errorIcon: {
// //     marginRight: 8,
// //   },
// //   errorText: {
// //     color: "#c33",
// //     fontSize: 14,
// //     flex: 1,
// //   },
// //   formContainer: {
// //     marginBottom: 24,
// //   },
// //   input: {
// //     backgroundColor: "#f8f9fa",
// //     borderWidth: 1,
// //     borderColor: "#dee2e6",
// //     borderRadius: 8,
// //     paddingVertical: 16,
// //     paddingHorizontal: 16,
// //     fontSize: 16,
// //     marginBottom: 16,
// //   },
// //   inputError: {
// //     borderColor: "#c33",
// //     borderWidth: 1.5,
// //   },
// //   passwordContainer: {
// //     position: "relative",
// //     marginBottom: 16,
// //   },
// //   passwordInput: {
// //     backgroundColor: "#f8f9fa",
// //     borderWidth: 1,
// //     borderColor: "#dee2e6",
// //     borderRadius: 8,
// //     paddingVertical: 16,
// //     paddingHorizontal: 16,
// //     fontSize: 16,
// //     paddingRight: 50,
// //   },
// //   eyeButton: {
// //     position: "absolute",
// //     right: 16,
// //     top: 16,
// //     padding: 4,
// //   },
// //   signUpButton: {
// //     backgroundColor: "#003366",
// //     paddingVertical: 16,
// //     borderRadius: 8,
// //     alignItems: "center",
// //     marginTop: 8,
// //   },
// //   signUpButtonDisabled: {
// //     opacity: 0.6,
// //   },
// //   signUpButtonText: {
// //     color: "#fff",
// //     fontSize: 16,
// //     fontWeight: "bold",
// //   },
// //   loadingContainer: {
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "center",
// //   },
// //   loadingText: {
// //     marginLeft: 10,
// //   },
// //   loginContainer: {
// //     alignItems: "center",
// //     marginBottom: 24,
// //     flexDirection: "row",
// //     justifyContent: "center",
// //   },
// //   loginText: {
// //     fontSize: 14,
// //     color: "#666",
// //   },
// //   loginButton: {
// //     color: "#007bff",
// //     fontWeight: "bold",
// //     fontSize: 14,
// //   },
// //   disabledText: {
// //     opacity: 0.5,
// //   },
// //   optionsContainer: {
// //     alignItems: "center",
// //   },
// //   textButton: {
// //     paddingVertical: 8,
// //   },
// //   textButtonText: {
// //     color: "#007bff",
// //     fontSize: 16,
// //     fontWeight: "600",
// //     textDecorationLine: "underline",
// //   },
// // });

// // export default RegisterScreen;




// import {
//   clearRegistrationData,
//   setRegistrationRequest,
// } from "@/redux/actions/registration.action";
// import { RootState } from "@/redux/store";
// import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
// import React, { useEffect, useState } from "react";
// import {
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   StyleSheet,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useDispatch, useSelector } from "react-redux";

// // Props interface
// interface RegisterScreenProps {
//   onRegisterSuccess?: () => void;
//   onRegisterSuccessWithOtp?: (email: string) => void;
//   onLoginPress?: () => void;
//   onGuestContinue?: () => void;
// }

// const RegisterScreen: React.FC<RegisterScreenProps> = ({
//   onRegisterSuccess,
//   onRegisterSuccessWithOtp,
//   onLoginPress,
//   onGuestContinue,
// }) => {
//   const dispatch = useDispatch();
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [validationError, setValidationError] = useState("");

//   const { registrationData, loading, error } = useSelector(
//     (state: RootState) => state?.registrationUser
//   );

//   useEffect(() => {
//     if (registrationData?.statusCode === 200 && registrationData?.data) {
//       console.log("Registration successful, calling onRegisterSuccessWithOtp");

//       if (onRegisterSuccessWithOtp) {
//         console.log("Calling onRegisterSuccessWithOtp with email:", email);
//         onRegisterSuccessWithOtp(email.trim().toLowerCase());
//       } else if (onRegisterSuccess) {
//         onRegisterSuccess();
//         setName("");
//         setEmail("");
//         setPassword("");
//         setConfirmPassword("");
//         setValidationError("");
//       }
//     }
//   }, [registrationData, onRegisterSuccess, onRegisterSuccessWithOtp, email]);

//   useEffect(() => {
//     if (error) {
//       setValidationError(error);
//     }
//   }, [error]);

//   const validateForm = () => {
//     if (!name.trim()) {
//       setValidationError("Please enter your name");
//       return false;
//     }

//     if (!email.trim()) {
//       setValidationError("Please enter your email");
//       return false;
//     }

//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setValidationError("Please enter a valid email");
//       return false;
//     }

//     if (!password) {
//       setValidationError("Please enter a password");
//       return false;
//     }

//     if (password.length < 6) {
//       setValidationError("Password must be at least 6 characters");
//       return false;
//     }

//     if (password !== confirmPassword) {
//       setValidationError("Passwords do not match");
//       return false;
//     }

//     setValidationError("");
//     return true;
//   };

//   // const handleRegister = () => {
//   //   if (!validateForm()) {
//   //     return;
//   //   }

//   //   console.log("Register pressed with email:", email);
//   //   dispatch(clearRegistrationData());

//   //   const registrationPayload = {
//   //     name: name.trim(),
//   //     email: email.trim().toLowerCase(),
//   //     password: password,
//   //   };

//   //   console.log("Dispatching registration request");
//   //   dispatch(setRegistrationRequest(registrationPayload));
//   // };

  
//   const handleRegister = () => {
//   if (!validateForm()) {
//     return;
//   }

//   console.log("Register pressed with email:", email);

//   dispatch(clearRegistrationData());

//   const registrationPayload = {
//     name: name.trim(),
//     email: email.trim().toLowerCase(),
//     password: password,
//   };

//   console.log("Dispatching registration request");
//   dispatch(setRegistrationRequest(registrationPayload));

//   if (onRegisterSuccessWithOtp) {
//     onRegisterSuccessWithOtp(email.trim().toLowerCase());
//   }
// };
//   const handleLogin = () => {
//     console.log("Login pressed");
//     if (onLoginPress) {
//       onLoginPress();
//     }
//   };

//   const handleGuestContinue = () => {
//     console.log("Continue as Guest pressed");
//     if (onGuestContinue) {
//       onGuestContinue();
//     }
//   };

//   const handleSocialLogin = (provider: string) => {
//     console.log(`${provider} sign up pressed`);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword);
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === "ios" ? "padding" : "height"}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView
//           contentContainerStyle={styles.scrollContainer}
//           showsVerticalScrollIndicator={false}
//         >
//           {/* Header */}
//           <View style={styles.header}>
//             <Text style={styles.title}>Sign Up to Darkak Mart</Text>
//             <Text style={styles.subtitle}>Sign Up using social network</Text>
//           </View>

//           {/* Social Login Buttons */}
//           <View style={styles.socialContainer}>
//             <TouchableOpacity
//               style={[styles.socialButton, styles.googleButton]}
//               onPress={() => handleSocialLogin("Google")}
//               disabled={loading}
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

//             <TouchableOpacity
//               style={[styles.socialButton, styles.facebookButton]}
//               onPress={() => handleSocialLogin("Facebook")}
//               disabled={loading}
//             >
//               <View style={styles.socialButtonContent}>
//                 <View style={styles.iconContainer}>
//                   <FontAwesome5 name="facebook" size={20} color="#fff" />
//                 </View>
//                 <View style={styles.verticalDivider} />
//                 <View style={styles.textContainer}>
//                   <Text style={styles.socialButtonText}>
//                     LOGIN WITH FACEBOOK
//                   </Text>
//                 </View>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={[styles.socialButton, styles.phoneButton]}
//               onPress={() => handleSocialLogin("Phone")}
//               disabled={loading}
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

//           {/* Error Display */}
//           {validationError && (
//             <View style={styles.errorContainer}>
//               <Ionicons
//                 name="alert-circle"
//                 size={20}
//                 color="#c33"
//                 style={styles.errorIcon}
//               />
//               <Text style={styles.errorText}>{validationError}</Text>
//             </View>
//           )}

//           {/* Form Inputs */}
//           <View style={styles.formContainer}>
//             <TextInput
//               style={[
//                 styles.input,
//                 validationError && !name && styles.inputError,
//               ]}
//               placeholder="Full Name"
//               placeholderTextColor="#999"
//               autoCapitalize="words"
//               value={name}
//               onChangeText={(text) => {
//                 setName(text);
//                 setValidationError("");
//               }}
//               editable={!loading}
//             />

//             <TextInput
//               style={[
//                 styles.input,
//                 validationError && !email && styles.inputError,
//               ]}
//               placeholder="Email"
//               placeholderTextColor="#999"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={email}
//               onChangeText={(text) => {
//                 setEmail(text);
//                 setValidationError("");
//               }}
//               editable={!loading}
//             />

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={[
//                   styles.passwordInput,
//                   validationError && !password && styles.inputError,
//                 ]}
//                 placeholder="Enter Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showPassword}
//                 value={password}
//                 onChangeText={(text) => {
//                   setPassword(text);
//                   setValidationError("");
//                 }}
//                 editable={!loading}
//               />
//               <TouchableOpacity
//                 style={styles.eyeButton}
//                 onPress={togglePasswordVisibility}
//                 disabled={loading}
//               >
//                 <Ionicons
//                   name={showPassword ? "eye-off" : "eye"}
//                   size={24}
//                   color="#666"
//                 />
//               </TouchableOpacity>
//             </View>

//             <View style={styles.passwordContainer}>
//               <TextInput
//                 style={[
//                   styles.passwordInput,
//                   validationError &&
//                     password !== confirmPassword &&
//                     styles.inputError,
//                 ]}
//                 placeholder="Confirm Password"
//                 placeholderTextColor="#999"
//                 secureTextEntry={!showConfirmPassword}
//                 value={confirmPassword}
//                 onChangeText={(text) => {
//                   setConfirmPassword(text);
//                   setValidationError("");
//                 }}
//                 editable={!loading}
//               />
//               <TouchableOpacity
//                 style={styles.eyeButton}
//                 onPress={toggleConfirmPasswordVisibility}
//                 disabled={loading}
//               >
//                 <Ionicons
//                   name={showConfirmPassword ? "eye-off" : "eye"}
//                   size={24}
//                   color="#666"
//                 />
//               </TouchableOpacity>
//             </View>

//             {/* Sign Up Button */}
//             <TouchableOpacity
//               style={[
//                 styles.signUpButton,
//                 loading && styles.signUpButtonDisabled,
//               ]}
//               onPress={handleRegister}
//               disabled={loading}
//               activeOpacity={0.8}
//             >
//               {loading ? (
//                 <View style={styles.loadingContainer}>
//                   <ActivityIndicator color="#fff" size="small" />
//                   <Text style={[styles.signUpButtonText, styles.loadingText]}>
//                     Signing Up...
//                   </Text>
//                 </View>
//               ) : (
//                 <Text style={styles.signUpButtonText}>Sign Up</Text>
//               )}
//             </TouchableOpacity>
//           </View>

//           {/* Login Section */}
//           <View style={styles.loginContainer}>
//             <Text style={styles.loginText}>Already have an account? </Text>
//             <TouchableOpacity onPress={handleLogin} disabled={loading}>
//               <Text
//                 style={[styles.loginButton, loading && styles.disabledText]}
//               >
//                 Log In
//               </Text>
//             </TouchableOpacity>
//           </View>

//           {/* OR Divider */}
//           <View style={styles.dividerContainer}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.dividerLine} />
//           </View>

//           {/* Guest Continue Option */}
//           <View style={styles.optionsContainer}>
//             <TouchableOpacity
//               style={styles.textButton}
//               onPress={handleGuestContinue}
//               disabled={loading}
//             >
//               <Text
//                 style={[styles.textButtonText, loading && styles.disabledText]}
//               >
//                 Continue as a Guest
//               </Text>
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
//     backgroundColor: "#fff",
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
//     alignItems: "center",
//     marginBottom: 40,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: "bold",
//     color: "#333",
//     marginBottom: 8,
//     textAlign: "center",
//   },
//   subtitle: {
//     fontSize: 16,
//     color: "#666",
//     textAlign: "center",
//   },
//   socialContainer: {
//     marginBottom: 24,
//   },
//   socialButton: {
//     borderRadius: 8,
//     marginBottom: 12,
//     height: 50,
//     overflow: "hidden",
//   },
//   socialButtonContent: {
//     flexDirection: "row",
//     alignItems: "center",
//     flex: 1,
//   },
//   iconContainer: {
//     width: 60,
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "rgba(0,0,0,0.1)",
//   },
//   textContainer: {
//     flex: 1,
//     height: "100%",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   verticalDivider: {
//     width: 2,
//     height: "100%",
//     backgroundColor: "#ffffff",
//   },
//   socialButtonText: {
//     fontSize: 16,
//     fontWeight: "600",
//     color: "#fff",
//   },
//   googleButton: {
//     backgroundColor: "#DB4437",
//   },
//   facebookButton: {
//     backgroundColor: "#4267B2",
//   },
//   phoneButton: {
//     backgroundColor: "#25D366",
//   },
//   dividerContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginVertical: 24,
//   },
//   dividerLine: {
//     flex: 1,
//     height: 1,
//     backgroundColor: "#dee2e6",
//   },
//   dividerText: {
//     marginHorizontal: 16,
//     color: "#666",
//     fontWeight: "600",
//   },
//   errorContainer: {
//     backgroundColor: "#fee",
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 16,
//     borderWidth: 1,
//     borderColor: "#fcc",
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   errorIcon: {
//     marginRight: 8,
//   },
//   errorText: {
//     color: "#c33",
//     fontSize: 14,
//     flex: 1,
//   },
//   formContainer: {
//     marginBottom: 24,
//   },
//   input: {
//     backgroundColor: "#f8f9fa",
//     borderWidth: 1,
//     borderColor: "#dee2e6",
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     marginBottom: 16,
//   },
//   inputError: {
//     borderColor: "#c33",
//     borderWidth: 1.5,
//   },
//   passwordContainer: {
//     position: "relative",
//     marginBottom: 16,
//   },
//   passwordInput: {
//     backgroundColor: "#f8f9fa",
//     borderWidth: 1,
//     borderColor: "#dee2e6",
//     borderRadius: 8,
//     paddingVertical: 16,
//     paddingHorizontal: 16,
//     fontSize: 16,
//     paddingRight: 50,
//   },
//   eyeButton: {
//     position: "absolute",
//     right: 16,
//     top: 16,
//     padding: 4,
//   },
//   signUpButton: {
//     backgroundColor: "#003366",
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: "center",
//     marginTop: 8,
//   },
//   signUpButtonDisabled: {
//     opacity: 0.6,
//   },
//   signUpButtonText: {
//     color: "#fff",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   loadingContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   loadingText: {
//     marginLeft: 10,
//   },
//   loginContainer: {
//     alignItems: "center",
//     marginBottom: 24,
//     flexDirection: "row",
//     justifyContent: "center",
//   },
//   loginText: {
//     fontSize: 14,
//     color: "#666",
//   },
//   loginButton: {
//     color: "#007bff",
//     fontWeight: "bold",
//     fontSize: 14,
//   },
//   disabledText: {
//     opacity: 0.5,
//   },
//   optionsContainer: {
//     alignItems: "center",
//   },
//   textButton: {
//     paddingVertical: 8,
//   },
//   textButtonText: {
//     color: "#007bff",
//     fontSize: 16,
//     fontWeight: "600",
//     textDecorationLine: "underline",
//   },
// });

// export default RegisterScreen;