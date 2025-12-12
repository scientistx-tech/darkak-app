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
//   TextInputProps,
// } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';

// const OtpVerificationModal = () => {
//   //const ditchpatch = useDispatch();

//   //const verificationOtpAll =  useSelector((state:RootState)=>state.registrationUser?.otpVerifyData)

//   const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState<number>(30);
//   const [canResend, setCanResend] = useState<boolean>(false);
//   const inputRefs = useRef<Array<TextInput | null>>([]);

//   useEffect(() => {
//     // Initialize refs array
//     inputRefs.current = inputRefs.current.slice(0, 6);
//   }, []);

//   useEffect(() => {
//     if (timer > 0) {
//       const countdown = setTimeout(() => setTimer(timer - 1), 1000);
//       return () => clearTimeout(countdown);
//     } else {
//       setCanResend(true);
//     }
//   }, [timer]);

//   const handleOtpChange = (text: string, index: number) => {
//     if (/^\d?$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);

//       // Auto focus to next input
//       if (text && index < 5) {
//         inputRefs.current[index + 1]?.focus();
//       }

//       // Auto backspace to previous input
//       if (!text && index > 0) {
//         inputRefs.current[index - 1]?.focus();
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
//     if (otpString.length === 6) {
//       Alert.alert('Success', `OTP Submitted: ${otpString}`);
//       Keyboard.dismiss();
//     } else {
//       Alert.alert('Error', 'Please enter complete OTP');
//     }
//   };

//   const handleResendOtp = () => {
//     if (canResend) {
//       setTimer(15);
//       setCanResend(false);
//       setOtp(['', '', '', '', '', '']);
//       inputRefs.current[0]?.focus();
//       Alert.alert('OTP Sent', 'New OTP has been sent to your email');
//     }
//   };

//   const handleCancel = () => {
//     Alert.alert('Cancelled', 'Verification cancelled');
//     setOtp(['', '', '', '', '', '']);
//     Keyboard.dismiss();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify Email</Text>
//       <Text style={styles.subtitle}>
//         OTP has been sent to <Text style={styles.emailText}>Email</Text>
//       </Text>

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
//             ]}
//             value={digit}
//             onChangeText={(text) => handleOtpChange(text, index)}
//             onKeyPress={(e) => handleKeyPress(e, index)}
//             keyboardType="numeric"
//             maxLength={1}
//             selectTextOnFocus
//           />
//         ))}
//       </View>

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.cancelButton]}
//           onPress={handleCancel}
//         >
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.submitButton]}
//           onPress={handleSubmit}
//         >
//           <Text style={styles.submitButtonText}>Submit OTP</Text>
//         </TouchableOpacity>
//       </View>

//       <View style={styles.separator} />

//       <TouchableOpacity
//         style={[
//           styles.resendButton,
//           !canResend && styles.resendButtonDisabled,
//         ]}
//         onPress={handleResendOtp}
//         disabled={!canResend}
//       >
//         <Text
//           style={[
//             styles.resendText,
//             !canResend && styles.resendTextDisabled,
//           ]}
//         >
//           {canResend
//             ? 'Resend OTP'
//             : `Resend OTP in ${timer}s`}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     marginBottom: 40,
//     color: '#666',
//   },
//   emailText: {
//     fontWeight: 'bold',
//     color: '#007AFF',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 40,
//     paddingHorizontal: 20,
//   },
//   otpInput: {
//     width: 45,
//     height: 55,
//     borderWidth: 2,
//     borderColor: '#E0E0E0',
//     borderRadius: 12,
//     textAlign: 'center',
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#333',
//     backgroundColor: '#F8F9FA',
//   },
//   otpInputFilled: {
//     borderColor: '#007AFF',
//     backgroundColor: '#F0F8FF',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 15,
//     borderRadius: 12,
//     marginHorizontal: 5,
//   },
//   cancelButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 2,
//     borderColor: '#E0E0E0',
//   },
//   submitButton: {
//     backgroundColor: '#007AFF',
//   },
//   cancelButtonText: {
//     color: '#666',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   submitButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//     marginBottom: 30,
//   },
//   resendButton: {
//     paddingVertical: 15,
//     borderRadius: 12,
//   },
//   resendButtonDisabled: {
//     opacity: 0.5,
//   },
//   resendText: {
//     textAlign: 'center',
//     fontSize: 16,
//     color: '#007AFF',
//     fontWeight: '600',
//   },
//   resendTextDisabled: {
//     color: '#666',
//   },
// });

// export default OtpVerificationModal;
//-----------------------------------------------------
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
 
//   const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
//   const [timer, setTimer] = useState<number>(30);
//   const [canResend, setCanResend] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(false);
//   const inputRefs = useRef<Array<TextInput | null>>([]);

//    const{emailUser,otpverify} = useSelector((state:RootState)=>state.registrationUser.otpVerifyData);


//   useEffect(() => {
//     console.log('📱 OTP Modal: Email received:', email);
//     // Initialize refs array
//     inputRefs.current = inputRefs.current.slice(0, 6);
    
//     // Focus first input
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

//   const handleOtpChange = (text: string, index: number) => {
//     if (/^\d?$/.test(text)) {
//       const newOtp = [...otp];
//       newOtp[index] = text;
//       setOtp(newOtp);

//       // Auto focus to next input
//       if (text && index < 5) {
//         setTimeout(() => {
//           inputRefs.current[index + 1]?.focus();
//         }, 10);
//       }

//       // Auto backspace to previous input
//       if (!text && index > 0) {
//         setTimeout(() => {
//           inputRefs.current[index - 1]?.focus();
//         }, 10);
//       }

//       // Auto submit if all digits are entered
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

//   const handleSubmit = async () => {
//     const otpString = otp.join('');
//     if (otpString.length !== 6) {
//       Alert.alert('Error', 'Please enter complete 6-digit OTP');
//       return;
//     }

//     setLoading(true);
//     Keyboard.dismiss();
    
//     try {
//       console.log('📱 OTP Modal: Verifying OTP for email:', email);
      
//       // এখানে আপনার OTP verification API কল করুন
//       // dispatch(verifyOtpAction({ email, otp: otpString }));
      
//       // Simulate API call
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       console.log('✅ OTP Modal: Verification successful');
//       Alert.alert('Success', 'Email verified successfully!');
//       onVerificationSuccess();
      
//     } catch (error) {
//       console.error('❌ OTP Modal: Verification error:', error);
//       Alert.alert('Error', 'Invalid OTP. Please try again.');
//       // Reset OTP on error
//       setOtp(['', '', '', '', '', '']);
//       inputRefs.current[0]?.focus();
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleResendOtp = async () => {
//     if (canResend) {
//       setLoading(true);
//       try {
//         console.log('📱 OTP Modal: Resending OTP to:', email);
//         await new Promise(resolve => setTimeout(resolve, 1000));
        
//         setTimer(30);
//         setCanResend(false);
//         setOtp(['', '', '', '', '', '']);
//         inputRefs.current[0]?.focus();
//         Alert.alert('OTP Sent', `New OTP has been sent to ${email}`);
        
//       } catch (error) {
//         console.error('❌ OTP Modal: Resend error:', error);
//         Alert.alert('Error', 'Failed to resend OTP. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const handleCancel = () => {
//     Alert.alert('Cancelled', 'Verification cancelled');
//     setOtp(['', '', '', '', '', '']);
//     Keyboard.dismiss();
//     onCancel();
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Verify Your Email</Text>
//       <Text style={styles.subtitle}>
//         Enter the 6-digit OTP sent to
//       </Text>
//       <Text style={styles.emailText}>{email}</Text>

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
//             ]}
//             value={digit}
//             onChangeText={(text) => handleOtpChange(text, index)}
//             onKeyPress={(e) => handleKeyPress(e, index)}
//             keyboardType="numeric"
//             maxLength={1}
//             selectTextOnFocus
//             editable={!loading}
//           />
//         ))}
//       </View>

//       {loading && (
//         <View style={styles.loadingOverlay}>
//           <ActivityIndicator size="large" color="#003366" />
//           <Text style={styles.loadingText}>Verifying OTP...</Text>
//         </View>
//       )}

//       <View style={styles.buttonContainer}>
//         <TouchableOpacity
//           style={[styles.button, styles.cancelButton]}
//           onPress={handleCancel}
//           disabled={loading}
//         >
//           <Text style={styles.cancelButtonText}>Cancel</Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[styles.button, styles.submitButton, loading && styles.buttonDisabled]}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" size="small" />
//           ) : (
//             <Text style={styles.submitButtonText}>Verify OTP</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       <View style={styles.separator} />

//       <TouchableOpacity
//         style={[
//           styles.resendButton,
//           (!canResend || loading) && styles.resendButtonDisabled,
//         ]}
//         onPress={handleResendOtp}
//         disabled={!canResend || loading}
//       >
//         <Text
//           style={[
//             styles.resendText,
//             (!canResend || loading) && styles.resendTextDisabled,
//           ]}
//         >
//           {canResend
//             ? 'Resend OTP'
//             : `Resend OTP in ${timer}s`}
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     //padding: 20,
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 10,
//     color: '#333',
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: 'center',
//     color: '#666',
//     marginBottom: 5,
//   },
//   emailText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 40,
//     color: '#003366',
//   },
//   otpContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap:3,
//     marginBottom: 40,
//     paddingHorizontal: 20,
//   },
//   otpInput: {
//     width: 50,
//     height: 60,
//     borderWidth: 2,
//     borderColor: '#E0E0E0',
//     borderRadius: 12,
//     textAlign: 'center',
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#333',
//     backgroundColor: '#F8F9FA',
//   },
//   otpInputFilled: {
//     borderColor: '#003366',
//     backgroundColor: '#F0F8FF',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 30,
//   },
//   button: {
//     flex: 1,
//     paddingVertical: 16,
//     borderRadius: 12,
//     marginHorizontal: 5,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   buttonDisabled: {
//     opacity: 0.6,
//   },
//   cancelButton: {
//     backgroundColor: '#F8F9FA',
//     borderWidth: 2,
//     borderColor: '#E0E0E0',
//   },
//   submitButton: {
//     backgroundColor: '#003366',
//   },
//   cancelButtonText: {
//     color: '#666',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//     marginBottom: 30,
//   },
//   resendButton: {
//     paddingVertical: 16,
//     borderRadius: 12,
//     alignItems: 'center',
//   },
//   resendButtonDisabled: {
//     opacity: 0.5,
//   },
//   resendText: {
//     fontSize: 16,
//     color: '#003366',
//     fontWeight: '600',
//   },
//   resendTextDisabled: {
//     color: '#666',
//   },
//   loadingOverlay: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 10,
//   },
//   loadingText: {
//     marginTop: 10,
//     fontSize: 16,
//     color: '#003366',
//     fontWeight: '600',
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
  const inputRefs = useRef<Array<TextInput | null>>([]);

  useEffect(() => {
    console.log('📱 OTP Modal: Email received:', email);
    // Initialize refs array
    inputRefs.current = inputRefs.current.slice(0, 6);
    
    // Focus first input
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 500);
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // OTP verification response monitor করুন
  useEffect(() => {
    if (otpError) {
      Alert.alert('Error', otpError || 'Invalid OTP. Please try again.');
      // Reset OTP on error
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  }, [otpError]);

  // Success response monitor করুন
  useEffect(() => {
    if (otpVerifyData && otpVerifyData.data) {
      if (otpVerifyData.data.isActive) {
        Alert.alert('Success', 'Email verified successfully!', [
          {
            text: 'OK',
            onPress: () => {
              console.log('✅ User verified and active:', otpVerifyData.data);
              onVerificationSuccess();
            }
          }
        ]);
      } else {
        Alert.alert('Error', 'OTP verification failed. User is not active.');
      }
    }
  }, [otpVerifyData]);

  const handleOtpChange = (text: string, index: number) => {
    if (/^\d?$/.test(text)) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);

      // Auto focus to next input
      if (text && index < 5) {
        setTimeout(() => {
          inputRefs.current[index + 1]?.focus();
        }, 10);
      }

      // Auto backspace to previous input
      if (!text && index > 0) {
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus();
        }, 10);
      }

      // Auto submit if all digits are entered
      if (index === 5 && text) {
        const otpString = [...newOtp].join('');
        if (otpString.length === 6) {
          setTimeout(() => {
            handleSubmit();
          }, 100);
        }
      }
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      Alert.alert('Error', 'Please enter complete 6-digit OTP');
      return;
    }

    Keyboard.dismiss();
    
    console.log('📱 OTP Modal: Verifying OTP for email:', email);
    console.log('📱 OTP Modal: OTP entered:', otpString);
    
    // Dispatch OTP verification request
    dispatch(setOtpVerificationRequest({
      email: email,
      otp: otpString
    }));
  };

  const handleResendOtp = async () => {
    if (canResend) {
      // এখানে আপনি OTP resend API call করতে পারেন
      // অথবা temporary solution হিসেবে
      Alert.alert('OTP Resent', `New OTP has been sent to ${email}`);
      
      setTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const handleCancel = () => {
    Alert.alert('Cancelled', 'Verification cancelled');
    setOtp(['', '', '', '', '', '']);
    Keyboard.dismiss();
    onCancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Email</Text>
      <Text style={styles.subtitle}>
        Enter the 6-digit OTP sent to
      </Text>
      <Text style={styles.emailText}>{email}</Text>

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
            ]}
            value={digit}
            onChangeText={(text) => handleOtpChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            keyboardType="numeric"
            maxLength={1}
            selectTextOnFocus
            editable={!otpLoading}
          />
        ))}
      </View>

      {otpLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#003366" />
          <Text style={styles.loadingText}>Verifying OTP...</Text>
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
          style={[styles.button, styles.submitButton, otpLoading && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={otpLoading || otp.join('').length !== 6}
        >
          {otpLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.submitButtonText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />

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
            : `Resend OTP in ${timer}s`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 5,
  },
  emailText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#003366',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  otpInput: {
    width: 50,
    height: 60,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    backgroundColor: '#F8F9FA',
  },
  otpInputFilled: {
    borderColor: '#003366',
    backgroundColor: '#F0F8FF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  cancelButton: {
    backgroundColor: '#F8F9FA',
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  submitButton: {
    backgroundColor: '#003366',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  separator: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 30,
  },
  resendButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resendButtonDisabled: {
    opacity: 0.5,
  },
  resendText: {
    fontSize: 16,
    color: '#003366',
    fontWeight: '600',
  },
  resendTextDisabled: {
    color: '#666',
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#003366',
    fontWeight: '600',
  },
});

export default OtpVerificationModal;