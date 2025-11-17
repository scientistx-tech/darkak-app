import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const NewsletterSubscribeCard: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleSubscribe = () => {
    if (email.trim() === '') {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    Alert.alert('Subscribed!', `Thank you for subscribing with: ${email}`);
    setEmail('');
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.card}>
        <Text style={styles.title}>SUBSCRIBE TO OUR NEWSLETTER</Text>

        <View style={styles.inputButtonContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Your email goes here..."
            placeholderTextColor="#888"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity style={styles.subscribeButton} onPress={handleSubscribe}>
            <Text style={styles.buttonText}>SUBSCRIBE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    // Background removed
    backgroundColor: 'transparent',

    // Prevent going too low
    padding: 0,
    margin: 0,

    width: '100%',
    alignItems: 'center',
  },

  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 30,
    paddingHorizontal: 20,
    width: '95%',
    maxWidth: 500,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A3C8B',
    marginBottom: 25,
    textAlign: 'center',
  },

  inputButtonContainer: {
    flexDirection: 'row',
    width: '100%',
    borderRadius: 5,
    overflow: 'hidden',
  },

  textInput: {
    flex: 2.5,
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  subscribeButton: {
    flex: 1.5,
    backgroundColor: '#6699FF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },

  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default NewsletterSubscribeCard;
