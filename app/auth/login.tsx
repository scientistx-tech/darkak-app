import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState, useEffect } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Alert,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLogInUserRequest, clearRegistrationData } from '@/redux/actions/registration.action';

const LoginScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');
  const { 
    loginData, 
    loading: loginLoading, 
    error: loginError 
  } = useSelector((state: RootState) => state.registrationUser);
  useEffect(() => {
    if (loginError) {
      setValidationError(loginError);
      Alert.alert('Login Error', loginError);
    }
  }, [loginError]);
  useEffect(() => {
    if (loginData?.statusCode === 200 && loginData?.data) {
      console.log('Login successful:', loginData);
      const user = loginData.data?.user || loginData.data;
      
      if (user?.isActive) {
        Alert.alert('Success', 'Login successful!', [
          { 
            text: 'OK', 
            onPress: () => {
              console.log('User logged in:', user);
              router.push('/(tabs)');
            }
          }
        ]);
      } else if (user && !user.isActive) {
        Alert.alert(
          'Account Not Verified',
          'Please verify your email first. We have sent an OTP to your email.',
          [
            {
              text: 'OK',
              onPress: () => {
                console.log('Navigate to OTP screen for email:', user.email);
              }
            }
          ]
        );
      }
    }
  }, [loginData]);

  const validateForm = () => {
    if (!email.trim()) {
      setValidationError('Please enter your email');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setValidationError('Please enter a valid email');
      return false;
    }

    if (!password) {
      setValidationError('Please enter a password');
      return false;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleLogin = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Login pressed with:', { email, password });
    dispatch(clearRegistrationData());
    const loginPayload = {
      email: email.trim().toLowerCase(),
      password: password,
    };
    
    dispatch(setLogInUserRequest(loginPayload));
    router.push('/(tabs)');
    setEmail("");
    setPassword("");
  };

  const handleForgotPassword = () => {
    router.push('/auth/reset-password');
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  const handleGuestContinue = () => {
    router.push('/(tabs)');
  };

  const handleModeratorLogin = () => {
    router.push('/auth/moderator-login');
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login pressed`);
    Alert.alert('Coming Soon', `${provider} login will be available soon!`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>
              Login using your social account or email
            </Text>
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            {/* Google Login - Red Background */}
            <TouchableOpacity 
              style={[styles.socialButton, styles.googleButton]} 
              onPress={() => handleSocialLogin('Google')}
              disabled={loginLoading}
            >
              <View style={styles.socialButtonContent}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="google" size={20} color="#fff" />
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.textContainer}>
                  <Text style={styles.socialButtonText}>LOGIN WITH GOOGLE</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Facebook Login - Blue Background */}
            <TouchableOpacity 
              style={[styles.socialButton, styles.facebookButton]} 
              onPress={() => handleSocialLogin('Facebook')}
              disabled={loginLoading}
            >
              <View style={styles.socialButtonContent}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="facebook" size={20} color="#fff" />
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.textContainer}>
                  <Text style={styles.socialButtonText}>LOGIN WITH FACEBOOK</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Phone Login - Light Green Background */}
            <TouchableOpacity 
              style={[styles.socialButton, styles.phoneButton]} 
              onPress={() => handleSocialLogin('Phone')}
              disabled={loginLoading}
            >
              <View style={styles.socialButtonContent}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="phone-android" size={20} color="#fff" />
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.textContainer}>
                  <Text style={styles.socialButtonText}>LOGIN WITH PHONE</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* OR Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Error Message */}
          {validationError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{validationError}</Text>
            </View>
          ) : null}

          {/* Email and Password Inputs */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loginLoading}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                editable={!loginLoading}
              />
              <TouchableOpacity 
                style={styles.eyeButton} 
                onPress={togglePasswordVisibility}
                disabled={loginLoading}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={24} 
                  color="#999" 
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity 
              style={styles.forgotPasswordButton}
              onPress={handleForgotPassword}
              disabled={loginLoading}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.loginButton, loginLoading && styles.buttonDisabled]} 
              onPress={handleLogin}
              disabled={loginLoading || !email || !password}
            >
              {loginLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.loginButtonText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Register Section */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Dont have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister} disabled={loginLoading}>
              <Text style={styles.loginButtonText}>Register Now</Text>
            </TouchableOpacity>
          </View>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Additional Options */}
          <View style={styles.optionsContainer}>
            <TouchableOpacity 
              style={styles.textButton} 
              onPress={handleGuestContinue}
              disabled={loginLoading}
            >
              <Text style={styles.textButtonText}>Continue as a Guest</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.textButton} 
              onPress={handleModeratorLogin}
              disabled={loginLoading}
            >
              <Text style={styles.textButtonText}>Moderator Login</Text>
            </TouchableOpacity>
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
  socialContainer: {
    marginBottom: 24,
  },
  socialButton: {
    borderRadius: 8,
    marginBottom: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalDivider: {
    width: 1,
    height: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  googleButton: {
    backgroundColor: '#db4437',
  },
  facebookButton: {
    backgroundColor: '#4267B2',
  },
  phoneButton: {
    backgroundColor: '#25D366',
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
    marginBottom: 16,
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  passwordInput: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    paddingRight: 50,
  },
  eyeButton: {
    position: 'absolute',
    right: 16,
    top: 16,
    padding: 4,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#003366',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
 
  optionsContainer: {
    alignItems: 'center',
  },
  textButton: {
    paddingVertical: 12,
  },
  textButtonText: {
    color: '#007bff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;