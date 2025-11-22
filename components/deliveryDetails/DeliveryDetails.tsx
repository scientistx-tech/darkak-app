import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export interface DeliveryDetailItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  isHighlighted?: boolean;
  highlightColor?: string;
}

interface DeliveryDetailsProps {
  data: DeliveryDetailItem[];
}

const DeliveryDetails: React.FC<DeliveryDetailsProps> = ({ data }) => {
  const DeliveryItem: React.FC<{ item: DeliveryDetailItem }> = ({ item }) => (
    <View style={styles.deliveryItem}>
      <View style={styles.iconContainer}>
        <Ionicons 
          name={item.icon as any} 
          size={24} 
          color="#3498db" 
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text 
          style={[
            styles.description,
            item.isHighlighted && { 
              color: item.highlightColor || '#e74c3c', 
              fontWeight: '600' 
            }
          ]}
        >
          {item.description}
        </Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Delivery Details</Text>
      </View>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {data.map((item) => (
          <DeliveryItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#87CEEB', // Sky blue background
    borderWidth: 3, // Blue border width
    borderColor: '#3498db', // Blue border color
    borderRadius: 16, // Rounded corners for the border
    padding: 16,
    margin: 8, // Add some margin to see the border clearly
  },
  headerContainer: {
    borderBottomWidth: 2,
    borderBottomColor: '#3498db', // Blue border for header
    marginBottom: 20,
    paddingBottom: 12,
  },
  header: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2c3e50',
    textAlign: 'center',
  },
  scrollContainer: {
    flex: 1,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    borderWidth: 1, 
    borderColor: '#b3e0ff', 
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f4ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#348adbff', 
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});

export default DeliveryDetails;