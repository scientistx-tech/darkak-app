import CustomDrawerContent from '@/components/drawer/CustomDrawerContent';
import store from '@/redux/store';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import "../global.css";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Provider store={store}>
          <ThemeProvider value={DefaultTheme}>
            <Drawer
              drawerContent={(props:any) => <CustomDrawerContent {...props} />}
              screenOptions={{
                headerShown: false,
                drawerType: 'front',
                drawerStyle: {
                  width: 300,
                },
                overlayColor: 'rgba(0, 0, 0, 0.5)',
                swipeEdgeWidth: 50,
              }}
            >
              <Drawer.Screen 
                name="(tabs)" 
                options={{ 
                  headerShown: false,
                  title: 'Home',
                }} 
              />
              <Drawer.Screen 
                name="auth/login" 
                options={{ 
                  headerShown: false,
                  title: 'Login',
                }} 
              />
              <Drawer.Screen 
                name="auth/register" 
                options={{ 
                  headerShown: false,
                  title: 'Register',
                }} 
              />
              <Drawer.Screen 
                name="auth/reset-password" 
                options={{ 
                  headerShown: false,
                  title: 'Reset Password',
                }} 
              />
              <Drawer.Screen 
                name="auth/moderator-login" 
                options={{ 
                  headerShown: false,
                  title: 'Moderator Login',
                }} 
              />
              <Drawer.Screen 
                name="auth/contact-us" 
                options={{ 
                  headerShown: false,
                  title: 'Contact Us',
                }} 
              />
               <Drawer.Screen 
                name="logOut" 
                options={{ 
                  headerShown: false,
                  title: 'LogOut',
                }} 
              />
              <Drawer.Screen 
                name="product/index" 
                options={{ 
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }} 
              />
              <Drawer.Screen 
                name="product/[id]" 
                options={{ 
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }} 
              />
              <Drawer.Screen 
                name="category/index" 
                options={{ 
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }} 
              />
              <Drawer.Screen 
                name="category/[id]" 
                options={{ 
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }} 
              />
              <Drawer.Screen 
                name="oder/index" 
                options={{ 
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }} 
              />
              <Drawer.Screen 
                name="oder/[id]" 
                options={{ 
                  headerShown: false,
                  drawerItemStyle: { display: 'none' },
                }} 
              />
              <Drawer.Screen 
                name="modal" 
                options={{ 
                  presentation: 'modal' as any,
                  title: 'Modal',
                  drawerItemStyle: { display: 'none' },
                }} 
              />
            </Drawer>
            <StatusBar style="dark" />
          </ThemeProvider>
        </Provider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
