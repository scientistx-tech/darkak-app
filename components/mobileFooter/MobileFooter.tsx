import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';

interface FooterLinkProps {
  text: string;
  onPress: () => void;
  isMainLink?: boolean;
}

const FooterLink: React.FC<FooterLinkProps> = ({ text, onPress, isMainLink = false }) => (
  <TouchableOpacity onPress={onPress} style={styles.linkButton}>
    <Text style={isMainLink ? styles.mainLinkText : styles.subLinkText}>{text}</Text>
  </TouchableOpacity>
);

const MobileFooter: React.FC = () => {
  const handleLinkPress = (url: string, type: 'web' | 'email' | 'phone' | 'appStore' | 'playStore') => {
    switch (type) {
      case 'email':
        Linking.openURL(`mailto:${url}`);
        break;
      case 'phone':
        Linking.openURL(`tel:${url}`);
        break;
      case 'appStore':
        Linking.openURL(Platform.OS === 'ios' ? url : url);
        break;
      case 'playStore':
        Linking.openURL(Platform.OS === 'android' ? url : url);
        break;
      default:
        Linking.openURL(url).catch(err => console.error('Failed to open URL:', err));
    }
  };

  const socialLinks = {
    facebook: 'https://facebook.com/yourpage',
    instagram: 'https://instagram.com/yourpage',
    youtube: 'https://youtube.com/yourchannel',
    pinterest: 'https://pinterest.com/yourpage',
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Quick Links */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <FooterLink text="Home" onPress={() => handleLinkPress('https://yourwebsite.com/home', 'web')} />
        <FooterLink text="Shop" onPress={() => handleLinkPress('https://yourwebsite.com/shop', 'web')} />
        <FooterLink text="Blogs" onPress={() => handleLinkPress('https://yourwebsite.com/blogs', 'web')} />
        <FooterLink text="Contact Us" onPress={() => handleLinkPress('https://yourwebsite.com/contact', 'web')} />
      </View>

      {/* Support */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <FooterLink text="About Us" onPress={() => handleLinkPress('https://yourwebsite.com/about', 'web')} />
        <FooterLink text="Privacy Policy" onPress={() => handleLinkPress('https://yourwebsite.com/privacy', 'web')} />
        <FooterLink text="Terms and Condition" onPress={() => handleLinkPress('https://yourwebsite.com/terms', 'web')} />
        <FooterLink text="Return and Refund Policy" onPress={() => handleLinkPress('https://yourwebsite.com/return', 'web')} />
        <FooterLink text="FAQ" onPress={() => handleLinkPress('https://yourwebsite.com/faq', 'web')} />
      </View>

      {/* Product Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Product Categories</Text>
        <FooterLink text="Women" onPress={() => handleLinkPress('https://yourwebsite.com/women', 'web')} />
        <FooterLink text="Men" onPress={() => handleLinkPress('https://yourwebsite.com/men', 'web')} />
        <FooterLink text="Consumer Electronics" onPress={() => handleLinkPress('https://yourwebsite.com/electronics', 'web')} />
        <FooterLink text="Beauty & Health" onPress={() => handleLinkPress('https://yourwebsite.com/beauty', 'web')} />
        <FooterLink text="Toys & Games" onPress={() => handleLinkPress('https://yourwebsite.com/toys', 'web')} />
        <FooterLink text="Jewelry, Watches & Accessories" onPress={() => handleLinkPress('https://yourwebsite.com/jewelry', 'web')} />
        <FooterLink text="Computer Office & Education" onPress={() => handleLinkPress('https://yourwebsite.com/office', 'web')} />
        <FooterLink text="Kids Zone" onPress={() => handleLinkPress('https://yourwebsite.com/kids', 'web')} />
      </View>

      {/* Download Our Mobile App */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Download Our Mobile App</Text>

        <TouchableOpacity
          style={styles.appStoreButton}
          onPress={() => handleLinkPress('https://apps.apple.com/us/app/apple-store/id375380948', 'appStore')}
        >
          <FontAwesome name="apple" size={20} color="white" style={styles.appStoreIcon} />
          <View>
            <Text style={styles.appStoreTextSmall}>Download on the</Text>
            <Text style={styles.appStoreTextLarge}>App Store</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.appStoreButton}
          onPress={() => handleLinkPress('https://play.google.com/store/apps/details?id=com.yourapp.package', 'playStore')}
        >
          <FontAwesome5 name="google-play" size={20} color="white" style={styles.appStoreIcon} />
          <View>
            <Text style={styles.appStoreTextSmall}>GET IT ON</Text>
            <Text style={styles.appStoreTextLarge}>Google Play</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Contact Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Contact Us Anytime</Text>

        <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('info@yourdomain.com', 'email')}>
          <MaterialCommunityIcons name="email-outline" size={20} color="#ADD8E6" />
          <Text style={styles.contactText}>info@yourdomain.com</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.contactItem} onPress={() => handleLinkPress('01711123456', 'phone')}>
          <MaterialCommunityIcons name="phone-outline" size={20} color="#ADD8E6" />
          <Text style={styles.contactText}>01711123456</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.contactItem}
          onPress={() => Linking.openURL('https://maps.app.goo.gl/yourlocation')}
        >
          <MaterialCommunityIcons name="map-marker-outline" size={20} color="#ADD8E6" />
          <Text style={styles.contactText}>Upazillah: Bogura - 5800</Text>
        </TouchableOpacity>
      </View>

      {/* Social Icons */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Stay Connected</Text>
        <View style={styles.socialIconsContainer}>
          <TouchableOpacity style={styles.socialIcon} onPress={() => handleLinkPress(socialLinks.facebook, 'web')}>
            <MaterialCommunityIcons name="facebook" size={24} color="#ADD8E6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon} onPress={() => handleLinkPress(socialLinks.instagram, 'web')}>
            <MaterialCommunityIcons name="instagram" size={24} color="#ADD8E6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon} onPress={() => handleLinkPress(socialLinks.youtube, 'web')}>
            <MaterialCommunityIcons name="youtube" size={24} color="#ADD8E6" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialIcon} onPress={() => handleLinkPress(socialLinks.pinterest, 'web')}>
            <MaterialCommunityIcons name="pinterest" size={24} color="#ADD8E6" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => handleLinkPress('https://yourwebsite.com/register', 'web')}
      >
        <Text style={styles.registerButtonText}>Register Now</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0F2C5C',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  linkButton: {
    paddingVertical: 8,
  },
  mainLinkText: {
    color: '#ADD8E6',
    fontSize: 16,
  },
  subLinkText: {
    color: '#ADD8E6',
    fontSize: 14,
  },
  appStoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: 170,
  },
  appStoreIcon: {
    marginRight: 10,
  },
  appStoreTextSmall: {
    color: '#ccc',
    fontSize: 10,
  },
  appStoreTextLarge: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactText: {
    color: '#ADD8E6',
    fontSize: 14,
    marginLeft: 10,
  },
  socialIconsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  socialIcon: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 20,
    padding: 8,
    marginRight: 10,
  },
  registerButton: {
    backgroundColor: '#6699FF',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default MobileFooter;
