import { Image, StyleSheet, TouchableOpacity, View, Animated } from "react-native";
import React, { useEffect, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

const HeaderComponent = () => {
  const logoAnim = useRef(new Animated.Value(-100)).current; // left to right
  const iconAnim = useRef(new Animated.Value(100)).current;  // right to left
  const fadeAnim = useRef(new Animated.Value(0)).current;    // fade-in

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(iconAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      
      {/* Logo slides from left */}
      <Animated.Image
        source={require("../../assets/product/RR.png")}
        style={[
          styles.logo,
          {
            transform: [{ translateX: logoAnim }],
          },
        ]}
      />

      {/* Menu Icon slides from right */}
      <Animated.View
        style={{
          transform: [{ translateX: iconAnim }],
        }}
      >
        <TouchableOpacity style={styles.iconButton}>
          <FontAwesome5 name="align-justify" size={22} color="white" />
        </TouchableOpacity>
      </Animated.View>

    </Animated.View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0066FF",
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconButton: {
    padding: 8,
  },
});
