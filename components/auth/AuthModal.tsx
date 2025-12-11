// import React, { useState, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   StatusBar,
//   Alert,
//   Modal,
//   Animated,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { SafeAreaView } from "react-native-safe-area-context";
// import { useRouter } from 'expo-router';

// import RegisterScreen from './RegisterScreen';
// import LoginScreen from './LogIn';
// import ResetPasswordScreen from './ResetPasswordScreen';
// import ModeratorLoginScreen from './ModeratorLoginScreen';
// import ContactUsModal from './ContactUsModal';

// const AuthModal = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const [showRegisterModal, setShowRegisterModal] = useState(false);
//   const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
//   const [showModeratorLoginModal, setShowModeratorLoginModal] = useState(false);
//   const [showContactUsScreen, setShowContactUsScreen] = useState(false);
//   const slideAnim = useRef(new Animated.Value(500)).current;
//   const router = useRouter();

//   const openLoginModal = () => {
//     setShowLoginModal(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   };

//   const openRegisterModal = () => {
//     setShowRegisterModal(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   };

//   const openResetPasswordModal = () => {
//     setShowResetPasswordModal(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   };

//   const openModeratorLoginModal = () => {
//     setShowModeratorLoginModal(true);
//     Animated.timing(slideAnim, {
//       toValue: 0,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   };

//   const openContactUsScreen = () => {
//     setShowContactUsScreen(true);
//   };

//   const handleCloseContactUsScreen = () => {
//     setShowContactUsScreen(false);
//   };

//   const handleCloseModal = () => {
//     Animated.timing(slideAnim, {
//       toValue: 500,
//       duration: 400,
//       useNativeDriver: true,
//     }).start(() => {
//       setShowLoginModal(false);
//       setShowRegisterModal(false);
//       setShowResetPasswordModal(false);
//       setShowModeratorLoginModal(false);
//     });
//   };

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     handleCloseModal();
//     Alert.alert('Success', 'You have been logged in!');
//   };

//   const handleRegisterSuccess = () => {
//     setIsLoggedIn(true);
//     handleCloseModal();
//     Alert.alert('Success', 'Your account has been created!');
//   };

//   const handleModeratorLoginSuccess = () => {
//     setIsLoggedIn(true);
//     handleCloseModal();
//     Alert.alert('Success', 'Moderator login successful!');
//     // Moderator-specific navigation can be added here
//     // router.push('/moderator-dashboard');
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     Alert.alert('Success', 'You have been logged out!');
//   };

//   const handleAboutUs = () => {
//     Alert.alert('About Us', 'Welcome to our app! We provide amazing services to our users.');
//   };

//   const handleGuestContinue = () => {
//     handleCloseModal();
//     router.push('/(tabs)'); 
//   };

//   const handleNavigateToLogin = () => {
//     setShowRegisterModal(false);
//     setShowResetPasswordModal(false);
//     setShowModeratorLoginModal(false);
//     setTimeout(() => {
//       setShowLoginModal(true);
//     }, 400);
//   };

//   const handleNavigateToRegister = () => {
//     setShowLoginModal(false);
//     setShowResetPasswordModal(false);
//     setShowModeratorLoginModal(false);
//     setTimeout(() => {
//       setShowRegisterModal(true);
//     }, 400);
//   };

//   const handleNavigateToResetPassword = () => {
//     setShowLoginModal(false);
//     setShowModeratorLoginModal(false);
//     setTimeout(() => {
//       setShowResetPasswordModal(true);
//     }, 400);
//   };

//   const handleNavigateToModeratorLogin = () => {
//     setShowLoginModal(false);
//     setTimeout(() => {
//       setShowModeratorLoginModal(true);
//     }, 400);
//   };

//   const handleSendOTP = () => {
//     Alert.alert('OTP Sent', 'Verification code has been sent to your email/phone');
//   };

//   // যদি Contact Us স্ক্রিন দেখাতে হয়
//   if (showContactUsScreen) {
//     return <ContactUsModal onClose={handleCloseContactUsScreen} />;
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Darkak App</Text>
//       </View>

//       {/* Main Content */}
//       <View style={styles.content}>
//         <Text style={styles.welcomeText}>
//           {isLoggedIn ? 'Welcome Back!' : 'Welcome to Our Darkak App'}
//         </Text>
        
//         {/* Buttons Container */}
//         <View style={styles.buttonsContainer}>
//           {/* Login Button - Show only when logged out */}
//           {!isLoggedIn && (
//             <TouchableOpacity style={styles.button} onPress={openLoginModal}>
//               <View style={styles.buttonContent}>
//                 <Ionicons name="log-in" size={24} color="#fff" />
//                 <Text style={styles.buttonText}>Login</Text>
//               </View>
//             </TouchableOpacity>
//           )}

//           {/* Logout Button - Show only when logged in */}
//           {isLoggedIn && (
//             <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
//               <View style={styles.buttonContent}>
//                 <Ionicons name="log-out" size={24} color="#fff" />
//                 <Text style={styles.buttonText}>Logout</Text>
//               </View>
//             </TouchableOpacity>
//           )}

//           {/* Contact Us Button */}
//           <TouchableOpacity style={styles.button} onPress={openContactUsScreen}>
//             <View style={styles.buttonContent}>
//               <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
//               <Text style={styles.buttonText}>Contact Us</Text>
//             </View>
//           </TouchableOpacity>

//           {/* About Us Button */}
//           <TouchableOpacity style={styles.button} onPress={handleAboutUs}>
//             <View style={styles.buttonContent}>
//               <Ionicons name="information-circle" size={24} color="#fff" />
//               <Text style={styles.buttonText}>About Us</Text>
//             </View>
//           </TouchableOpacity>
//         </View>

//         {/* Status Indicator */}
//         <View style={styles.statusContainer}>
//           <View style={[styles.statusDot, { backgroundColor: isLoggedIn ? '#4CAF50' : '#ff6b6b' }]} />
//           <Text style={styles.statusText}>
//             Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}
//           </Text>
//         </View>
//       </View>

//       {/* Login Modal */}
//       <Modal
//         visible={showLoginModal}
//         transparent={true}
//         animationType="none"
//         onRequestClose={handleCloseModal}
//       >
//         <View style={styles.fullScreenModalOverlay}>
//           <Animated.View 
//             style={[
//               styles.fullScreenModalContent,
//               {
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             {/* Close Button */}
//             <TouchableOpacity 
//               style={styles.fullScreenCloseButton}
//               onPress={handleCloseModal}
//             >
//               <Ionicons name="close" size={28} color="#333" />
//             </TouchableOpacity>
            
//             {/* Login Screen Component */}
//             <LoginScreen 
//               onLoginSuccess={handleLoginSuccess}
//               onRegisterPress={handleNavigateToRegister}
//               onGuestContinue={handleGuestContinue}
//               onModeratorLogin={handleNavigateToModeratorLogin}
//               onForgotPassword={handleNavigateToResetPassword}
//             />
//           </Animated.View>
//         </View>
//       </Modal>

//       {/* Register Modal */}
//       <Modal
//         visible={showRegisterModal}
//         transparent={true}
//         animationType="none"
//         onRequestClose={handleCloseModal}
//       >
//         <View style={styles.fullScreenModalOverlay}>
//           <Animated.View 
//             style={[
//               styles.fullScreenModalContent,
//               {
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             {/* Close Button */}
//             <TouchableOpacity 
//               style={styles.fullScreenCloseButton}
//               onPress={handleCloseModal}
//             >
//               <Ionicons name="close" size={28} color="#333" />
//             </TouchableOpacity>
            
//             {/* Register Screen Component */}
//             <RegisterScreen 
//               onRegisterSuccess={handleRegisterSuccess}
//               onLoginPress={handleNavigateToLogin}
//               onGuestContinue={handleGuestContinue}
//             />
//           </Animated.View>
//         </View>
//       </Modal>

//       {/* Reset Password Modal */}
//       <Modal
//         visible={showResetPasswordModal}
//         transparent={true}
//         animationType="none"
//         onRequestClose={handleCloseModal}
//       >
//         <View style={styles.fullScreenModalOverlay}>
//           <Animated.View 
//             style={[
//               styles.fullScreenModalContent,
//               {
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             {/* Close Button */}
//             <TouchableOpacity 
//               style={styles.fullScreenCloseButton}
//               onPress={handleCloseModal}
//             >
//               <Ionicons name="close" size={28} color="#333" />
//             </TouchableOpacity>
            
//             {/* Reset Password Screen Component */}
//             <ResetPasswordScreen 
//               onSendOTP={handleSendOTP}
//               onLoginPress={handleNavigateToLogin}
//               onRegisterPress={handleNavigateToRegister}
//               onGuestContinue={handleGuestContinue}
//             />
//           </Animated.View>
//         </View>
//       </Modal>

//       {/* Moderator Login Modal */}
//       <Modal
//         visible={showModeratorLoginModal}
//         transparent={true}
//         animationType="none"
//         onRequestClose={handleCloseModal}
//       >
//         <View style={styles.fullScreenModalOverlay}>
//           <Animated.View 
//             style={[
//               styles.fullScreenModalContent,
//               {
//                 transform: [{ translateY: slideAnim }]
//               }
//             ]}
//           >
//             {/* Close Button */}
//             <TouchableOpacity 
//               style={styles.fullScreenCloseButton}
//               onPress={handleCloseModal}
//             >
//               <Ionicons name="close" size={28} color="#333" />
//             </TouchableOpacity>
            
//             {/* Moderator Login Screen Component */}
//             <ModeratorLoginScreen 
//               onLoginSuccess={handleModeratorLoginSuccess}
//               onForgotPassword={handleNavigateToResetPassword}
//               onBackToUserLogin={handleNavigateToLogin}
//             />
//           </Animated.View>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   header: {
//     backgroundColor: '#fff',
//     paddingVertical: 20,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#e9ecef',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   content: {
//     flex: 1,
//     padding: 24,
//     justifyContent: 'center',
//   },
//   welcomeText: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color: '#333',
//     marginBottom: 50,
//   },
//   buttonsContainer: {
//     gap: 16,
//   },
//   button: {
//     backgroundColor: '#007bff',
//     paddingVertical: 16,
//     paddingHorizontal: 20,
//     borderRadius: 12,
//     shadowColor: '#007bff',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 5,
//     elevation: 6,
//   },
//   logoutButton: {
//     backgroundColor: '#dc3545',
//     shadowColor: '#dc3545',
//   },
//   buttonContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 12,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   statusContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: 40,
//     padding: 16,
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   statusDot: {
//     width: 12,
//     height: 12,
//     borderRadius: 6,
//     marginRight: 8,
//   },
//   statusText: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//   },
//   fullScreenModalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   fullScreenModalContent: {
//     flex: 1,
//     backgroundColor: '#fff',
//     marginTop: 40,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     overflow: 'hidden',
//   },
//   fullScreenCloseButton: {
//     position: 'absolute',
//     top: 15,
//     right: 15,
//     zIndex: 1000,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 20,
//     width: 40,
//     height: 40,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });

// export default AuthModal;




import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Alert,
  Modal,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

import RegisterScreen from './RegisterScreen';
import LoginScreen from './LogIn';
import ResetPasswordScreen from './ResetPasswordScreen';
import ModeratorLoginScreen from './ModeratorLoginScreen';
import ContactUsModal from './ContactUsModal';
import OtpVerificationModal from './OtpVerificationModal';

const AuthModal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showResetPasswordModal, setShowResetPasswordModal] = useState(false);
  const [showModeratorLoginModal, setShowModeratorLoginModal] = useState(false);
  const [showContactUsScreen, setShowContactUsScreen] = useState(false);
  const [showOtpVerificationModal, setShowOtpVerificationModal] = useState(false);
  const [userEmailForOtp, setUserEmailForOtp] = useState('');
  
  const slideAnim = useRef(new Animated.Value(500)).current;
  const router = useRouter();

  const openLoginModal = () => {
    setShowLoginModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const openRegisterModal = () => {
    setShowRegisterModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const openResetPasswordModal = () => {
    setShowResetPasswordModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const openModeratorLoginModal = () => {
    setShowModeratorLoginModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const openContactUsScreen = () => {
    setShowContactUsScreen(true);
  };

  const handleCloseContactUsScreen = () => {
    setShowContactUsScreen(false);
  };

  const handleCloseModal = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setShowLoginModal(false);
      setShowRegisterModal(false);
      setShowResetPasswordModal(false);
      setShowModeratorLoginModal(false);
    });
  };

  const handleCloseOtpModal = () => {
    Animated.timing(slideAnim, {
      toValue: 500,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setShowOtpVerificationModal(false);
    });
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCloseModal();
    Alert.alert('Success', 'You have been logged in!');
  };

  const handleRegisterSuccess = () => {
    setIsLoggedIn(true);
    handleCloseModal();
    Alert.alert('Success', 'Your account has been created!');
  };

  const handleRegisterSuccessWithOtp = (email: string) => {
    console.log('📱 AuthModal: Opening OTP modal for email:', email);
    
    // শুধু Register মোডালের state বন্ধ করুন
    setShowRegisterModal(false);
    
    // কিছু সময় পরে OTP মোডাল ওপেন করুন
    setTimeout(() => {
      setUserEmailForOtp(email);
      setShowOtpVerificationModal(true);
      
      // OTP মোডালের জন্য এনিমেশন
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
      
      console.log('📱 AuthModal: OTP modal opened successfully');
    }, 100);
  };

  const handleOtpVerificationSuccess = () => {
    console.log('✅ OTP verification successful');
    handleCloseOtpModal();
    setIsLoggedIn(true);
    Alert.alert('Success', 'Your account has been created and verified!');
  };

  const handleModeratorLoginSuccess = () => {
    setIsLoggedIn(true);
    handleCloseModal();
    Alert.alert('Success', 'Moderator login successful!');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    Alert.alert('Success', 'You have been logged out!');
  };

  const handleAboutUs = () => {
    Alert.alert('About Us', 'Welcome to our app! We provide amazing services to our users.');
  };

  const handleGuestContinue = () => {
    handleCloseModal();
    handleCloseOtpModal();
    router.push('/(tabs)'); 
  };

  const handleNavigateToLogin = () => {
    setShowRegisterModal(false);
    setShowResetPasswordModal(false);
    setShowModeratorLoginModal(false);
    setShowOtpVerificationModal(false);
    
    setTimeout(() => {
      setShowLoginModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 100);
  };

  const handleNavigateToRegister = () => {
    setShowLoginModal(false);
    setShowResetPasswordModal(false);
    setShowModeratorLoginModal(false);
    setShowOtpVerificationModal(false);
    
    setTimeout(() => {
      setShowRegisterModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 100);
  };

  const handleNavigateToResetPassword = () => {
    setShowLoginModal(false);
    setShowModeratorLoginModal(false);
    
    setTimeout(() => {
      setShowResetPasswordModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 100);
  };

  const handleNavigateToModeratorLogin = () => {
    setShowLoginModal(false);
    
    setTimeout(() => {
      setShowModeratorLoginModal(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }, 100);
  };

  const handleSendOTP = () => {
    Alert.alert('OTP Sent', 'Verification code has been sent to your email/phone');
  };

  const handleOtpModalClose = () => {
    handleCloseOtpModal();
  };

  // যদি Contact Us স্ক্রিন দেখাতে হয়
  if (showContactUsScreen) {
    return <ContactUsModal onClose={handleCloseContactUsScreen} />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Darkak App</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <Text style={styles.welcomeText}>
          {isLoggedIn ? 'Welcome Back!' : 'Welcome to Our Darkak App'}
        </Text>
        
        {/* Buttons Container */}
        <View style={styles.buttonsContainer}>
          {/* Login Button - Show only when logged out */}
          {!isLoggedIn && (
            <TouchableOpacity style={styles.button} onPress={openLoginModal}>
              <View style={styles.buttonContent}>
                <Ionicons name="log-in" size={24} color="#fff" />
                <Text style={styles.buttonText}>Login</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Logout Button - Show only when logged in */}
          {isLoggedIn && (
            <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
              <View style={styles.buttonContent}>
                <Ionicons name="log-out" size={24} color="#fff" />
                <Text style={styles.buttonText}>Logout</Text>
              </View>
            </TouchableOpacity>
          )}

          {/* Contact Us Button */}
          <TouchableOpacity style={styles.button} onPress={openContactUsScreen}>
            <View style={styles.buttonContent}>
              <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
              <Text style={styles.buttonText}>Contact Us</Text>
            </View>
          </TouchableOpacity>

          {/* About Us Button */}
          <TouchableOpacity style={styles.button} onPress={handleAboutUs}>
            <View style={styles.buttonContent}>
              <Ionicons name="information-circle" size={24} color="#fff" />
              <Text style={styles.buttonText}>About Us</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Status Indicator */}
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: isLoggedIn ? '#4CAF50' : '#ff6b6b' }]} />
          <Text style={styles.statusText}>
            Status: {isLoggedIn ? 'Logged In' : 'Logged Out'}
          </Text>
        </View>
      </View>

      {/* Login Modal */}
      <Modal
        visible={showLoginModal}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.fullScreenModalOverlay}>
          <Animated.View 
            style={[
              styles.fullScreenModalContent,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.fullScreenCloseButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            
            {/* Login Screen Component */}
            <LoginScreen 
              onLoginSuccess={handleLoginSuccess}
              onRegisterPress={handleNavigateToRegister}
              onGuestContinue={handleGuestContinue}
              onModeratorLogin={handleNavigateToModeratorLogin}
              onForgotPassword={handleNavigateToResetPassword}
            />
          </Animated.View>
        </View>
      </Modal>

      {/* Register Modal */}
      <Modal
        visible={showRegisterModal}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.fullScreenModalOverlay}>
          <Animated.View 
            style={[
              styles.fullScreenModalContent,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.fullScreenCloseButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            
            {/* Register Screen Component */}
            <RegisterScreen 
              onRegisterSuccess={handleRegisterSuccess}
              onRegisterSuccessWithOtp={handleRegisterSuccessWithOtp}
              onLoginPress={handleNavigateToLogin}
              onGuestContinue={handleGuestContinue}
            />
          </Animated.View>
        </View>
      </Modal>

      {/* OTP Verification Modal */}
      <Modal
        visible={showOtpVerificationModal}
        transparent={true}
        animationType="none"
        onRequestClose={handleOtpModalClose}
      >
        <View style={styles.fullScreenModalOverlay}>
          <Animated.View 
            style={[
              styles.fullScreenModalContent,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.fullScreenCloseButton}
              onPress={handleOtpModalClose}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            
            {/* OTP Verification Component */}
            <OtpVerificationModal 
              email={userEmailForOtp}
              onVerificationSuccess={handleOtpVerificationSuccess}
              onCancel={handleOtpModalClose}
            />
          </Animated.View>
        </View>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        visible={showResetPasswordModal}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.fullScreenModalOverlay}>
          <Animated.View 
            style={[
              styles.fullScreenModalContent,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.fullScreenCloseButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            
            {/* Reset Password Screen Component */}
            <ResetPasswordScreen 
              onSendOTP={handleSendOTP}
              onLoginPress={handleNavigateToLogin}
              onRegisterPress={handleNavigateToRegister}
              onGuestContinue={handleGuestContinue}
            />
          </Animated.View>
        </View>
      </Modal>

      {/* Moderator Login Modal */}
      <Modal
        visible={showModeratorLoginModal}
        transparent={true}
        animationType="none"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.fullScreenModalOverlay}>
          <Animated.View 
            style={[
              styles.fullScreenModalContent,
              {
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            {/* Close Button */}
            <TouchableOpacity 
              style={styles.fullScreenCloseButton}
              onPress={handleCloseModal}
            >
              <Ionicons name="close" size={28} color="#333" />
            </TouchableOpacity>
            
            {/* Moderator Login Screen Component */}
            <ModeratorLoginScreen 
              onLoginSuccess={handleModeratorLoginSuccess}
              onForgotPassword={handleNavigateToResetPassword}
              onBackToUserLogin={handleNavigateToLogin}
            />
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 50,
  },
  buttonsContainer: {
    gap: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: '#007bff',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    shadowColor: '#dc3545',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  fullScreenModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  fullScreenModalContent: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  fullScreenCloseButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default AuthModal;