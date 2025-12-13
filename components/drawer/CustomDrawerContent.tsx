import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  const router = useRouter();

  const menuItems = [
    {
      id: 1,
      label: 'Login',
      icon: 'login',
      iconLibrary: 'MaterialIcons' as const,
      route: '/auth/login',
      selected: false,
    },
    {
      id: 2,
      label: 'Register',
      icon: 'person-add',
      iconLibrary: 'Ionicons' as const,
      route: '/auth/register',
      selected: false,
    },
    {
      id: 3,
      label: 'Contact Us',
      icon: 'mail-outline',
      iconLibrary: 'Ionicons' as const,
      route: '/auth/contact-us',
      selected: false,
    }
  ];

  const handleNavigate = (route: string) => {
    props.navigation.closeDrawer();
    router.push(route as any);
  };

  const renderIcon = (item: typeof menuItems[0]) => {
    if (item.iconLibrary === 'Ionicons') {
      return (
        <Ionicons
          name={item.icon as any}
          size={22}
          color={item.selected ? '#0066FF' : '#666'}
        />
      );
    } else {
      return (
        <MaterialIcons
          name={item.icon as any}
          size={22}
          color={item.selected ? '#0066FF' : '#666'}
        />
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.drawerContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Darkak App</Text>
            <Text style={styles.headerSubtitle}>Your Shopping Partner</Text>
          </View>
          <TouchableOpacity 
            style={styles.closeButton}
            onPress={() => props.navigation.closeDrawer()}
          >
            <Ionicons name="close" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Menu Items */}
        <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.menuItem,
                item.selected && styles.menuItemSelected,
              ]}
              onPress={() => handleNavigate(item.route)}
              activeOpacity={0.7}
            >
              <View style={styles.menuItemContent}>
                <View style={styles.iconContainer}>
                  {renderIcon(item)}
                </View>
                <Text
                  style={[
                    styles.menuItemText,
                    item.selected && styles.menuItemTextSelected,
                  ]}
                >
                  {item.label}
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={item.selected ? '#0066FF' : '#ccc'}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerSubtext}>© 2024 Darkak Mart</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  drawerContent: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#0066FF',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#BBD4FF',
  },
  closeButton: {
    padding: 4,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  menuContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderLeftWidth: 3,
    borderLeftColor: 'transparent',
  },
  menuItemSelected: {
    backgroundColor: '#EBF4FF',
    borderLeftColor: '#0066FF',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  menuItemTextSelected: {
    color: '#0066FF',
    fontWeight: '600',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 10,
    color: '#999',
  },
});

export default CustomDrawerContent;
