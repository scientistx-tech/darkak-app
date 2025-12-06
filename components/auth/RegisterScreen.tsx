import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearRegistrationData, setRegistrationRequest } from '@/redux/actions/registration.action';
import { RootState } from '@/redux/store';


// Props interface
interface RegisterScreenProps {
  onRegisterSuccess?: () => void;
  onLoginPress?: () => void;
  onGuestContinue?: () => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ 
  onRegisterSuccess, 
  onLoginPress,
  onGuestContinue 
}) => {
  const dispatch = useDispatch(); 
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const registredData = useSelector((state: RootState) => state?.registrationUser);

  const handleRegister = () => {
    console.log('Register pressed');
    dispatch(clearRegistrationData());
    const registrationPayload = {
      name: name,
      email: email,
      password: password,
    };
    dispatch(setRegistrationRequest(registrationPayload));
    if (onRegisterSuccess) {
      onRegisterSuccess();
    }
  };

  const handleLogin = () => {
    console.log('Login pressed');
    if (onLoginPress) {
      onLoginPress();
    }
  };

  const handleGuestContinue = () => {
    console.log('Continue as Guest pressed');
    if (onGuestContinue) {
      onGuestContinue();
    }
  };

  const handleSocialLogin = (provider: string) => {
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Sign Up to {`Darkak Mart`}</Text>
            <Text style={styles.subtitle}>
              Sign Up using social network
            </Text>
          </View>

          {/* Social Login Buttons */}
          <View style={styles.socialContainer}>
            {/* Google Login - Red Background */}
            <TouchableOpacity 
              style={[styles.socialButton, styles.googleButton]} 
              onPress={() => handleSocialLogin('Google')}
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

          {/* Form Inputs */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#999"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter Password"
                placeholderTextColor="#999"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={togglePasswordVisibility}
              >
                <Ionicons 
                  name={showPassword ? "eye-off" : "eye"} 
                  size={24} 
                  color="#666" 
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
              />
              <TouchableOpacity 
                style={styles.eyeButton}
                onPress={toggleConfirmPasswordVisibility}
              >
                <Ionicons 
                  name={showConfirmPassword ? "eye-off" : "eye"} 
                  size={24} 
                  color="#666" 
                />
              </TouchableOpacity>
            </View>

            {/* Sign Up Button - Navy Blue */}
            <TouchableOpacity 
              style={styles.signUpButton} 
              onPress={handleRegister}
            >
              <Text style={styles.signUpButtonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>

          {/* Login Section */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>
              Already have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleLogin}>
              <Text style={styles.loginButton}>Log In</Text>
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
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
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
    height: 50,
    overflow: 'hidden',
  },
  socialButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 60,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  textContainer: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  verticalDivider: {
    width: 2,
    height: '100%',
    backgroundColor: '#ffffff',
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  googleButton: {
    backgroundColor: '#DB4437',
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
    marginHorizontal: 16,
    color: '#666',
    fontWeight: '600',
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
  signUpButton: {
    backgroundColor: '#003366',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    alignItems: 'center',
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 14,
    color: '#666',
  },
  loginButton: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  optionsContainer: {
    alignItems: 'center',
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
});

export default RegisterScreen;