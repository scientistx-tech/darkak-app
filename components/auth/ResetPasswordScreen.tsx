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
import { Ionicons } from '@expo/vector-icons';

// Props interface
interface ResetPasswordScreenProps {
  onSendOTP?: () => void;
  onLoginPress?: () => void;
  onRegisterPress?: () => void;
  onGuestContinue?: () => void;
}

const ResetPasswordScreen: React.FC<ResetPasswordScreenProps> = ({ 
  onSendOTP, 
  onLoginPress,
  onRegisterPress,
  onGuestContinue 
}) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');

  const handleSendOTP = () => {
    console.log('Send OTP pressed');
    if (onSendOTP) {
      onSendOTP();
    }
  };

  const handleLogin = () => {
    console.log('Login pressed');
    if (onLoginPress) {
      onLoginPress();
    }
  };

  const handleRegister = () => {
    console.log('Register Now pressed');
    if (onRegisterPress) {
      onRegisterPress();
    }
  };

  const handleGuestContinue = () => {
    console.log('Continue as Guest pressed');
    if (onGuestContinue) {
      onGuestContinue();
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
              placeholder="Email or Phone"
              placeholderTextColor="#999"
              keyboardType="email-address"
              autoCapitalize="none"
              value={emailOrPhone}
              onChangeText={setEmailOrPhone}
            />

            {/* Send OTP Button - Navy Blue */}
            <TouchableOpacity 
              style={styles.sendOTPButton} 
              onPress={handleSendOTP}
            >
              <Text style={styles.sendOTPButtonText}>Send for OTP</Text>
            </TouchableOpacity>
          </View>

          {/* Register Section */}
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>
              Don{`'`}t have an account?{' '}
            </Text>
            <TouchableOpacity onPress={handleRegister}>
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
  },
  sendOTPButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
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

export default ResetPasswordScreen;