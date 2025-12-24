// // import { Image, StyleSheet, TouchableOpacity, View, Animated, Modal } from "react-native";
// // import React, { useEffect, useRef, useState } from "react";
// // import { FontAwesome5 } from "@expo/vector-icons";
// // import AuthModal from "../auth/AuthModal";


// // const HeaderComponent = () => {
// //   const logoAnim = useRef(new Animated.Value(-100)).current; 
// //   const iconAnim = useRef(new Animated.Value(100)).current; 
// //   const fadeAnim = useRef(new Animated.Value(0)).current;
// //   const modalAnim = useRef(new Animated.Value(-300)).current; 
// //   const [isModalVisible, setIsModalVisible] = useState(false);

// //   useEffect(() => {
// //     Animated.parallel([
// //       Animated.timing(logoAnim, {
// //         toValue: 0,
// //         duration: 700,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(iconAnim, {
// //         toValue: 0,
// //         duration: 700,
// //         useNativeDriver: true,
// //       }),
// //       Animated.timing(fadeAnim, {
// //         toValue: 1,
// //         duration: 800,
// //         useNativeDriver: true,
// //       }),
// //     ]).start();
// //   }, []);

// //   const openModal = () => {
// //     setIsModalVisible(true);
// //     Animated.timing(modalAnim, {
// //       toValue: 0,
// //       duration: 400,
// //       useNativeDriver: true,
// //     }).start();
// //   };

// //   const closeModal = () => {
// //     Animated.timing(modalAnim, {
// //       toValue: -300,
// //       duration: 400,
// //       useNativeDriver: true,
// //     }).start(() => {
// //       setIsModalVisible(false);
// //     });
// //   };

// //   return (
// //     <View style={styles.mainContainer}>
// //       <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        
// //         {/* Logo slides from left */}
// //         <Animated.Image
// //           source={require("../../assets/product/RR.png")}
// //           style={[
// //             styles.logo,
// //             {
// //               transform: [{ translateX: logoAnim }],
// //             },
// //           ]}
// //         />

// //         {/* Menu Icon slides from right */}
// //         <Animated.View
// //           style={{
// //             transform: [{ translateX: iconAnim }],
// //           }}
// //         >
// //           <TouchableOpacity style={styles.iconButton} onPress={openModal}>
// //             <FontAwesome5 name="align-justify" size={22} color="white" />
// //           </TouchableOpacity>
// //         </Animated.View>
// //       </Animated.View>

// //       {/* Modal for Auth Component */}
// //       <Modal
// //         visible={isModalVisible}
// //         transparent={true}
// //         animationType="none"
// //         onRequestClose={closeModal}
// //       >
// //         <View style={styles.modalOverlay}>
// //           <TouchableOpacity 
// //             style={styles.overlayTouchable}
// //             activeOpacity={1}
// //             onPress={closeModal}
// //           >
// //             <Animated.View 
// //               style={[
// //                 styles.modalContent,
// //                 {
// //                   transform: [{ translateX: modalAnim }]
// //                 }
// //               ]}
// //             >
// //               <TouchableOpacity 
// //                 style={styles.closeButton}
// //                 onPress={closeModal}
// //               >
// //                 <FontAwesome5 name="times" size={20} color="#333" />
// //               </TouchableOpacity>
              
// //               {/* Your AuthModal component */}
// //               <AuthModal />
// //             </Animated.View>
// //           </TouchableOpacity>
// //         </View>
// //       </Modal>
// //     </View>
// //   );
// // };

// // export default HeaderComponent;

// // const styles = StyleSheet.create({
// //   mainContainer: {
    
// //   },
// //   container: {
// //     backgroundColor: "#0066FF",
// //     height: 60,
// //     width: "100%",
// //     flexDirection: "row",
// //     alignItems: "center",
// //     justifyContent: "space-between",
// //     paddingHorizontal: 16,
// //   },
// //   logo: {
// //     width: 100,
// //     height: 50,
// //     resizeMode: "contain",
// //   },
// //   iconButton: {
// //     padding: 8,
// //   },
// //   modalOverlay: {
// //     flex: 1,
// //     backgroundColor: 'rgba(0, 0, 0, 0.5)',
// //   },
// //   overlayTouchable: {
// //     flex: 1,
// //     flexDirection: 'row',
// //   },
// //   modalContent: {
// //     width: 300,
// //     height: '100%',
// //     backgroundColor: '#f8f9fa',
// //     borderTopRightRadius: 20,
// //     borderBottomRightRadius: 20,
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 2,
// //       height: 0,
// //     },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 10,
// //     elevation: 10,
// //     overflow: 'hidden',
// //   },
// //   closeButton: {
// //     position: 'absolute',
// //     top: 10,
// //     right: 10,
// //     zIndex: 1000,
// //     backgroundColor: 'rgba(255, 255, 255, 0.9)',
// //     borderRadius: 15,
// //     width: 30,
// //     height: 30,
// //     alignItems: 'center',
// //     justifyContent: 'center',
// //     shadowColor: '#000',
// //     shadowOffset: {
// //       width: 0,
// //       height: 2,
// //     },
// //     shadowOpacity: 0.25,
// //     shadowRadius: 3.84,
// //     elevation: 5,
// //   },
// // });

// import { FontAwesome5 } from "@expo/vector-icons";
// import { DrawerNavigationProp } from '@react-navigation/drawer';
// import { useNavigation } from '@react-navigation/native';
// import { useEffect, useRef } from "react";
// import { Animated, StyleSheet, TouchableOpacity, View } from "react-native";

// type DrawerNavigation = DrawerNavigationProp<any>;

// const HeaderComponent = () => {
//   const navigation = useNavigation<DrawerNavigation>();
//   const logoAnim = useRef(new Animated.Value(-100)).current; 
//   const iconAnim = useRef(new Animated.Value(100)).current; 
//   const fadeAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(logoAnim, {
//         toValue: 0,
//         duration: 700,
//         useNativeDriver: true,
//       }),
//       Animated.timing(iconAnim, {
//         toValue: 0,
//         duration: 700,
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 800,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   }, []);

//   const openDrawer = () => {
//     navigation.openDrawer();
//   };

//   return (
//     <View style={styles.mainContainer}>
//       <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        
//         {/* Logo slides from left */}
//         <Animated.Image
//           source={require("../../assets/product/RR.png")}
//           style={[
//             styles.logo,
//             {
//               transform: [{ translateX: logoAnim }],
//             },
//           ]}
//         />

//         {/* Menu Icon slides from right */}
//         <Animated.View
//           style={{
//             transform: [{ translateX: iconAnim }],
//           }}
//         >
//           <TouchableOpacity style={styles.iconButton} onPress={openDrawer}>
//             <FontAwesome5 name="align-justify" size={22} color="white" />
//           </TouchableOpacity>
//         </Animated.View>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
    
//   },
//   container: {
//     backgroundColor: "#0066FF",
//     height: 60,
//     width: "100%",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     paddingHorizontal: 16,
//   },
//   logo: {
//     width: 100,
//     height: 50,
//     resizeMode: "contain",
//   },
//   iconButton: {
//     padding: 8,
//   },
// });

// export default HeaderComponent;

import { FontAwesome5, Ionicons, Feather } from "@expo/vector-icons";
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useState } from "react";
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
  Text,
  Platform,
  Modal,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";

type DrawerNavigation = DrawerNavigationProp<any>;

const HeaderComponent = () => {
  const navigation = useNavigation<DrawerNavigation>();
  const [searchText, setSearchText] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  // Mock notifications data
  const notifications = [
    { id: 1, title: "Order Shipped", message: "Your order #12345 has been shipped", time: "10 min ago", read: false },
    { id: 2, title: "New Offer", message: "50% off on all electronics", time: "1 hour ago", read: true },
    { id: 3, title: "Payment Successful", message: "Payment for order #12344 received", time: "2 hours ago", read: false },
    { id: 4, title: "Order Delivered", message: "Your order has been delivered", time: "1 day ago", read: true },
    { id: 5, title: "Review Request", message: "Please review your recent purchase", time: "2 days ago", read: true },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {/* Left Section - Drawer icon and Darkak logo */}
        <View style={styles.leftSection}>
          <TouchableOpacity style={styles.iconButton} onPress={openDrawer}>
            <FontAwesome5 name="align-justify" size={20} color="white" />
          </TouchableOpacity>

          <Image
            source={require("../../assets/product/RR.png")}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Right Section - Notification and Search Icons */}
        <View style={styles.rightSection}>
          <TouchableOpacity 
            style={[styles.iconButton, styles.notificationButton]}
            onPress={() => setShowNotifications(true)}
          >
            <Ionicons name="notifications-outline" size={20} color="white" />
            {unreadCount > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.badgeText}>{unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton} onPress={toggleSearch}>
            <Feather name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar (Expands when search icon is clicked) */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather name="search" size={18} color="#666" style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#999"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus={true}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText("")}>
                <Feather name="x" size={18} color="#666" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Notifications Modal */}
      <Modal
        visible={showNotifications}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowNotifications(false)}
      >
        <TouchableWithoutFeedback onPress={() => setShowNotifications(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.notificationsModal}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Notifications</Text>
                  <TouchableOpacity onPress={() => setShowNotifications(false)}>
                    <Feather name="x" size={24} color="#333" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.notificationsList}>
                  {notifications.map((notification) => (
                    <TouchableOpacity 
                      key={notification.id} 
                      style={[
                        styles.notificationItem,
                        !notification.read && styles.unreadNotification
                      ]}
                    >
                      <View style={styles.notificationIcon}>
                        <Ionicons 
                          name="notifications" 
                          size={20} 
                          color={notification.read ? "#666" : "#0066FF"} 
                        />
                      </View>
                      <View style={styles.notificationContent}>
                        <Text style={[
                          styles.notificationTitle,
                          !notification.read && styles.unreadTitle
                        ]}>
                          {notification.title}
                        </Text>
                        <Text style={styles.notificationMessage}>
                          {notification.message}
                        </Text>
                        <Text style={styles.notificationTime}>
                          {notification.time}
                        </Text>
                      </View>
                      {!notification.read && (
                        <View style={styles.unreadDot} />
                      )}
                    </TouchableOpacity>
                  ))}
                </ScrollView>

                <TouchableOpacity style={styles.markAllButton}>
                  <Text style={styles.markAllText}>Mark all as read</Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#0066FF",
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  container: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
  },
  notificationButton: {
    position: 'relative',
  },
  logo: {
    width: 80,
    height: 40,
    marginLeft: 12,
  },
  searchContainer: {
    backgroundColor: "#0066FF",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    minWidth: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#0066FF',
  },
  badgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 3,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-start',
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
  },
  notificationsModal: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    maxHeight: 500,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationsList: {
    maxHeight: 400,
  },
  notificationItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    alignItems: 'flex-start',
    position: 'relative',
  },
  unreadNotification: {
    backgroundColor: '#F0F8FF',
  },
  notificationIcon: {
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  unreadTitle: {
    color: '#0066FF',
  },
  notificationMessage: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
    lineHeight: 16,
  },
  notificationTime: {
    fontSize: 10,
    color: '#BBB',
  },
  unreadDot: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#0066FF',
  },
  markAllButton: {
    padding: 16,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  markAllText: {
    color: '#0066FF',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default HeaderComponent;