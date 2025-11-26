import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Order Type
interface Order {
  id: string;
  productName: string;
  price: string;
  orderDate: string;
  deliveryStatus: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  image?: string;
}

interface OrderHistoryComponentProps {
  onBack: () => void;
}

const OrderHistoryComponent: React.FC<OrderHistoryComponentProps> = ({ onBack }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // 5 orders per page as requested

  // Mock data - Replace with your API call
  const mockOrders: Order[] = [
    {
      id: '1',
      productName: 'Wireless Bluetooth Headphones',
      price: '৳ 2,500',
      orderDate: '2024-03-15',
      deliveryStatus: 'delivered'
    },
    {
      id: '2',
      productName: 'Smart Watch Series 5',
      price: '৳ 8,900',
      orderDate: '2024-03-12',
      deliveryStatus: 'shipped'
    },
    {
      id: '3',
      productName: 'USB-C Fast Charger',
      price: '৳ 1,200',
      orderDate: '2024-03-10',
      deliveryStatus: 'pending'
    },
    {
      id: '4',
      productName: 'Laptop Backpack',
      price: '৳ 1,800',
      orderDate: '2024-03-08',
      deliveryStatus: 'delivered'
    },
    {
      id: '5',
      productName: 'Wireless Mouse',
      price: '৳ 950',
      orderDate: '2024-03-05',
      deliveryStatus: 'cancelled'
    },
    {
      id: '6',
      productName: 'Mechanical Keyboard',
      price: '৳ 3,500',
      orderDate: '2024-03-03',
      deliveryStatus: 'delivered'
    },
    {
      id: '7',
      productName: 'Phone Case',
      price: '৳ 450',
      orderDate: '2024-03-01',
      deliveryStatus: 'shipped'
    },
    {
      id: '8',
      productName: 'Power Bank 20000mAh',
      price: '৳ 2,200',
      orderDate: '2024-02-28',
      deliveryStatus: 'delivered'
    },
    {
      id: '9',
      productName: 'Wireless Earbuds',
      price: '৳ 1,800',
      orderDate: '2024-02-25',
      deliveryStatus: 'pending'
    },
    {
      id: '10',
      productName: 'Tablet Stand',
      price: '৳ 650',
      orderDate: '2024-02-22',
      deliveryStatus: 'delivered'
    }
  ];

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered':
        return '#4CAF50';
      case 'shipped':
        return '#2196F3';
      case 'pending':
        return '#FF9800';
      case 'cancelled':
        return '#F44336';
      default:
        return '#666';
    }
  };

  // Get status text
  const getStatusText = (status: string) => {
    switch (status) {
      case 'delivered':
        return 'Delivered';
      case 'shipped':
        return 'Shipped';
      case 'pending':
        return 'Pending';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  // Simulate API call
  const fetchOrders = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      setTimeout(() => {
        setOrders(mockOrders);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading orders...</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={onBack}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView style={styles.scrollView}>
        <Text style={styles.title}># Order History</Text>

        {currentOrders.length === 0 ? (
          <View style={styles.emptyContainer}>
            <MaterialIcons name="receipt-long" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No orders found.</Text>
          </View>
        ) : (
          <View style={styles.ordersContainer}>
            {currentOrders.map((order) => (
              <View key={order.id} style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.productLabel}>Product</Text>
                  <Text style={styles.productName}>{order.productName}</Text>
                </View>

                <View style={styles.orderDetails}>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Price</Text>
                    <Text style={styles.detailValue}>{order.price}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Order Date</Text>
                    <Text style={styles.detailValue}>{order.orderDate}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Delivery Status</Text>
                    <View style={[
                      styles.statusBadge,
                      { backgroundColor: getStatusColor(order.deliveryStatus) }
                    ]}>
                      <Text style={styles.statusText}>
                        {getStatusText(order.deliveryStatus)}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Pagination */}
        {orders.length > 0 && (
          <View style={styles.paginationContainer}>
            <View style={styles.paginationButtons}>
              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === 1 && styles.disabledButton
                ]}
                onPress={prevPage}
                disabled={currentPage === 1}
              >
                <Text style={[
                  styles.paginationButtonText,
                  currentPage === 1 && styles.disabledButtonText
                ]}>
                  Previous
                </Text>
              </TouchableOpacity>

              <View style={styles.pageInfo}>
                <Text style={styles.pageText}>
                  Page {currentPage} of {totalPages}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.paginationButton,
                  currentPage === totalPages && styles.disabledButton
                ]}
                onPress={nextPage}
                disabled={currentPage === totalPages}
              >
                <Text style={[
                  styles.paginationButtonText,
                  currentPage === totalPages && styles.disabledButtonText
                ]}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.ordersPerPage}>
              <Text style={styles.ordersPerPageText}>
                Orders per page: {ordersPerPage}
              </Text>
            </View>
          </View>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '500',
  },
  ordersContainer: {
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  orderHeader: {
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  productLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  paginationContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
  paginationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  paginationButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  paginationButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  disabledButtonText: {
    color: '#666',
  },
  pageInfo: {
    alignItems: 'center',
  },
  pageText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  ordersPerPage: {
    alignItems: 'center',
  },
  ordersPerPageText: {
    fontSize: 12,
    color: '#999',
  },
});

export default OrderHistoryComponent;