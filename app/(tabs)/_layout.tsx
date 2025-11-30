// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { Entypo } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';
// import { View } from 'react-native';

// export default function TabLayout() {
//   const colorScheme = useColorScheme() ?? 'light';
//   const colors = Colors[colorScheme];

//   return (
//     <Tabs
//       initialRouteName="index"
//       screenOptions={{
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarStyle: {
//           paddingHorizontal: 8,
//           paddingVertical: 15,
//           height: 110,
//           backgroundColor: colors.primary,
//           borderTopWidth: 0,
//         },
//         tabBarActiveTintColor: '#FFFFFF',
//         tabBarInactiveTintColor: '#FFFFFF',
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: 'HOME',
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               {focused ? (
//                 <View
//                   style={{
//                     width: 66,
//                     height: 20,
//                     paddingBottom: 26,
//                     position: 'absolute',
//                     top: 10,
//                     bottom: 0,
//                     borderBottomLeftRadius: 28,
//                     borderBottomRightRadius: 28,
//                     backgroundColor: "#FFFFFF",
//                     marginBottom: 15,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: -30,
//                     shadowOpacity: 0.18,
//                     shadowOffset: { width: 0, height: 6 },
//                     shadowRadius: 10,
//                     elevation: 6,
//                   }}
//                 >
//                   <View 
//                     style={{
//                       justifyContent: 'center', 
//                       alignItems: 'center', 
//                       backgroundColor: "#5694FF",
//                       width: 36,
//                       height: 36,
//                       borderRadius: 28,
//                     }}
//                   >
//                     <Entypo name="home" size={22} color="#FFFFFF" />
//                   </View>
//                 </View>
//               ) : (
//                 <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
//                   <Entypo name="home" size={22} color="#FFFFFF" />
//                 </View>
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tabs.Screen
//         name="shop"
//         options={{
//           title: 'SHOP',
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               {focused ? (
//                 <View
//                   style={{
//                     width: 66,
//                     height: 20,
//                     paddingBottom: 26,
//                     position: 'absolute',
//                     top: 10,
//                     bottom: 0,
//                     borderBottomLeftRadius: 28,
//                     borderBottomRightRadius: 28,
//                     backgroundColor: "#FFFFFF",
//                     marginBottom: 15,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: -30,
//                     shadowOpacity: 0.18,
//                     shadowOffset: { width: 0, height: 6 },
//                     shadowRadius: 10,
//                     elevation: 6,
//                   }}
//                 >
//                   <View 
//                     style={{
//                       justifyContent: 'center', 
//                       alignItems: 'center', 
//                       backgroundColor: "#5694FF",
//                       width: 36,
//                       height: 36,
//                       borderRadius: 28,
//                     }}
//                   >
//                     <Entypo name="shop" size={20} color="#FFFFFF" />
//                   </View>
//                 </View>
//               ) : (
//                 <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
//                   <Entypo name="shop" size={22} color="#FFFFFF" />
//                 </View>
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tabs.Screen
//         name="cart"
//         options={{
//           title: 'CART',
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               {focused ? (
//                 <View
//                   style={{
//                     width: 66,
//                     height: 20,
//                     paddingBottom: 26,
//                     position: 'absolute',
//                     top: 10,
//                     bottom: 0,
//                     borderBottomLeftRadius: 28,
//                     borderBottomRightRadius: 28,
//                     backgroundColor: "#FFFFFF",
//                     marginBottom: 15,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: -30,
//                     shadowOpacity: 0.18,
//                     shadowOffset: { width: 0, height: 6 },
//                     shadowRadius: 10,
//                     elevation: 6,
//                   }}
//                 >
//                   <View 
//                     style={{
//                       justifyContent: 'center', 
//                       alignItems: 'center', 
//                       backgroundColor: "#5694FF",
//                       width: 36,
//                       height: 36,
//                       borderRadius: 28,
//                     }}
//                   >
//                     <Entypo name="shopping-cart" size={22} color="#FFFFFF" />
//                   </View>
//                 </View>
//               ) : (
//                 <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
//                   <Entypo name="shopping-cart" size={22} color="#FFFFFF" />
//                 </View>
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tabs.Screen
//         name="favorites"
//         options={{
//           title: 'FAVORITES',
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               {focused ? (
//                 <View
//                   style={{
//                     width: 66,
//                     height: 20,
//                     paddingBottom: 26,
//                     position: 'absolute',
//                     top: 10,
//                     bottom: 0,
//                     borderBottomLeftRadius: 28,
//                     borderBottomRightRadius: 28,
//                     backgroundColor: "#FFFFFF",
//                     marginBottom: 15,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: -30,
//                     shadowOpacity: 0.18,
//                     shadowOffset: { width: 0, height: 6 },
//                     shadowRadius: 10,
//                     elevation: 6,
//                   }}
//                 >
//                   <View 
//                     style={{
//                       justifyContent: 'center', 
//                       alignItems: 'center', 
//                       backgroundColor: "#5694FF",
//                       width: 36,
//                       height: 36,
//                       borderRadius: 28,
//                     }}
//                   >
//                     <Entypo name="heart" size={22} color="#FFFFFF" />
//                   </View>
//                 </View>
//               ) : (
//                 <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
//                   <Entypo name="heart" size={22} color="#FFFFFF" />
//                 </View>
//               )}
//             </View>
//           ),
//         }}
//       />
      
//       <Tabs.Screen
//         name="profile"
//         options={{
//           title: 'PROFILE',
//           tabBarIcon: ({ focused }) => (
//             <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//               {focused ? (
//                 <View
//                   style={{
//                     width: 66,
//                     height: 20,
//                     paddingBottom: 26,
//                     position: 'absolute',
//                     top: 10,
//                     bottom: 0,
//                     borderBottomLeftRadius: 28,
//                     borderBottomRightRadius: 28,
//                     backgroundColor: "#FFFFFF",
//                     marginBottom: 15,
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                     marginTop: -30,
//                     shadowOpacity: 0.18,
//                     shadowOffset: { width: 0, height: 6 },
//                     shadowRadius: 10,
//                     elevation: 6,
//                   }}
//                 >
//                   <View 
//                     style={{
//                       justifyContent: 'center', 
//                       alignItems: 'center', 
//                       backgroundColor: "#5694FF",
//                       width: 36,
//                       height: 36,
//                       borderRadius: 28,
//                     }}
//                   >
//                     <Entypo name="user" size={22} color="#FFFFFF" />
//                   </View>
//                 </View>
//               ) : (
//                 <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
//                   <Entypo name="user" size={22} color="#FFFFFF" />
//                 </View>
//               )}
//             </View>
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View, Text } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // ব্যাজের জন্য ডেটা - আপনি চাইলে এগুলোকে state বা context থেকে নিতে পারেন
  const badgeData = {
    cart: 3,
    favorites: 8,
  };

  const Badge = ({ count }) => {
    if (!count || count <= 0) return null;
    
    return (
      <View
        style={{
          position: 'absolute',
          top: -5,
          right: -5,
          backgroundColor: '#FF3B30',
          borderRadius: 10,
          minWidth: 18,
          height: 18,
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 1.5,
          borderColor: colors.primary,
        }}
      >
        <Text
          style={{
            color: 'white',
            fontSize: 10,
            fontWeight: 'bold',
          }}
        >
          {count > 99 ? '99+' : count}
        </Text>
      </View>
    );
  };

  return (
    <Tabs
      initialRouteName="index"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarStyle: {
          paddingHorizontal: 8,
          paddingVertical: 15,
          height: 110,
          backgroundColor: colors.primary,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#FFFFFF',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <View
                  style={{
                    width: 66,
                    height: 20,
                    paddingBottom: 26,
                    position: 'absolute',
                    top: 10,
                    bottom: 0,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                    backgroundColor: "#FFFFFF",
                    marginBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -30,
                    shadowOpacity: 0.18,
                    shadowOffset: { width: 0, height: 6 },
                    shadowRadius: 10,
                    elevation: 6,
                  }}
                >
                  <View 
                    style={{
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      backgroundColor: "#5694FF",
                      width: 36,
                      height: 36,
                      borderRadius: 28,
                    }}
                  >
                    <Entypo name="home" size={22} color="#FFFFFF" />
                  </View>
                </View>
              ) : (
                <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Entypo name="home" size={22} color="#FFFFFF" />
                </View>
              )}
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="shop"
        options={{
          title: 'SHOP',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <View
                  style={{
                    width: 66,
                    height: 20,
                    paddingBottom: 26,
                    position: 'absolute',
                    top: 10,
                    bottom: 0,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                    backgroundColor: "#FFFFFF",
                    marginBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -30,
                    shadowOpacity: 0.18,
                    shadowOffset: { width: 0, height: 6 },
                    shadowRadius: 10,
                    elevation: 6,
                  }}
                >
                  <View 
                    style={{
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      backgroundColor: "#5694FF",
                      width: 36,
                      height: 36,
                      borderRadius: 28,
                    }}
                  >
                    <Entypo name="shop" size={20} color="#FFFFFF" />
                  </View>
                </View>
              ) : (
                <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Entypo name="shop" size={22} color="#FFFFFF" />
                </View>
              )}
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="cart"
        options={{
          title: 'CART',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <View
                  style={{
                    width: 66,
                    height: 20,
                    paddingBottom: 26,
                    position: 'absolute',
                    top: 10,
                    bottom: 0,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                    backgroundColor: "#FFFFFF",
                    marginBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -30,
                    shadowOpacity: 0.18,
                    shadowOffset: { width: 0, height: 6 },
                    shadowRadius: 10,
                    elevation: 6,
                  }}
                >
                  <View 
                    style={{
                      position: 'relative',
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      backgroundColor: "#5694FF",
                      width: 36,
                      height: 36,
                      borderRadius: 28,
                    }}
                  >
                    <Entypo name="shopping-cart" size={22} color="#FFFFFF" />
                    <Badge count={badgeData.cart} />
                  </View>
                </View>
              ) : (
                <View style={{ position: 'relative', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Entypo name="shopping-cart" size={22} color="#FFFFFF" />
                  <Badge count={badgeData.cart} />
                </View>
              )}
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'FAVORITES',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <View
                  style={{
                    width: 66,
                    height: 20,
                    paddingBottom: 26,
                    position: 'absolute',
                    top: 10,
                    bottom: 0,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                    backgroundColor: "#FFFFFF",
                    marginBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -30,
                    shadowOpacity: 0.18,
                    shadowOffset: { width: 0, height: 6 },
                    shadowRadius: 10,
                    elevation: 6,
                  }}
                >
                  <View 
                    style={{
                      position: 'relative',
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      backgroundColor: "#5694FF",
                      width: 36,
                      height: 36,
                      borderRadius: 28,
                    }}
                  >
                    <Entypo name="heart" size={22} color="#FFFFFF" />
                    <Badge count={badgeData.favorites} />
                  </View>
                </View>
              ) : (
                <View style={{ position: 'relative', width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Entypo name="heart" size={22} color="#FFFFFF" />
                  <Badge count={badgeData.favorites} />
                </View>
              )}
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
          title: 'PROFILE',
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {focused ? (
                <View
                  style={{
                    width: 66,
                    height: 20,
                    paddingBottom: 26,
                    position: 'absolute',
                    top: 10,
                    bottom: 0,
                    borderBottomLeftRadius: 28,
                    borderBottomRightRadius: 28,
                    backgroundColor: "#FFFFFF",
                    marginBottom: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -30,
                    shadowOpacity: 0.18,
                    shadowOffset: { width: 0, height: 6 },
                    shadowRadius: 10,
                    elevation: 6,
                  }}
                >
                  <View 
                    style={{
                      justifyContent: 'center', 
                      alignItems: 'center', 
                      backgroundColor: "#5694FF",
                      width: 36,
                      height: 36,
                      borderRadius: 28,
                    }}
                  >
                    <Entypo name="user" size={22} color="#FFFFFF" />
                  </View>
                </View>
              ) : (
                <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                  <Entypo name="user" size={22} color="#FFFFFF" />
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}



// import React from 'react';
// import {
//   Alert,
//   Animated,
//   StyleSheet,
//   TouchableOpacity,
//   View,
// } from 'react-native';
// import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar';
// import Ionicons from '@expo/vector-icons/Ionicons';
// import { NavigationContainer } from '@react-navigation/native';
// import HomeScreen from '.';
// import FavoriteScreen from './favorites';


// export default function  TabLayout() {
//   const _renderIcon = (routeName, selectedTab) => {
//     let icon = '';

//     switch (routeName) {
//       case 'title1':
//         icon = 'ios-home-outline';
//         break;
//       case 'title2':
//         icon = 'settings-outline';
//         break;
//     }

//     return (
//       <Ionicons
//         name={icon}
//         size={25}
//         color={routeName === selectedTab ? 'black' : 'gray'}
//       />
//     );
//   };
//   const renderTabBar = ({ routeName, selectedTab, navigate }) => {
//     return (
//       <TouchableOpacity
//         onPress={() => navigate(routeName)}
//         style={styles.tabbarItem}
//       >
//         {_renderIcon(routeName, selectedTab)}
//       </TouchableOpacity>
//     );
//   };

//   return (
 
//       <CurvedBottomBarExpo.Navigator
//         type="DOWN"
//         style={styles.bottomBar}
//         shadowStyle={styles.shawdow}
//         height={55}
//         circleWidth={50}
//         bgColor="white"
//         initialRouteName="title1"
//         borderTopLeftRight
//         renderCircle={({ selectedTab, navigate }) => (
//           <Animated.View style={styles.btnCircleUp}>
//             <TouchableOpacity
//               style={styles.button}
//               onPress={() => Alert.alert('Click Action')}
//             >
//               <Ionicons name={'apps-sharp'} color="gray" size={25} />
//             </TouchableOpacity>
//           </Animated.View>
//         )}
//         tabBar={renderTabBar}
//       >
//         <CurvedBottomBarExpo.Screen
//           name="title1"
//           position="LEFT"
//           component={() => <HomeScreen />}
//         />
//         <CurvedBottomBarExpo.Screen
//           name="title2"
//           component={() => <FavoriteScreen />}
//           position="RIGHT"
//         />
//       </CurvedBottomBarExpo.Navigator>

//   );
// }

// export const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
//   shawdow: {
//     shadowColor: '#DDDDDD',
//     shadowOffset: {
//       width: 0,
//       height: 0,
//     },
//     shadowOpacity: 1,
//     shadowRadius: 5,
//   },
//   button: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   bottomBar: {},
//   btnCircleUp: {
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#E8E8E8',
//     bottom: 30,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 1,
//     },
//     shadowOpacity: 0.2,
//     shadowRadius: 1.41,
//     elevation: 1,
//   },
//   imgCircle: {
//     width: 30,
//     height: 30,
//     tintColor: 'gray',
//   },
//   tabbarItem: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   img: {
//     width: 30,
//     height: 30,
//   },
//   screen1: {
//     flex: 1,
//     backgroundColor: '#BFEFFF',
//   },
//   screen2: {
//     flex: 1,
//     backgroundColor: '#FFEBCD',
//   },
// });