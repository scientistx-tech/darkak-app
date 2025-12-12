// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ScrollView,
//   KeyboardAvoidingView,
//   Platform,
// } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { Ionicons } from '@expo/vector-icons';
// import { useDispatch } from 'react-redux';

// // Props interface
// interface ResetPasswordScreenProps {
//   onSendOTP?: () => void;
//   onLoginPress?: () => void;
//   onRegisterPress?: () => void;
//   onGuestContinue?: () => void;
// }

// const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ 
//   onSendOTP, 
//   onLoginPress,
//   onRegisterPress,
//   onGuestContinue 
// }) => {
//   const [emailOrPhone, setEmailOrPhone] = useState('');

//   const dispatch = useDispatch();

//   const handleSendOTP = () => {
//     console.log('Send OTP pressed');
//     if (onSendOTP) {
//       onSendOTP();
//     }
//   };

//   const handleLogin = () => {
//     console.log('Login pressed');
//     if (onLoginPress) {
//       onLoginPress();
//     }
//   };

//   const handleRegister = () => {
//     console.log('Register Now pressed');
//     if (onRegisterPress) {
//       onRegisterPress();
//     }
//   };

//   const handleGuestContinue = () => {
//     console.log('Continue as Guest pressed');
//     if (onGuestContinue) {
//       onGuestContinue();
//     }
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
//             <Text style={styles.title}>Reset Password</Text>
//             <Text style={styles.subtitle}>
//               We will send a verification to your e-mail
//             </Text>
//           </View>

//           {/* Email/Phone Input */}
//           <View style={styles.formContainer}>
//             <TextInput
//               style={styles.input}
//               placeholder="Email or Phone"
//               placeholderTextColor="#999"
//               keyboardType="email-address"
//               autoCapitalize="none"
//               value={emailOrPhone}
//               onChangeText={setEmailOrPhone}
//             />

//             {/* Send OTP Button - Navy Blue */}
//             <TouchableOpacity 
//               style={styles.sendOTPButton} 
//               onPress={handleSendOTP}
//             >
//               <Text style={styles.sendOTPButtonText}>Send for OTP</Text>
//             </TouchableOpacity>
//           </View>

//           {/* Register Section */}
//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>
//               Don{`'`}t have an account?{' '}
//             </Text>
//             <TouchableOpacity onPress={handleRegister}>
//               <Text style={styles.registerButton}>Register Now</Text>
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
//             >
//               <Text style={styles.textButtonText}>Continue as a Guest</Text>
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
//     marginBottom: 24,
//   },
//   sendOTPButton: {
//     backgroundColor: '#003366',
//     paddingVertical: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   sendOTPButtonText: {
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
//   optionsContainer: {
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

// export default ResetPasswordScreen;



import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setResetPasswordRequest } from '@/redux/actions/registration.action';

// Props interface
interface ResetPasswordScreenProps {
  onSendOTP?: () => void;
  onLoginPress?: () => void;
  onRegisterPress?: () => void;
  onGuestContinue?: () => void;
  navigation?: any; // Navigation prop add করুন
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ 
  onSendOTP, 
  onLoginPress,
  onRegisterPress,
  onGuestContinue,
  navigation
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const dispatch = useDispatch();

  // Redux state থেকে data নিন
  const { 
    loading: resetLoading,
    error: resetError,
    resetPasswordData
  } = useSelector((state: RootState) => state.registrationUser);

  // Error handling
  useEffect(() => {
    if (resetError) {
      Alert.alert('Error', resetError || 'Failed to send reset password email');
    }
  }, [resetError]);

  // Success handling
  useEffect(() => {
    if (resetPasswordData && resetPasswordData.message) {
      console.log('Reset password response:', resetPasswordData);
      
      if (resetPasswordData.message.toLowerCase().includes('success') || 
          resetPasswordData.statusCode === 200) {
        
        Alert.alert(
          'Email Sent', 
          'Password reset email has been sent successfully! Please check your email.',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('✅ Reset password email sent to:', emailOrPhone);
                
                // Navigate back to login বা OTP verification screen
                if (navigation) {
                  // যদি OTP verification screen এ যেতে চান
                  // navigation.navigate('OtpVerification', { 
                  //   email: emailOrPhone,
                  //   isResetPassword: true 
                  // });
                  
                  // অথবা login screen এ যান
                  navigation.navigate('Login', {
                    message: 'Password reset email sent. Please check your email.'
                  });
                }
                
                // Callback call করুন যদি থাকে
                if (onSendOTP) {
                  onSendOTP();
                }
              }
            }
          ]
        );
      } else {
        // Failed
        Alert.alert('Failed', resetPasswordData.message || 'Failed to send reset email');
      }
    }
  }, [resetPasswordData]);

  const handleSendOTP = () => {
    // Validate input
    if (!emailOrPhone.trim()) {
      Alert.alert('Validation Error', 'Please enter your email or phone number');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailOrPhone)) {
      Alert.alert('Validation Error', 'Please enter a valid email address');
      return;
    }

    console.log('Send OTP pressed for:', emailOrPhone);
    
    // Dispatch reset password request
    dispatch(setResetPasswordRequest({
      email: emailOrPhone
    }));
  };

  const handleLogin = () => {
    console.log('Login pressed');
    if (onLoginPress) {
      onLoginPress();
    }
    // Navigate to login screen
    if (navigation) {
      navigation.navigate('Login');
    }
  };

  const handleRegister = () => {
    console.log('Register Now pressed');
    if (onRegisterPress) {
      onRegisterPress();
    }
    // Navigate to registration screen
    if (navigation) {
      navigation.navigate('Registration');
    }
  };

  const handleGuestContinue = () => {
    console.log('Continue as Guest pressed');
    if (onGuestContinue) {
      onGuestContinue();
    }
    // Navigate as guest
    if (navigation) {
      navigation.navigate('GuestHome');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              We will send a verification to your e-mail
            </Text>
          </View>

          {/* Email/Phone Input */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
              editable={!resetLoading}
            />

            {/* Send OTP Button - Navy Blue */}
            <TouchableOpacity 
              style={[
                styles.sendOTPButton,
                (!emailOrPhone.trim() || resetLoading) && styles.buttonDisabled
              ]} 
              onPress={handleSendOTP}
              disabled={!emailOrPhone.trim() || resetLoading}
            >
              {resetLoading ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.sendOTPButtonText}>Send Reset Email</Text>
              )}
            </TouchableOpacity>

            {/* Back to Login Link */}
            <TouchableOpacity 
              style={styles.backToLoginButton} 
              onPress={handleLogin}
              disabled={resetLoading}
            >
              <Ionicons name="arrow-back" size={16} color="#007bff" />
              <Text style={styles.backToLoginText}> Back to Login</Text>
            </TouchableOpacity>
          </View>

          {/* Register Section */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don{`'`}t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister} disabled={resetLoading}>
              <Text style={styles.registerButton}>Register Now</Text>
            </TouchableOpacity>
          </View>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Guest Continue Option */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.textButton} 
              onPress={handleGuestContinue}
              disabled={resetLoading}
            >
              <Text style={styles.textButtonText}>Continue as a Guest</Text>
            </TouchableOpacity>
          </View>

          {/* Info Text */}
          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Note: You will receive an email with instructions to reset your password.
              Please check your spam folder if you dont see it in your inbox.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    marginBottom: 24,
  },
  sendOTPButton: {
    backgroundColor: '#003366',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  sendOTPButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backToLoginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
  },
  backToLoginText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
  registerContainer: {
    alignItems: 'center',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerButton: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#dee2e6',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontWeight: '600',
  },
  optionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textButton: {
    paddingVertical: 8,
  },
  textButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginTop: 20,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default ResetPasswordScreen;