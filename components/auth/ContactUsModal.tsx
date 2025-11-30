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
  Alert,
  Linking,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Props interface
interface ContactUsModalProps {
  onClose?: () => void;
}

const ContactUsModal: React.FC<ContactUsModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSendMessage = () => {
    if (!name || !email || !phone || !subject || !message) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    // Here you would typically send the message to your backend
    console.log('Sending message:', { name, email, phone, subject, message });
    
    Alert.alert('Success', 'Your message has been sent! We will get back to you soon.');
    
    // Reset form
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:info@darkak.com.bd');
  };

  const handlePhonePress = () => {
    Linking.openURL('tel:01711726501');
  };

  const handleLocationPress = () => {
    // Open location in maps
    const location = 'Upashahar, Bogura -5800';
    Linking.openURL(`https://maps.google.com/?q=${encodeURIComponent(location)}`);
  };

  const handleSocialMedia = (platform: string) => {
    const urls: { [key: string]: string } = {
      facebook: 'https://facebook.com/darkak',
      twitter: 'https://twitter.com/darkak',
      instagram: 'https://instagram.com/darkak',
      linkedin: 'https://linkedin.com/company/darkak',
    };

    if (urls[platform]) {
      Linking.openURL(urls[platform]);
    } else {
      Alert.alert('Info', `${platform} link will open here`);
    }
  };

  const handleBack = () => {
    if (onClose) {
      onClose();
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Header with Back Button */}
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.backButton}
              onPress={handleBack}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Contact Us</Text>
            <View style={styles.headerPlaceholder} />
          </View>

          {/* Main Content */}
          <View style={styles.content}>
            {/* Welcome Section */}
            <View style={styles.welcomeSection}>
              <Text style={styles.welcomeTitle}>Get in Touch</Text>
              <Text style={styles.welcomeSubtitle}>
                We{`'`}d love to hear from you. Send us a message and we{`'`}ll respond as soon as possible.
              </Text>
            </View>

            {/* Contact Form Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Send us a message</Text>
              
              <View style={styles.formContainer}>
                {/* Name and Email Row */}
                <View style={styles.row}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Your Name"
                      placeholderTextColor="#999"
                      value={name}
                      onChangeText={setName}
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="your@email.com"
                      placeholderTextColor="#999"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />
                  </View>
                </View>

                {/* Phone and Subject Row */}
                <View style={styles.row}>
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Phone</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Phone Number"
                      placeholderTextColor="#999"
                      keyboardType="phone-pad"
                      value={phone}
                      onChangeText={setPhone}
                    />
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Subject</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Subject"
                      placeholderTextColor="#999"
                      value={subject}
                      onChangeText={setSubject}
                    />
                  </View>
                </View>

                {/* Message */}
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Message</Text>
                  <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Your message..."
                    placeholderTextColor="#999"
                    multiline={true}
                    numberOfLines={5}
                    textAlignVertical="top"
                    value={message}
                    onChangeText={setMessage}
                  />
                </View>

                {/* Send Button */}
                <TouchableOpacity 
                  style={styles.sendButton} 
                  onPress={handleSendMessage}
                >
                  <Text style={styles.sendButtonText}>Send Message</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Contact Information Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Contact Information</Text>
              
              <View style={styles.contactInfoContainer}>
                {/* Email */}
                <TouchableOpacity 
                  style={styles.contactItem}
                  onPress={handleEmailPress}
                >
                  <View style={styles.contactIcon}>
                    <Ionicons name="mail" size={20} color="#003366" />
                  </View>
                  <View style={styles.contactTextContainer}>
                    <Text style={styles.contactLabel}>Email</Text>
                    <Text style={styles.contactValue}>info@darkak.com.bd</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#999" />
                </TouchableOpacity>

                {/* Phone */}
                <TouchableOpacity 
                  style={styles.contactItem}
                  onPress={handlePhonePress}
                >
                  <View style={styles.contactIcon}>
                    <Ionicons name="call" size={20} color="#003366" />
                  </View>
                  <View style={styles.contactTextContainer}>
                    <Text style={styles.contactLabel}>Phone</Text>
                    <Text style={styles.contactValue}>01711726501</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#999" />
                </TouchableOpacity>

                {/* Location */}
                <TouchableOpacity 
                  style={styles.contactItem}
                  onPress={handleLocationPress}
                >
                  <View style={styles.contactIcon}>
                    <Ionicons name="location" size={20} color="#003366" />
                  </View>
                  <View style={styles.contactTextContainer}>
                    <Text style={styles.contactLabel}>Location</Text>
                    <Text style={styles.contactValue}>Upashahar, Bogura -5800</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#999" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Business Hours */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Business Hours</Text>
              <View style={styles.hoursContainer}>
                <View style={styles.hourItem}>
                  <Text style={styles.hourDay}>Monday - Friday</Text>
                  <Text style={styles.hourTime}>9:00 AM - 6:00 PM</Text>
                </View>
                <View style={styles.hourItem}>
                  <Text style={styles.hourDay}>Saturday</Text>
                  <Text style={styles.hourTime}>10:00 AM - 4:00 PM</Text>
                </View>
                <View style={styles.hourItem}>
                  <Text style={styles.hourDay}>Sunday</Text>
                  <Text style={styles.hourTime}>Closed</Text>
                </View>
              </View>
            </View>

            {/* Social Media Links */}
            <View style={styles.socialSection}>
              <Text style={styles.socialTitle}>Follow Us</Text>
              <Text style={styles.socialSubtitle}>
                Stay connected with us on social media
              </Text>
              <View style={styles.socialIcons}>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => handleSocialMedia('facebook')}
                >
                  <Ionicons name="logo-facebook" size={24} color="#4267B2" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => handleSocialMedia('twitter')}
                >
                  <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => handleSocialMedia('instagram')}
                >
                  <Ionicons name="logo-instagram" size={24} color="#E1306C" />
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.socialIcon}
                  onPress={() => handleSocialMedia('linkedin')}
                >
                  <Ionicons name="logo-linkedin" size={24} color="#0077B5" />
                </TouchableOpacity>
              </View>
            </View>
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
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  headerPlaceholder: {
    width: 40,
  },
  content: {
    flex: 1,
  },
  welcomeSection: {
    padding: 24,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  formContainer: {
    gap: 16,
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  inputContainer: {
    flex: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#dee2e6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  sendButton: {
    backgroundColor: '#003366',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactInfoContainer: {
    gap: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 8,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactTextContainer: {
    flex: 1,
  },
  contactLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  hoursContainer: {
    gap: 12,
  },
  hourItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  hourDay: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  hourTime: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  socialSection: {
    padding: 24,
    alignItems: 'center',
  },
  socialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  socialSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 20,
  },
  socialIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
});

export default ContactUsModal;