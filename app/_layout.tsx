import store from '@/redux/store';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import "../global.css";

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {

  // Force light theme as default for the app
  return (

    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider value={DefaultTheme}>


          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product/index" options={{ headerShown: false }} />
            <Stack.Screen name="product/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="category/index" options={{ headerShown: false }} />
            <Stack.Screen name="category/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="oder/index" options={{ headerShown: false }} />
            <Stack.Screen name="oder/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
          </Stack>
          {/* StatusBar set for light background (dark content) */}
          <StatusBar style="dark" />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}
