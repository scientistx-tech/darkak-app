import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';

interface ReturnRefundComponentProps {
  onBack: () => void;
}

const ReturnRefundComponent: React.FC<ReturnRefundComponentProps> = ({ onBack }) => {
  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}># Return & Refund Request</Text>

        {/* Select Order */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>## Select Order</Text>
          <View style={styles.dropdown}>
            <Text style={styles.placeholderText}>
              - Choose an Order -
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
          </View>
        </View>

        {/* Upload Images/Video */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>## Upload Image(s) or Video</Text>
          <TouchableOpacity style={styles.uploadButton}>
            <FontAwesome name="cloud-upload" size={24} color="#007AFF" />
            <Text style={styles.uploadButtonText}>Choose Files</Text>
          </TouchableOpacity>
          <Text style={styles.fileText}>
            No file chosen
          </Text>
        </View>

        {/* Reason for Return */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>## Reason for Return</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Write the reason you want to return the product..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
            editable={false}
          />
        </View>

        {/* Return Method */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>## Return Method</Text>
          <View style={styles.dropdown}>
            <Text style={styles.placeholderText}>
              - Choose a Method -
            </Text>
            <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
          </View>
        </View>

        {/* Note Section */}
        <View style={styles.noteSection}>
          <Text style={styles.noteTitle}>**Note:**</Text>
          <Text style={styles.noteText}>
            You will receive a coupon equal to your order value. It can be used as a discount on your next purchase.
          </Text>
        </View>

        {/* Separator */}
        <View style={styles.separator} />

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 16,
    paddingTop: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  dropdown: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  placeholderText: {
    fontSize: 16,
    color: '#999',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#007AFF',
    borderStyle: 'dashed',
    borderRadius: 8,
    padding: 20,
    backgroundColor: '#f0f8ff',
    gap: 8,
  },
  uploadButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  fileText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  textArea: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
    minHeight: 100,
    textAlignVertical: 'top',
    color: '#999',
  },
  noteSection: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
    marginBottom: 20,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 4,
  },
  noteText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 20,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReturnRefundComponent;