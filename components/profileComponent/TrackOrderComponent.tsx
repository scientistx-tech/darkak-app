import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface TrackOrderComponentProps {
  onBack: () => void;
}

const TrackOrderComponent: React.FC<TrackOrderComponentProps> = ({ onBack }) => {
  const [orderId, setOrderId] = useState('');
  const [loading, setLoading] = useState(false);
  const [orderDetails, setOrderDetails] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrackOrder = async () => {
    if (!orderId.trim()) {
      setError('Please enter an order ID');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      
      // Mock response - Replace with actual API call
      if (orderId.toLowerCase() === 'ord12345') {
        setOrderDetails({
          id: 'ORD12345',
          status: 'shipped',
          estimatedDelivery: '2024-03-20',
          currentLocation: 'Dhaka Distribution Center',
          trackingSteps: [
            { status: 'ordered', description: 'Order Placed', date: '2024-03-15', completed: true },
            { status: 'confirmed', description: 'Order Confirmed', date: '2024-03-15', completed: true },
            { status: 'processed', description: 'Processing', date: '2024-03-16', completed: true },
            { status: 'shipped', description: 'Shipped', date: '2024-03-17', completed: true },
            { status: 'out_for_delivery', description: 'Out for Delivery', date: '2024-03-19', completed: false },
            { status: 'delivered', description: 'Delivered', date: '', completed: false }
          ]
        });
      } else {
        setError('Failed to load order details.');
        setOrderDetails(null);
      }
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'shipped':
        return '#2196F3';
      case 'processing':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'ordered':
        return 'Order Placed';
      case 'confirmed':
        return 'Confirmed';
      case 'processed':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'out_for_delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}># Track your order here</Text>

        {/* Order ID Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Order ID (e.g., ORD12345)"
            value={orderId}
            onChangeText={(text) => {
              setOrderId(text);
              setError('');
            }}
            onSubmitEditing={handleTrackOrder}
          />
          <TouchableOpacity
            style={styles.trackButton}
            onPress={handleTrackOrder}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.trackButtonText}>Track</Text>
            )}
          </TouchableOpacity>
        </View>

        {error ? (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={48} color="#F44336" />
            <Text style={styles.errorText}>{error}</Text>
            <Text style={styles.errorHint}>
              Try using: ORD12345
            </Text>
          </View>
        ) : orderDetails ? (
          <View style={styles.orderDetailsContainer}>
            {/* Order Summary */}
            <View style={styles.orderSummary}>
              <Text style={styles.orderId}>Order #: {orderDetails.id}</Text>
              <View style={[
                styles.statusBadge,
                { backgroundColor: getStatusColor(orderDetails.status) }
              ]}>
                <Text style={styles.statusText}>
                  {getStatusText(orderDetails.status)}
                </Text>
              </View>
            </View>

            {/* Tracking Timeline */}
            <View style={styles.timelineContainer}>
              <Text style={styles.timelineTitle}>Tracking History</Text>
              {orderDetails.trackingSteps.map((step: any, index: number) => (
                <View key={step.status} style={styles.timelineItem}>
                  <View style={styles.timelineLeft}>
                    <View style={[
                      styles.timelineDot,
                      step.completed && styles.completedDot
                    ]}>
                      {step.completed && (
                        <MaterialIcons name="check" size={12} color="#fff" />
                      )}
                    </View>
                    {index < orderDetails.trackingSteps.length - 1 && (
                      <View style={styles.timelineLine} />
                    )}
                  </View>
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineStep}>{step.description}</Text>
                    {step.date && (
                      <Text style={styles.timelineDate}>{step.date}</Text>
                    )}
                  </View>
                </View>
              ))}
            </View>

            {/* Additional Info */}
            <View style={styles.additionalInfo}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Estimated Delivery:</Text>
                <Text style={styles.infoValue}>{orderDetails.estimatedDelivery}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Current Location:</Text>
                <Text style={styles.infoValue}>{orderDetails.currentLocation}</Text>
              </View>
            </View>
          </View>
        ) : (
          // Initial state - before tracking
          <View style={styles.initialState}>
            <MaterialIcons name="local-shipping" size={64} color="#ccc" />
            <Text style={styles.initialText}>
              Enter your order ID to track your package
            </Text>
            <Text style={styles.initialSubText}>
              You can find your order ID in your order confirmation email
            </Text>
          </View>
        )}

        {/* Pagination Placeholder - As shown in design */}
        <View style={styles.paginationContainer}>
          <View style={styles.pagination}>
            <TouchableOpacity style={styles.paginationButton}>
              <Text style={styles.paginationSymbol}>〈</Text>
            </TouchableOpacity>
            
            <View style={styles.pageInfo}>
              <Text style={styles.pageText}>1</Text>
            </View>

            <TouchableOpacity style={styles.paginationButton}>
              <Text style={styles.paginationSymbol}>〉</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 12,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  trackButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  trackButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  errorContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    backgroundColor: '#ffebee',
    borderRadius: 12,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  errorHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  initialState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  initialText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  initialSubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  orderDetailsContainer: {
    marginBottom: 20,
  },
  orderSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  timelineContainer: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  timelineTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  timelineLeft: {
    alignItems: 'center',
    marginRight: 16,
    width: 24,
  },
  timelineDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  completedDot: {
    backgroundColor: '#4CAF50',
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingBottom: 16,
  },
  timelineStep: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 12,
    color: '#666',
  },
  additionalInfo: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  paginationContainer: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    padding: 4,
  },
  paginationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationSymbol: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pageInfo: {
    paddingHorizontal: 20,
  },
  pageText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
});

export default TrackOrderComponent;