import { BorderRadius, Colors, Shadows } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { Platform, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const insets = useSafeAreaInsets();
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
          // use full borderRadius so corners are uniformly rounded
          borderRadius: BorderRadius['2xl'],
          // height includes safe-area bottom inset so content doesn't overlap
          height: (Platform.OS === 'ios' ? 78 : 66) + (insets.bottom ?? 0),
          // keep some extra padding so icons sit comfortably above the bar
          paddingBottom: (insets.bottom ?? 0) + (Platform.OS === 'ios' ? 12 : 8),
          paddingTop: 8,
          elevation: 10,
          shadowColor: '#000',
          shadowOpacity: 0.12,
          shadowRadius: 12,
          position: 'absolute',
          left: 12,
          right: 12,
          bottom: (insets.bottom ?? 0) + 12,
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
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
  },
  tabIconActive: {
    backgroundColor: '#FFFFFF',
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    // lift the active icon slightly above the bar so it's visually prominent
    marginTop: -22,
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
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    backgroundColor: 'transparent',
    marginTop: -22,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
