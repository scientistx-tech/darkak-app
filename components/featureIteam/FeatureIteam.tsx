import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface FeatureItemProps {
  iconName: keyof typeof MaterialCommunityIcons.glyphMap;
  text: string;
}

const FeatureItem = ({ iconName, text }: FeatureItemProps) => (
  <View style={styles.featureItem}>
    <View style={styles.iconContainer}>
      <MaterialCommunityIcons name={iconName} size={30} color="#0A3C8B" />
    </View>
    <Text style={styles.featureText}>{text}</Text>
  </View>
);

const FeaturesSection = () => {
  return (
    <View style={styles.container}>
      <FeatureItem iconName="truck-fast-outline" text="Fast Delivery all across the country" />
      <FeatureItem iconName="shield-half-full" text="Safe Payment" />
      <FeatureItem iconName="refresh" text="7 Days Return Policy" />
      <FeatureItem iconName="certificate" text="100% Authentic Products" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: 30,
  },
  iconContainer: {
    backgroundColor: '#EBF3FF',
    borderRadius: 50,
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#D0E3FF',
  },
  featureText: {
    fontSize: 16,
    color: '#343A40',
    textAlign: 'center',
  },
});

export default FeaturesSection;
