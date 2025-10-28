import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  // visual choices to match the provided design image
  const navBackground = colors.primaryDark ?? '#0A274C';
  const inactiveIconColor = 'rgba(255,255,255,0.85)';

  return (
      <Tabs
      screenOptions={{
        // label colors
  tabBarActiveTintColor: '#FFFFFF', // active label should be white on navy background
  tabBarInactiveTintColor: inactiveIconColor,
        headerShown: false,
        // main bar style - floating rounded navy bar
        tabBarStyle: {
          backgroundColor: navBackground,
          borderTopColor: 'transparent',
          height: Platform.OS === 'ios' ? 84 : 72,
          paddingBottom: Platform.OS === 'ios' ? 20 : 12,
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: 12,
          borderTopLeftRadius: BorderRadius['2xl'],
          borderTopRightRadius: BorderRadius['2xl'],
          overflow: 'visible',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
          marginTop: 6,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size, focused }: { color?: string; size?: number; focused?: boolean }) => (
            <View style={styles.iconContainer}>
                      <View style={[styles.tabIconBackground, focused ? styles.tabIconActive : undefined]}>
                        <Ionicons name="home" size={22} color={focused ? colors.primary : inactiveIconColor} />
                      </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Shop',
          // central tab uses same active style as other tabs when focused
          tabBarIcon: ({ color, size, focused }: { color?: string; size?: number; focused?: boolean }) => (
            <View style={styles.iconContainer}>
                <View style={[styles.centerButton, focused ? styles.tabIconActive : styles.centerInactive]}>
                  <Ionicons name="grid" size={22} color={focused ? colors.primary : inactiveIconColor} />
                </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: 'Favorites',
          tabBarIcon: ({ color, size, focused }: { color?: string; size?: number; focused?: boolean }) => (
            <View style={styles.iconContainer}>
              <View style={[styles.tabIconBackground, focused ? styles.tabIconActive : undefined]}>
                <Ionicons name="heart" size={22} color={focused ? colors.primary : inactiveIconColor} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: 'Account',
          tabBarIcon: ({ color, size, focused }: { color?: string; size?: number; focused?: boolean }) => (
            <View style={styles.iconContainer}>
              <View style={[styles.tabIconBackground, focused ? styles.tabIconActive : undefined]}>
                <Ionicons name="person" size={22} color={focused ? colors.primary : inactiveIconColor} />
              </View>
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  tabIconBackground: {
    // default: transparent so the navy bar shows through
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
  },
  tabIconActive: {
    backgroundColor: '#FFFFFF',
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    marginTop: -28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  centerButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerActive: {
    // kept for compatibility but no longer used for focused style
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: '#FFFFFF',
    marginTop: -28,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.lg,
  },
  centerInactive: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2,
    backgroundColor: 'transparent',
    marginTop: -28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
