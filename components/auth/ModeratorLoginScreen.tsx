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
interface ModeratorLoginScreenProps {
  onLoginSuccess?: () => void;
  onForgotPassword?: () => void;
  onBackToUserLogin?: () => void;
}

const ModeratorLoginScreen: React.FC<ModeratorLoginScreenProps> = ({ 
  onLoginSuccess, 
  onForgotPassword,
  onBackToUserLogin 
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    console.log('Moderator Login pressed');
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleForgotPassword = () => {
    console.log('Forgot Password pressed');
    if (onForgotPassword) {
      onForgotPassword();
    }
  };

  const handleBackToUserLogin = () => {
    console.log('Back to User Login pressed');
    if (onBackToUserLogin) {
      onBackToUserLogin();
    }
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
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Moderator Login</Text>
            <Text style={styles.subtitle}>
              Access moderator dashboard
            </Text>
          </View>

          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={handleBackToUserLogin}
          >
            <Ionicons name="arrow-back" size={24} color="#007bff" />
            <Text style={styles.backButtonText}>Back to User Login</Text>
          </TouchableOpacity>

          {/* Email and Password Inputs */}
          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Moderator Email"
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

            {/* Forgot Password Button with Underline */}
            <TouchableOpacity 
              style={styles.forgotPasswordButton} 
              onPress={handleForgotPassword}
            >
              <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            {/* Login Button - Different Color for Moderator */}
            <TouchableOpacity 
              style={styles.loginButton} 
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Moderator Login</Text>
            </TouchableOpacity>
          </View>

          {/* Warning Text */}
          <View style={styles.warningContainer}>
            <Ionicons name="warning" size={20} color="#ffc107" />
            <Text style={styles.warningText}>
              This section is for authorized moderators only.
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
    marginBottom: 30,
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: '#007bff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
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
    color: '#dc3545',
    fontSize: 14,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  loginButton: {
    backgroundColor: '#28a745', // Green color for moderator
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ffeaa7',
  },
  warningText: {
    color: '#856404',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 8,
    textAlign: 'center',
  },
});

export default ModeratorLoginScreen;