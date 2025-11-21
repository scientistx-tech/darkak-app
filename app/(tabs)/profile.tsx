import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import React, { useState } from "react";
import { FontAwesome, Entypo, MaterialIcons } from "@expo/vector-icons";

const Profile = () => {
  const [isvisible,satIsvisible] = useState(false);
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome Back</Text>
      <Text style={styles.loginHint}>Login using your social account or email</Text>

      {/* Google Login */}
      <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
        <FontAwesome name="google" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.socialButtonText}>LOGIN WITH GOOGLE</Text>
      </TouchableOpacity>

      {/* Facebook Login */}
      <TouchableOpacity style={[styles.socialButton, styles.facebookButton]}>
        <FontAwesome name="facebook" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.socialButtonText}>LOGIN WITH FACEBOOK</Text>
      </TouchableOpacity>

      {/* Phone Login */}
      <TouchableOpacity style={[styles.socialButton, styles.phoneButton]}>
        <FontAwesome name="phone" size={20} color="#fff" style={{ marginRight: 10 }} />
        <Text style={styles.socialButtonText}>LOGIN WITH PHONE</Text>
      </TouchableOpacity>

      {/* OR Line */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      {/* Password Input */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter Password"
          secureTextEntry
        />
        <TouchableOpacity style={styles.eyeIconContainer}>
          <Entypo name="eye" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Forgot Password */}
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* OR Line */}
      <View style={styles.orContainer}>
        <View style={styles.line} />
        <Text style={styles.orText}>OR</Text>
        <View style={styles.line} />
      </View>

      {/* Register */}
      <Text style={styles.registerHint}>
        Dont have an account? <Text style={styles.registerNowText}>Register Now</Text>
      </Text>

      {/* Guest Login */}
      <TouchableOpacity>
        <Text style={styles.guestLoginText}>Continue as a Guest</Text>
      </TouchableOpacity>

      {/* Moderator Login */}
      <TouchableOpacity>
        <Text style={styles.moderatorLoginText}>Moderator Login</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  loginHint: {
    fontSize: 14,
    color: "#666",
    marginBottom: 30,
  },
  socialButton: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  googleButton: {
    backgroundColor: "#ea4335",
  },
  facebookButton: {
    backgroundColor: "#4267b2",
  },
  phoneButton: {
    backgroundColor: "#34a853",
  },
  socialButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginVertical: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
  },
  orText: {
    marginHorizontal: 10,
    color: "#666",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: "center",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  eyeIconContainer: {
    padding: 10,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#d9534f",
    fontSize: 14,
  },
  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#0d47a1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  registerHint: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  registerNowText: {
    color: "#0d47a1",
    fontWeight: "bold",
  },
  guestLoginText: {
    color: "#0d47a1",
    fontSize: 16,
    marginBottom: 10,
  },
  moderatorLoginText: {
    color: "#0d47a1",
    fontSize: 16,
  },
});
