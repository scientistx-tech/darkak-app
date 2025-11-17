// InfoCardsSection.tsx
import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import CardButton from '../cardButton/CardButton';


const InfoCardsSection: React.FC = () => {
  const handlePress = (cardName: string) => {
    Alert.alert(`You pressed ${cardName}`);
  };

  return (
    <View style={styles.sectionContainer}>
      <CardButton
        iconName="office-building"
        title="About us"
        description="Know about our company more."
        onPress={() => handlePress('About us')}
      />

      <CardButton
        iconName="message-text"
        title="Contact Us"
        description="We are here to help"
        onPress={() => handlePress('Contact Us')}
      />
      <CardButton
        iconName="frequently-asked-questions" 
        title="FAQ"
        description="Get all Answers"
        onPress={() => handlePress('FAQ')}
      />
      <CardButton
        iconName="account-lock" 
        title="Privacy Policy"
        description="Understand how we protect your data."
        onPress={() => handlePress('Privacy Policy')}
      />
    </View>
  );
};

export default InfoCardsSection;

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 10,
  },
});
