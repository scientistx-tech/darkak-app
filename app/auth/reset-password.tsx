// import { useRouter } from 'expo-router';
// import { useState } from 'react';
// import {
//     Alert,
//     KeyboardAvoidingView,
//     Platform,
//     ScrollView,
//     StyleSheet,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View,
// } from 'react-native';
// import { SafeAreaView } from "react-native-safe-area-context";

// const ResetPasswordScreen = () => {
//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const router = useRouter();

//   const handleSendOTP = () => {
//     console.log('Send OTP pressed');
//     Alert.alert('OTP Sent', 'Verification code has been sent to your email/phone');
//   };

//   const handleLogin = () => {
//     router.push('/auth/login');
//   };

//   const handleRegister = () => {
//     router.push('/auth/register');
//   };

//   const handleGuestContinue = () => {
//     router.push('/(tabs)');
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardAvoid}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContainer}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Reset Password</Text>
//             <Text style={styles.subtitle}>
//               We will send a verification to your e-mail
//             </Text>
//           </View>

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

//             <TouchableOpacity 
//               style={styles.sendOTPButton} 
//               onPress={handleSendOTP}
//             >
//               <Text style={styles.sendOTPButtonText}>Send for OTP</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.registerContainer}>
//             <Text style={styles.registerText}>
//               Don't have an account?{' '}
//             </Text>
//             <TouchableOpacity onPress={handleRegister}>
//               <Text style={styles.registerButton}>Register Now</Text>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.dividerContainer}>
//             <View style={styles.dividerLine} />
//             <Text style={styles.dividerText}>OR</Text>
//             <View style={styles.dividerLine} />
//           </View>

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
//     fontSize: 14,
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
//     paddingHorizontal: 16,
//     color: '#666',
//     fontSize: 14,
//   },
//   optionsContainer: {
//     alignItems: 'center',
//   },
//   textButton: {
//     paddingVertical: 12,
//   },
//   textButtonText: {
//     color: '#007bff',
//     fontSize: 14,
//     fontWeight: '600',
//   },
// });

// export default ResetPasswordScreen;


import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Modal,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setResetPasswordRequest, clearRegistrationData } from '@/redux/actions/registration.action';
import OtpVerificationModal from '@/components/auth/OtpVerificationModal';

const ResetPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const { 
    resetPasswordData, 
    loading: resetLoading, 
    error: resetError 
  } = useSelector((state: RootState) => state.registrationUser);

  useEffect(() => {
    if (resetError) {
      setValidationError(resetError);
    }
  }, [resetError]);

  useEffect(() => {
    if (resetPasswordData) {
      if (resetPasswordData?.statusCode === 200 || 
          resetPasswordData?.statusCode === 201 || 
          resetPasswordData?.data) {
        setShowOtpModal(true);
      }
    }
  }, [resetPasswordData]);

  useEffect(() => {
    if (!resetLoading && resetPasswordData && !resetError) {
      if (resetPasswordData?.data || resetPasswordData?.statusCode === 200) {
        setShowOtpModal(true);
      }
    }
  }, [resetLoading, resetPasswordData, resetError]);

  const validateForm = () => {
    if (!email.trim()) {
      setValidationError('Please enter your email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email address');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleSendOTP = () => {
    if (!validateForm()) {
      return;
    }

    dispatch(clearRegistrationData());
    
    const resetPayload = {
      email: email.trim().toLowerCase()
    };
    
    dispatch(setResetPasswordRequest(resetPayload));

    // OTP send হওয়ার পর modal show করবে
    setTimeout(() => {
      if (!resetError) {
        setShowOtpModal(true);
      }
    }, 3000);
  };

  const handleOtpVerificationSuccess = () => {
    setShowOtpModal(false);
    Alert.alert('Success', 'Password reset verified successfully!', [
      { text: 'OK', onPress: () => router.push('/auth/login') }
    ]);
  };

  const handleOtpCancel = () => {
    setShowOtpModal(false);
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  const handleGuestContinue = () => {
    router.push('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>
              We will send a verification to your e-mail
            </Text>
          </View>

          {validationError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{validationError}</Text>
            </View>
          ) : null}

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!resetLoading}
            />

            <TouchableOpacity 
              style={[styles.sendOTPButton, resetLoading && styles.buttonDisabled]} 
              onPress={handleSendOTP}
              disabled={resetLoading || !email}
            >
              {resetLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.sendOTPButtonText}>Send for OTP</Text>
              )}
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.backToLoginButton} 
            onPress={handleLogin}
            disabled={resetLoading}
          >
            <Text style={styles.backToLoginText}>← Back to Login</Text>
          </TouchableOpacity>

          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don{`'`}t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister} disabled={resetLoading}>
              <Text style={styles.registerButton}>Register Now</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.textButton} 
              onPress={handleGuestContinue}
              disabled={resetLoading}
            >
              <Text style={styles.textButtonText}>Continue as a Guest</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoText}>
              Note: You will receive an email with instructions to reset your password.
              Please check your spam folder if you don{`'`}t see it in your inbox.
            </Text>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {/* OTP Verification Modal */}
      <Modal
        visible={showOtpModal}
        animationType="slide"
        transparent={true}
        onRequestClose={handleOtpCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <OtpVerificationModal
              email={email}
              onVerificationSuccess={handleOtpVerificationSuccess}
              onCancel={handleOtpCancel}
            />
          </View>
        </View>
      </Modal>
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
    marginBottom: 32,
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
  errorContainer: {
    backgroundColor: '#fee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#c00',
    fontSize: 14,
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 16,
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
  },
  sendOTPButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  backToLoginButton: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  backToLoginText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerButton: {
    fontSize: 14,
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
    paddingHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  optionsContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  textButton: {
    paddingVertical: 12,
  },
  textButtonText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dee2e6',
    marginTop: 10,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default ResetPasswordScreen;