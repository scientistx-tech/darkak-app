// ProfileCard.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Expo vector icons

type ProfileData = {
  name: string;
  email?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  maritalStatus?: string;
  address?: string;
  avatarUrl?: string;
};

type Props = {
  data: ProfileData;
  onEditAvatar?: () => void;
};

const ProfileCard: React.FC<Props> = ({ data, onEditAvatar }) => {
  const infoItems = [
    { label: "Name", value: data.name, icon: "person" },
    { label: "Email", value: data.email ?? "N/A", icon: "mail" },
    { label: "Phone", value: data.phone ?? "N/A", icon: "call" },
    { label: "Date of Birth", value: data.dob ?? "N/A", icon: "calendar" },
    { label: "Gender", value: data.gender ?? "N/A", icon: "heart" },
    { label: "Marital Status", value: data.maritalStatus ?? "N/A", icon: "ribbon" },
    { label: "Address", value: data.address ?? "Not Provided", icon: "location" },
  ];

  return (
    <View style={styles.card}>
      {/* Avatar */}
      <View style={styles.avatarContainer}>
        <Image
          source={
            data.avatarUrl
              ? { uri: data.avatarUrl }
              : require("../../assets/category/c1.png")
          }
          style={styles.avatar}
        />
        {onEditAvatar && (
          <TouchableOpacity style={styles.editIcon} onPress={onEditAvatar}>
            <Ionicons name="camera" size={18} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.sectionTitle}>Personal Information</Text>

      {/* Info Grid */}
      <View style={styles.infoGrid}>
        {infoItems.map((item, idx) => (
          <View key={idx} style={styles.infoItem}>
            <View style={styles.iconCircle}>
              <Ionicons name={item.icon as any} size={18} color="#fff" />
            </View>
            <View style={styles.infoText}>
              <Text style={styles.label}>{item.label}</Text>
              <Text style={styles.value}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default ProfileCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#F0F4FF",
    borderRadius: 12,
    borderWidth:1,
    padding: 16,
    margin: 16,
    alignItems: "center",
  },
  avatarContainer: {
    position: "relative",
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#0B3B8C",
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#0B3B8C",
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0B3B8C",
    alignSelf: "flex-start",
    marginBottom: 12,
  },
  infoGrid: {
    width: "100%",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#0B3B8C",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  infoText: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: "#555",
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
});
