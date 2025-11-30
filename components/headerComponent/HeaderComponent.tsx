// import { Image, StyleSheet, TouchableOpacity, View, Animated, Modal } from "react-native";
// import React, { useEffect, useRef, useState } from "react";
// import { FontAwesome5 } from "@expo/vector-icons";
// import AuthModal from "../auth/AuthModal";


// const HeaderComponent = () => {
//   const logoAnim = useRef(new Animated.Value(-100)).current; 
//   const iconAnim = useRef(new Animated.Value(100)).current; 
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const modalAnim = useRef(new Animated.Value(-300)).current; 
//   const [isModalVisible, setIsModalVisible] = useState(false);

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

//   const openModal = () => {
//     setIsModalVisible(true);
//     Animated.timing(modalAnim, {
//       toValue: 0,
//       duration: 400,
//       useNativeDriver: true,
//     }).start();
//   };

//   const closeModal = () => {
//     Animated.timing(modalAnim, {
//       toValue: -300,
//       duration: 400,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsModalVisible(false);
//     });
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
//           <TouchableOpacity style={styles.iconButton} onPress={openModal}>
//             <FontAwesome5 name="align-justify" size={22} color="white" />
//           </TouchableOpacity>
//         </Animated.View>
//       </Animated.View>

//       {/* Modal for Auth Component */}
//       <Modal
//         visible={isModalVisible}
//         transparent={true}
//         animationType="none"
//         onRequestClose={closeModal}
//       >
//         <View style={styles.modalOverlay}>
//           <TouchableOpacity 
//             style={styles.overlayTouchable}
//             activeOpacity={1}
//             onPress={closeModal}
//           >
//             <Animated.View 
//               style={[
//                 styles.modalContent,
//                 {
//                   transform: [{ translateX: modalAnim }]
//                 }
//               ]}
//             >
//               <TouchableOpacity 
//                 style={styles.closeButton}
//                 onPress={closeModal}
//               >
//                 <FontAwesome5 name="times" size={20} color="#333" />
//               </TouchableOpacity>
              
//               {/* Your AuthModal component */}
//               <AuthModal />
//             </Animated.View>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// export default HeaderComponent;

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
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   overlayTouchable: {
//     flex: 1,
//     flexDirection: 'row',
//   },
//   modalContent: {
//     width: 300,
//     height: '100%',
//     backgroundColor: '#f8f9fa',
//     borderTopRightRadius: 20,
//     borderBottomRightRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 2,
//       height: 0,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     elevation: 10,
//     overflow: 'hidden',
//   },
//   closeButton: {
//     position: 'absolute',
//     top: 10,
//     right: 10,
//     zIndex: 1000,
//     backgroundColor: 'rgba(255, 255, 255, 0.9)',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
// });

import { Image, StyleSheet, TouchableOpacity, View, Animated, Modal } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { FontAwesome5 } from "@expo/vector-icons";
import AuthModal from "../auth/AuthModal"; // Adjust the import path

const HeaderComponent = () => {
  const logoAnim = useRef(new Animated.Value(-100)).current; 
  const iconAnim = useRef(new Animated.Value(100)).current; 
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const modalAnim = useRef(new Animated.Value(-300)).current;
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(iconAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const openModal = () => {
    setIsModalVisible(true);
    Animated.timing(modalAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(modalAnim, {
      toValue: -300,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      setIsModalVisible(false);
    });
  };

  return (
    <View style={styles.mainContainer}>
      <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
        
        {/* Logo slides from left */}
        <Animated.Image
          source={require("../../assets/product/RR.png")}
          style={[
            styles.logo,
            {
              transform: [{ translateX: logoAnim }],
            },
          ]}
        />

        {/* Menu Icon slides from right */}
        <Animated.View
          style={{
            transform: [{ translateX: iconAnim }],
          }}
        >
          <TouchableOpacity style={styles.iconButton} onPress={openModal}>
            <FontAwesome5 name="align-justify" size={22} color="white" />
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      {/* Modal for Auth Component */}
      <Modal
        visible={isModalVisible}
        transparent={true}
        animationType="none"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <TouchableOpacity 
            style={styles.overlayTouchable}
            activeOpacity={1}
            onPress={closeModal}
          >
            <Animated.View 
              style={[
                styles.modalContent,
                {
                  transform: [{ translateX: modalAnim }]
                }
              ]}
            >
              <TouchableOpacity 
                style={styles.closeButton}
                onPress={closeModal}
              >
                <FontAwesome5 name="times" size={20} color="#333" />
              </TouchableOpacity>
              
              {/* AuthModal Component */}
              <AuthModal />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    //flex: 1,
  },
  container: {
    backgroundColor: "#0066FF",
    height: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: "contain",
  },
  iconButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  overlayTouchable: {
    flex: 1,
    flexDirection: 'row',
  },
  modalContent: {
    width: 300,
    height: '100%',
    backgroundColor: '#f8f9fa',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1000,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default HeaderComponent;