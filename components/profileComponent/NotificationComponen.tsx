import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome } from '@expo/vector-icons';

// Notification Type
interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'order' | 'promotion' | 'system' | 'alert';
  isRead: boolean;
  icon?: string;
}

interface NotificationComponentProps {
  onBack: () => void;
}

const NotificationComponent: React.FC<NotificationComponentProps> = ({ onBack }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Get icon based on notification type
  const getNotificationIcon = (type: string, icon?: string) => {
    if (icon) return icon;
    
    switch (type) {
      case 'order':
        return 'shopping-cart';
      case 'promotion':
        return 'local-offer';
      case 'system':
        return 'notifications';
      case 'alert':
        return 'warning';
      default:
        return 'notifications';
    }
  };

  // Get icon color based on type
  const getIconColor = (type: string) => {
    switch (type) {
      case 'order':
        return '#4CAF50';
      case 'promotion':
        return '#FF9800';
      case 'system':
        return '#2196F3';
      case 'alert':
        return '#F44336';
      default:
        return '#666';
    }
  };

  // Get icon library
  const getIconLibrary = (iconName: string) => {
    if (iconName.includes('-outline') || iconName === 'notifications') {
      return Ionicons;
    }
    return MaterialIcons;
  };

  // Mock API call - Replace with your actual API
  const fetchNotifications = async () => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Sample data - Replace with your API response
        const mockNotifications: Notification[] = [
          {
            id: '1',
            title: 'Order Confirmed',
            message: 'Your order #ORD-12345 has been confirmed and is being processed.',
            date: '2024-03-15 10:30 AM',
            type: 'order',
            isRead: false,
            icon: 'check-circle'
          },
          {
            id: '2',
            title: 'Special Discount',
            message: 'Get 20% off on all electronics. Limited time offer!',
            date: '2024-03-14 02:15 PM',
            type: 'promotion',
            isRead: true,
            icon: 'local-offer'
          },
          {
            id: '3',
            title: 'System Maintenance',
            message: 'The app will be down for maintenance on March 20th from 2-4 AM.',
            date: '2024-03-13 09:45 AM',
            type: 'system',
            isRead: true,
            icon: 'settings'
          },
          {
            id: '4',
            title: 'Payment Failed',
            message: 'Your recent payment for order #ORD-12344 has failed. Please update your payment method.',
            date: '2024-03-12 04:20 PM',
            type: 'alert',
            isRead: false,
            icon: 'error-outline'
          },
          {
            id: '5',
            title: 'Delivery Update',
            message: 'Your package has been shipped and will arrive by March 18th.',
            date: '2024-03-12 11:00 AM',
            type: 'order',
            isRead: true,
            icon: 'local-shipping'
          }
        ];

        // For empty state testing, use empty array:
        // setNotifications([]);
        
        setNotifications(mockNotifications);
        setLoading(false);
        setRefreshing(false);
      }, 1500);
      
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        isRead: true
      }))
    );
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Loading notifications...</Text>
        </View>
      </View>
    );
  }

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        {notifications.length > 0 && unreadCount > 0 && (
          <TouchableOpacity style={styles.markAllButton} onPress={markAllAsRead}>
            <Text style={styles.markAllText}>Mark all as read</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={[
          styles.scrollContent,
          notifications.length === 0 && styles.emptyScrollContent
        ]}
      >
        <Text style={styles.title}># Notifications</Text>
        
        {notifications.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="notifications-off-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>No notifications found.</Text>
            <Text style={styles.emptySubText}>
              Well notify you when something new arrives
            </Text>
          </View>
        ) : (
          <View style={styles.notificationsList}>
            {notifications.map((notification) => {
              const IconComponent = getIconLibrary(getNotificationIcon(notification.type, notification.icon));
              const iconName = getNotificationIcon(notification.type, notification.icon);
              const iconColor = getIconColor(notification.type);
              
              return (
                <TouchableOpacity
                  key={notification.id}
                  style={[
                    styles.notificationItem,
                    !notification.isRead && styles.unreadNotification
                  ]}
                  onPress={() => markAsRead(notification.id)}
                >
                  <View style={styles.notificationIcon}>
                    <IconComponent 
                      name={iconName as any} 
                      size={24} 
                      color={iconColor} 
                    />
                  </View>
                  
                  <View style={styles.notificationContent}>
                    <View style={styles.notificationHeader}>
                      <Text style={[
                        styles.notificationTitle,
                        !notification.isRead && styles.unreadTitle
                      ]}>
                        {notification.title}
                      </Text>
                      {!notification.isRead && (
                        <View style={styles.unreadBadge} />
                      )}
                    </View>
                    
                    <Text style={styles.notificationMessage}>
                      {notification.message}
                    </Text>
                    
                    <Text style={styles.notificationDate}>
                      {notification.date}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '600',
  },
  markAllButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  markAllText: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '500',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  emptyScrollContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
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
    marginBottom: 8,
    fontWeight: '500',
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    lineHeight: 20,
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
  notificationsList: {
    marginBottom: 20,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e9ecef',
  },
  unreadNotification: {
    backgroundColor: '#e3f2fd',
    borderLeftColor: '#007AFF',
  },
  notificationIcon: {
    marginRight: 12,
    justifyContent: 'center',
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  unreadTitle: {
    color: '#007AFF',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationComponent;