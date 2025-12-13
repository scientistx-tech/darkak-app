import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const ContactUsScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSendMessage = () => {
    if (!name || !email || !phone || !subject || !message) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    console.log('Sending message:', { name, email, phone, subject, message });
    
    Alert.alert('Success', 'Your message has been sent! We will get back to you soon.');
    
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
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Get In Touch</Text>
            <Text style={styles.welcomeSubtitle}>
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Send us a Message</Text>
            <View style={styles.formContainer}>
              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Name *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Your Name"
                    placeholderTextColor="#999"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Email *</Text>
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

              <View style={styles.row}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Phone *</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="+880 1234567890"
                    placeholderTextColor="#999"
                    keyboardType="phone-pad"
                    value={phone}
                    onChangeText={setPhone}
                  />
                </View>
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Subject *</Text>
                <TextInput
                  style={styles.input}
                  placeholder="How can we help?"
                  placeholderTextColor="#999"
                  value={subject}
                  onChangeText={setSubject}
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.label}>Message *</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  placeholder="Your message..."
                  placeholderTextColor="#999"
                  multiline
                  numberOfLines={6}
                  textAlignVertical="top"
                  value={message}
                  onChangeText={setMessage}
                />
              </View>

              <TouchableOpacity 
                style={styles.sendButton}
                onPress={handleSendMessage}
              >
                <Text style={styles.sendButtonText}>Send Message</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            <View style={styles.contactInfoContainer}>
              <TouchableOpacity style={styles.contactItem} onPress={handleEmailPress}>
                <View style={styles.contactIcon}>
                  <Ionicons name="mail-outline" size={24} color="#003366" />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>Email</Text>
                  <Text style={styles.contactValue}>info@darkak.com.bd</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem} onPress={handlePhonePress}>
                <View style={styles.contactIcon}>
                  <Ionicons name="call-outline" size={24} color="#003366" />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>Phone</Text>
                  <Text style={styles.contactValue}>01711726501</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style={styles.contactItem} onPress={handleLocationPress}>
                <View style={styles.contactIcon}>
                  <Ionicons name="location-outline" size={24} color="#003366" />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactLabel}>Address</Text>
                  <Text style={styles.contactValue}>Upashahar, Bogura -5800</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Business Hours</Text>
            <View style={styles.hoursContainer}>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Saturday - Thursday</Text>
                <Text style={styles.hourTime}>9:00 AM - 8:00 PM</Text>
              </View>
              <View style={styles.hourItem}>
                <Text style={styles.hourDay}>Friday</Text>
                <Text style={styles.hourTime}>Closed</Text>
              </View>
            </View>
          </View>

          <View style={styles.socialSection}>
            <Text style={styles.socialTitle}>Follow Us</Text>
            <Text style={styles.socialSubtitle}>Stay connected on social media</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => handleSocialMedia('facebook')}
              >
                <FontAwesome5 name="facebook-f" size={20} color="#4267B2" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => handleSocialMedia('twitter')}
              >
                <FontAwesome5 name="twitter" size={20} color="#1DA1F2" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => handleSocialMedia('instagram')}
              >
                <FontAwesome5 name="instagram" size={20} color="#E4405F" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.socialIcon}
                onPress={() => handleSocialMedia('linkedin')}
              >
                <FontAwesome5 name="linkedin-in" size={20} color="#0077B5" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
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

export default ContactUsScreen;
