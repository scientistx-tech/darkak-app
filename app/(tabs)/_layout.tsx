import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Entypo } from '@expo/vector-icons';
// import { Ionicons, Entypo } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

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
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'HOME',
            tabBarLabel: 'HOME',
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarIcon: ({ color, size, focused }: {color?: string; size?: number; focused?: boolean}) => (
                <View className="items-center justify-center  relative">
                  {focused ? (
                    // Active floating circular background
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
                        marginBottom:15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -30,
                        shadowOpacity: 0.18,
                        shadowOffset: { width: 0, height: 6 },
                        shadowRadius: 10,
                        elevation: 6,
                      }}
                    >
                      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#5694FF",
                         width: 36,
                        height: 36,
                        borderRadius: 28,
                        
                      }}  >

                      <Entypo name="home" size={22}  color='#FFFFFF' />
                      </View>
                    </View>
                  ) : (
                    // Inactive icon - force white as requested
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
            tabBarLabel: 'SHOP',
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarIcon: ({ color, size, focused }: {color?: string; size?: number; focused?: boolean}) => (
                <View className="items-center justify-center">
                  {focused ? (
                    // Active floating circular background
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
                        marginBottom:15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -30,
                        shadowOpacity: 0.18,
                        shadowOffset: { width: 0, height: 6 },
                        shadowRadius: 10,
                        elevation: 6,
                      }}
                    >
                      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#5694FF",
                         width: 36,
                        height: 36,
                        borderRadius: 28,
                        
                      }}  >

                      <Entypo name="shop" size={22}  color='#FFFFFF' />
                      </View>
                    </View>
                  ) : (
                    // Inactive icon - force white as requested
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
            tabBarLabel: 'CART',
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarIcon: ({ color, size, focused }: {color?: string; size?: number; focused?: boolean}) => (
                <View className="items-center justify-center">
                  {focused ? (
                    // Active floating circular background
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
                        marginBottom:15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -30,
                        shadowOpacity: 0.18,
                        shadowOffset: { width: 0, height: 6 },
                        shadowRadius: 10,
                        elevation: 6,
                      }}
                    >
                      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#5694FF",
                         width: 36,
                        height: 36,
                        borderRadius: 28,
                        
                      }}  >

                      <Entypo name="shopping-cart" size={22}  color='#FFFFFF' />
                      </View>
                    </View>
                  ) : (
                    // Inactive icon - force white as requested
                    <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Entypo name="shopping-cart" size={22} color="#FFFFFF" />
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
            tabBarLabel: 'FAVORITES',
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarIcon: ({ color, size, focused }: {color?: string; size?: number; focused?: boolean}) => (
                <View className="items-center justify-center">
                  {focused ? (
                    // Active floating circular background
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
                        marginBottom:15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -30,
                        shadowOpacity: 0.18,
                        shadowOffset: { width: 0, height: 6 },
                        shadowRadius: 10,
                        elevation: 6,
                      }}
                    >
                      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#5694FF",
                         width: 36,
                        height: 36,
                        borderRadius: 28,
                        
                      }}  >

                      <Entypo name="heart" size={22}  color='#FFFFFF' />
                      </View>
                    </View>
                  ) : (
                    // Inactive icon - force white as requested
                    <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
                      <Entypo name="heart" size={22} color="#FFFFFF" />
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
            tabBarLabel: 'PROFILE',
            tabBarActiveTintColor: '#FFFFFF',
            tabBarInactiveTintColor: '#FFFFFF',
            tabBarIcon: ({ color, size, focused }: {color?: string; size?: number; focused?: boolean}) => (
                <View className="items-center justify-center">
                  {focused ? (
                    // Active floating circular background
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
                        marginBottom:15,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginTop: -30,
                        shadowOpacity: 0.18,
                        shadowOffset: { width: 0, height: 6 },
                        shadowRadius: 10,
                        elevation: 6,
                      }}
                    >
                      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: "#5694FF",
                         width: 36,
                        height: 36,
                        borderRadius: 28,
                        
                      }}  >

                      <Entypo name="user" size={22}  color='#FFFFFF' />
                      </View>
                    </View>
                  ) : (
                    // Inactive icon - force white as requested
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


