import { clearRegistrationData, setRegistrationRequest } from '@/redux/actions/registration.action';
import { RootState } from '@/redux/store';
import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from 'react-redux';

const RegisterScreen = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [validationError, setValidationError] = useState('');

  const { registrationData, loading, error } = useSelector(
    (state: RootState) => state?.registrationUser
  );

  useEffect(() => {
    if (registrationData?.statusCode === 200 && registrationData?.data) {
      console.log('Registration successful');
      Alert.alert('Success', 'Your account has been created!', [
        { text: 'OK', onPress: () => router.push('/(tabs)') }
      ]);
    }
  }, [registrationData]);

  useEffect(() => {
    if (error) {
      setValidationError(error);
    }
  }, [error]);

  const validateForm = () => {
    if (!name.trim()) {
      setValidationError('Please enter your name');
      return false;
    }

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

    if (password !== confirmPassword) {
      setValidationError('Passwords do not match');
      return false;
    }

    setValidationError('');
    return true;
  };

  const handleRegister = () => {
    if (!validateForm()) {
      return;
    }

    console.log('Register pressed');
    dispatch(clearRegistrationData());

    const registrationPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password: password,
    };

    dispatch(setRegistrationRequest(registrationPayload));
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  const handleGuestContinue = () => {
    router.push('/(tabs)');
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`${provider} sign up pressed`);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
            <Text style={styles.title}>Sign Up to Darkak Mart</Text>
            <Text style={styles.subtitle}>
              Sign Up using social network
            </Text>
          </View>

          <View style={styles.socialContainer}>
            <TouchableOpacity
              style={[styles.socialButton, styles.googleButton]}
              onPress={() => handleSocialSignUp('Google')}
              disabled={loading}
            >
              <View style={styles.socialButtonContent}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="google" size={20} color="#fff" />
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.textContainer}>
                  <Text style={styles.socialButtonText}>SIGN UP WITH GOOGLE</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.facebookButton]}
              onPress={() => handleSocialSignUp('Facebook')}
              disabled={loading}
            >
              <View style={styles.socialButtonContent}>
                <View style={styles.iconContainer}>
                  <FontAwesome5 name="facebook" size={20} color="#fff" />
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.textContainer}>
                  <Text style={styles.socialButtonText}>SIGN UP WITH FACEBOOK</Text>
                </View>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialButton, styles.phoneButton]}
              onPress={() => handleSocialSignUp('Phone')}
              disabled={loading}
            >
              <View style={styles.socialButtonContent}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="phone-android" size={20} color="#fff" />
                </View>
                <View style={styles.verticalDivider} />
                <View style={styles.textContainer}>
                  <Text style={styles.socialButtonText}>SIGN UP WITH PHONE</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          {validationError ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{validationError}</Text>
            </View>
          ) : null}

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              editable={!loading}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={togglePasswordVisibility}
              >
                <Ionicons
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm Password"
                placeholderTextColor="#999"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                editable={!loading}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Ionicons
                  name={showConfirmPassword ? "eye-off" : "eye"}
                  size={24}
                  color="#999"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.registerButton, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.registerButtonText}>Sign Up</Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin} disabled={loading}>
              <Text style={styles.loginButton}>Login</Text>
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
              disabled={loading}
            >
              <Text style={styles.textButtonText}>Continue as a Guest</Text>
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
  registerButton: {
    backgroundColor: '#003366',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  registerButtonText: {
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
  loginButton: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: 'bold',
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

export default RegisterScreen;
