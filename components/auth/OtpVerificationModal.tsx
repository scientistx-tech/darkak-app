// import { RootState } from '@/redux/store';
// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   Keyboard,
//   ActivityIndicator,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { setOtpVerificationRequest } from '@/redux/actions/registration.action';

// interface OtpVerificationModalProps {
//   email: string;
//   onVerificationSuccess: () => void;
//   onCancel: () => void;
// }

// const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
//   email,
//   onVerificationSuccess,
//   onCancel,
// }) => {
//   const dispatch = useDispatch();
  
//   const { 
//     loading: otpLoading, 
//     error: otpError,
//     otpVerifyData 
//   } = useSelector((state: RootState) => state.registrationUser);
  
//   const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState<number>(30);
//   const [canResend, setCanResend] = useState<boolean>(false);
//   const [localError, setLocalError] = useState<string>('');
//   const inputRefs = useRef<Array<TextInput | null>>([]);

//   useEffect(() => {
//     console.log('📱 OTP Modal Opened for:', email);
//     inputRefs.current = inputRefs.current.slice(0, 6);
    
//     setTimeout(() => {
//       inputRefs.current[0]?.focus();
//     }, 500);
//   }, []);

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     } else {
//       setCanResend(true);
//     }
//   }, [timer]);

//   // Error handling - Redux error
//   useEffect(() => {
//     if (otpError) {
//       console.log('❌ OTP Error from Redux:', otpError);
      
//       // Check if it's JSON parse error
//       if (otpError.includes('JSON') || otpError.includes('json')) {
//         setLocalError('Server response error. Please try again.');
//       } else {
//         setLocalError(otpError);
//       }
      
//       // Reset OTP inputs
//       setOtp(['', '', '', '', '', '']);
//       inputRefs.current[0]?.focus();
//     }
//   }, [otpError]);

//   // Success handling
//   useEffect(() => {
//     console.log('📊 OTP Verify Data:', otpVerifyData);
    
//     if (otpVerifyData) {
//       // Check multiple success conditions
//       if (otpVerifyData.data?.isActive || 
//           otpVerifyData.statusCode === 200 || 
//           otpVerifyData.message?.toLowerCase().includes('success')) {
        
//         console.log('✅ OTP Verification Successful');
//         setLocalError('');
//         onVerificationSuccess();
//       } else if (otpVerifyData.statusCode !== 200) {
//         // Handle failed verification
//         const errorMsg = otpVerifyData.message || 'OTP verification failed';
//         setLocalError(errorMsg);
//         setOtp(['', '', '', '', '', '']);
//         inputRefs.current[0]?.focus();
//       }
//     }
//   }, [otpVerifyData]);

//   const handleOtpChange = (text: string, index: number) => {
//     // Clear error when user starts typing
//     if (localError) {
//       setLocalError('');
//     }

//     if (/^\d?$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);

//       if (text && index < 5) {
//         setTimeout(() => {
//           inputRefs.current[index + 1]?.focus();
//         }, 10);
//       }

//       if (!text && index > 0) {
//         setTimeout(() => {
//           inputRefs.current[index - 1]?.focus();
//         }, 10);
//       }

//       // Auto submit when all 6 digits entered
//       if (index === 5 && text) {
//         const otpString = [...newOtp].join('');
//         if (otpString.length === 6) {
//           setTimeout(() => {
//             handleSubmit();
//           }, 100);
//         }
//       }
//     }
//   };

//   const handleKeyPress = (e: any, index: number) => {
//     if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleSubmit = () => {
//     const otpString = otp.join('');
    
//     if (otpString.length !== 6) {
//       setLocalError('Please enter complete 6-digit OTP');
//       return;
//     }

//     // Clear previous errors
//     setLocalError('');
//     Keyboard.dismiss();
    
//     console.log('📤 Submitting OTP:', otpString);
//     console.log('📧 For Email:', email);
    
//     // Dispatch OTP verification
//     try {
//       dispatch(setOtpVerificationRequest({
//         email: email.trim().toLowerCase(),
//         otp: otpString
//       }));
//     } catch (error) {
//       console.error('❌ Error dispatching OTP:', error);
//       setLocalError('Failed to verify OTP. Please try again.');
//     }
//   };

//   const handleResendOtp = async () => {
//     if (canResend) {
//       console.log('🔄 Resending OTP to:', email);
      
//       setTimer(30);
//       setCanResend(false);
//       setOtp(['', '', '', '', '', '']);
//       setLocalError('');
//       inputRefs.current[0]?.focus();
      
   
//     }
//   };

//   const handleCancel = () => {
//     console.log('❌ OTP Modal Cancelled');
//     setOtp(['', '', '', '', '', '']);
//     setLocalError('');
//     Keyboard.dismiss();
//     onCancel();
//   };

//   // Display error - prioritize local error over redux error
//   const displayError = localError || otpError;

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify Your Email</Text>
//       <Text style={styles.subtitle}>
//         Enter the 6-digit OTP sent to
//       </Text>
//       <Text style={styles.emailText}>{email}</Text>

//       {displayError && (
//         <View style={styles.errorContainer}>
//           <Text style={styles.errorText}>{displayError}</Text>
//         </View>
//       )}

//       <View style={styles.otpContainer}>
//         {otp.map((digit, index) => (
//           <TextInput
//             key={index}
//             ref={(ref) => {
//               inputRefs.current[index] = ref;
//             }}
//             style={[
//               styles.otpInput,
//               digit && styles.otpInputFilled,
//               displayError && styles.otpInputError,
//             ]}
//             value={digit}
//             onChangeText={(text) => handleOtpChange(text, index)}
//             onKeyPress={(e) => handleKeyPress(e, index)}
//             keyboardType="numeric"
//             maxLength={1}
//             selectTextOnFocus
//             editable={!otpLoading}
//           />
//         ))}
//       </View>

//       {otpLoading && (
//         <View style={styles.loadingContainer}>
//           <ActivityIndicator size="small" color="#003366" />
//           <Text style={styles.loadingText}>Verifying...</Text>
//         </View>
//       )}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.cancelButton]}
//           onPress={handleCancel}
//           disabled={otpLoading}
//         >
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.submitButton, otpLoading && styles.buttonDisabled]}
//           onPress={handleSubmit}
//           disabled={otpLoading || otp.join('').length !== 6}
//         >
//           {otpLoading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.submitButtonText}>Verify</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       <TouchableOpacity
//         style={[
//           styles.resendButton,
//           (!canResend || otpLoading) && styles.resendButtonDisabled,
//         ]}
//         onPress={handleResendOtp}
//         disabled={!canResend || otpLoading}
//       >
//         <Text
//           style={[
//             styles.resendText,
//             (!canResend || otpLoading) && styles.resendTextDisabled,
//           ]}
//         >
//           {canResend
//             ? 'Resend OTP'
//             : `Resend in ${timer}s`}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 20,
//   },
//   title: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 8,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 14,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 4,
//   },
//   emailText: {
//     fontSize: 15,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 24,
//     color: '#003366',
//   },
//   errorContainer: {
//     backgroundColor: '#fee',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 16,
//   },
//   errorText: {
//     color: '#c00',
//     fontSize: 13,
//     textAlign: 'center',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 24,
//     paddingHorizontal: 5,
//     gap:3
//   },
//   otpInput: {
//     width: 45,
//     height: 50,
//     borderWidth: 2,
//     borderColor: '#E0E0E0',
//     borderRadius: 10,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     backgroundColor: '#F8F9FA',
//   },
//   otpInputFilled: {
//     borderColor: '#003366',
//     backgroundColor: '#F0F8FF',
//   },
//   otpInputError: {
//     borderColor: '#c00',
//     backgroundColor: '#fee',
//   },
//   loadingContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 16,
//   },
//   loadingText: {
//     marginLeft: 8,
//     fontSize: 14,
//     color: '#003366',
//     fontWeight: '500',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 16,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 12,
//     borderRadius: 10,
//     marginHorizontal: 4,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   cancelButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 1.5,
//     borderColor: '#E0E0E0',
//   },
//   submitButton: {
//     backgroundColor: '#003366',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 15,
//     fontWeight: '600',
//   },
//   resendButton: {
//     paddingVertical: 12,
//     borderRadius: 10,
//     alignItems: 'center',
//   },
//   resendButtonDisabled: {
//     opacity: 0.5,
//   },
//   resendText: {
//     fontSize: 14,
//     color: '#003366',
//     fontWeight: '600',
//   },
//   resendTextDisabled: {
//     color: '#666',
//   },
// });

// export default OtpVerificationModal;


import { RootState } from '@/redux/store';
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { setOtpVerificationRequest } from '@/redux/actions/registration.action';

interface OtpVerificationModalProps {
  email: string;
  onVerificationSuccess: () => void;
  onCancel: () => void;
}

const OtpVerificationModal: React.FC<OtpVerificationModalProps> = ({
  email,
  onVerificationSuccess,
  onCancel,
}) => {
  const dispatch = useDispatch();
  
  const { 
    loading: otpLoading, 
    error: otpError,
    otpVerifyData 
  } = useSelector((state: RootState) => state.registrationUser);
  
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [localError, setLocalError] = useState<string>('');
  const inputRefs = useRef<Array<TextInput | null>>([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    console.log('📱 OTP Modal Opened for:', email);
    
    const focusTimer = setTimeout(() => {
      if (mountedRef.current && inputRefs.current[0]) {
        inputRefs.current[0]?.focus();
      }
    }, 300);
    
    return () => clearTimeout(focusTimer);
  }, [email]);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Error handling
  useEffect(() => {
    if (otpError) {
      console.log('❌ OTP Error from Redux:', otpError);
      setLocalError(otpError);
      
      const resetOtp = ['', '', '', '', '', ''];
      setOtp(resetOtp);
      
      const errorTimer = setTimeout(() => {
        if (mountedRef.current) {
          setLocalError('');
        }
      }, 5000);
      
      setTimeout(() => {
        if (mountedRef.current && inputRefs.current[0]) {
          inputRefs.current[0]?.focus();
        }
      }, 100);
      
      return () => clearTimeout(errorTimer);
    }
  }, [otpError]);

  // Success handling - UPDATED
  useEffect(() => {
    if (otpVerifyData) {
      console.log('📊 OTP Verify Data from Redux:', otpVerifyData);
      
      // Check if response has user and token (your API response structure)
      const hasUserAndToken = otpVerifyData?.user && otpVerifyData?.token;
      
      // Check different success conditions
      const isSuccess = (
        otpVerifyData.statusCode === 200 ||
        otpVerifyData.success === true ||
        hasUserAndToken ||
        otpVerifyData.message?.toLowerCase().includes('success') ||
        otpVerifyData.message?.toLowerCase().includes('verified') ||
        otpVerifyData.data?.isActive === true ||
        otpVerifyData.user?.isActive === true
      );
      
      console.log('✅ OTP Success Check:', {
        statusCode: otpVerifyData.statusCode,
        success: otpVerifyData.success,
        hasUserAndToken,
        message: otpVerifyData.message,
        isActive: otpVerifyData.user?.isActive,
        isSuccess
      });
      
      if (isSuccess) {
        console.log('✅ OTP Verification Successful - Calling onVerificationSuccess');
        setLocalError('');
        
        // Small delay to ensure UI updates
        setTimeout(() => {
          onVerificationSuccess();
        }, 100);
      } else if (otpVerifyData.message) {
        // Failed verification
        const errorMsg = otpVerifyData.message || 'OTP verification failed';
        console.log('❌ OTP Verification Failed:', errorMsg);
        setLocalError(errorMsg);
        
        const resetOtp = ['', '', '', '', '', ''];
        setOtp(resetOtp);
        
        setTimeout(() => {
          if (mountedRef.current && inputRefs.current[0]) {
            inputRefs.current[0]?.focus();
          }
        }, 100);
      }
    }
  }, [otpVerifyData, onVerificationSuccess]);

  const handleOtpChange = (text: string, index: number) => {
    if (localError) {
      setLocalError('');
    }

    // Handle paste (if user pastes 6 digits)
    if (text.length === 6 && /^\d{6}$/.test(text)) {
      const otpArray = text.split('').slice(0, 6);
      setOtp(otpArray);
      
      setTimeout(() => {
        if (mountedRef.current && inputRefs.current[5]) {
          inputRefs.current[5]?.focus();
        }
      }, 0);
      
      setTimeout(() => {
        handleSubmit();
      }, 200);
      return;
    }

    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < 5) {
        setTimeout(() => {
          if (mountedRef.current && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
          }
        }, 0);
      }

      if (!text && index > 0) {
        setTimeout(() => {
          if (mountedRef.current && inputRefs.current[index - 1]) {
            inputRefs.current[index - 1]?.focus();
          }
        }, 0);
      }

      if (index === 5 && text) {
        const otpString = newOtp.join('');
        if (otpString.length === 6) {
          Keyboard.dismiss();
          setTimeout(() => {
            handleSubmit();
          }, 150);
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      setTimeout(() => {
        if (mountedRef.current && inputRefs.current[index - 1]) {
          inputRefs.current[index - 1]?.focus();
        }
      }, 0);
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      setLocalError('Please enter complete 6-digit OTP');
      return;
    }

    setLocalError('');
    Keyboard.dismiss();
    
    console.log('📤 Submitting OTP:', otpString);
    console.log('📧 For Email:', email);
    
    try {
      dispatch(setOtpVerificationRequest({
        email: email.trim().toLowerCase(),
        otp: otpString
      }));
    } catch (error) {
      console.error('❌ Error dispatching OTP:', error);
      setLocalError('Failed to verify OTP. Please try again.');
    }
  };

  const handleResendOtp = async () => {
    if (canResend) {
      console.log('🔄 Resending OTP to:', email);
      
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      setLocalError('');
      
      setTimeout(() => {
        if (mountedRef.current && inputRefs.current[0]) {
          inputRefs.current[0]?.focus();
        }
      }, 100);
      
      Alert.alert('Info', 'OTP has been resent to your email');
    }
  };

  const handleCancel = () => {
    console.log('❌ OTP Modal Cancelled');
    setOtp(['', '', '', '', '', '']);
    setLocalError('');
    Keyboard.dismiss();
    onCancel();
  };

  const displayError = localError || otpError;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to
      </Text>
      <Text style={styles.emailText}>{email}</Text>

      {displayError && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{displayError}</Text>
        </View>
      )}

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => {
              inputRefs.current[index] = ref;
            }}
            style={[
              styles.otpInput,
              digit && styles.otpInputFilled,
              displayError && styles.otpInputError,
            ]}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={6}
            selectTextOnFocus
            editable={!otpLoading}
            autoFocus={index === 0}
          />
        ))}
      </View>

      {otpLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="small" color="#003366" />
          <Text style={styles.loadingText}>Verifying...</Text>
        </View>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, styles.cancelButton]}
          onPress={handleCancel}
          disabled={otpLoading}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button, 
            styles.submitButton, 
            (otpLoading || otp.join('').length !== 6) && styles.buttonDisabled
          ]}
          onPress={handleSubmit}
          disabled={otpLoading || otp.join('').length !== 6}
        >
          {otpLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Verify</Text>
          )}
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.resendButton,
          (!canResend || otpLoading) && styles.resendButtonDisabled,
        ]}
        onPress={handleResendOtp}
        disabled={!canResend || otpLoading}
      >
        <Text
          style={[
            styles.resendText,
            (!canResend || otpLoading) && styles.resendTextDisabled,
          ]}
        >
          {canResend
            ? 'Resend OTP'
            : `Resend in ${timer}s`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 20,
    minWidth: 300,
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    marginBottom: 4,
  },
  emailText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 32,
    color: '#003366',
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
    //paddingHorizontal: 10,
    gap:1
  },
  otpInput: {
    width: 48,
    height: 56,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '600',
    color: '#1F2937',
    backgroundColor: '#F9FAFB',
  },
  otpInputFilled: {
    borderColor: '#003366',
    backgroundColor: '#EFF6FF',
    shadowColor: '#003366',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  otpInputError: {
    borderColor: '#DC2626',
    backgroundColor: '#FEF2F2',
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    paddingVertical: 8,
  },
  loadingText: {
    marginLeft: 12,
    fontSize: 15,
    color: '#003366',
    fontWeight: '500',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
  },
  submitButton: {
    backgroundColor: '#003366',
  },
  cancelButtonText: {
    color: '#4B5563',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendButton: {
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    fontSize: 15,
    color: '#003366',
    fontWeight: '600',
  },
  resendTextDisabled: {
    color: '#6B7280',
  },
});

export default OtpVerificationModal;