import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import * as NavigationBar from 'expo-navigation-bar';

import GlobalContextProvider from '../context/global_context'


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const visibility = NavigationBar.useVisibility()
  const [loaded, error] = useFonts({
    Poppins_Thin: require('../assets/fonts/static/Poppins-Thin.ttf'),
    Poppins_ExtraLight: require('../assets/fonts/static/Poppins-ExtraLight.ttf'),
    Poppins_Light: require('../assets/fonts/static/Poppins-Light.ttf'),
    Poppins: require('../assets/fonts/static/Poppins-Regular.ttf'),
    Poppins_Medium: require('../assets/fonts/static/Poppins-Medium.ttf'),
    Poppins_Semibold: require('../assets/fonts/static/Poppins-SemiBold.ttf'),
    Poppins_Bold: require('../assets/fonts/static/Poppins-Bold.ttf'),
    Poppins_Extrabold: require('../assets/fonts/static/Poppins-ExtraBold.ttf'),
    Poppins_Black: require('../assets/fonts/static/Poppins-Black.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (visibility === 'visible') {
      Platform.OS === "android" && NavigationBar.setBackgroundColorAsync('white')
      Platform.OS === "android" && NavigationBar.setBorderColorAsync('white')
    }
  }, [visibility])

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }




  return <RootLayoutNav />;
}

function RootLayoutNav() {

  return (
    <GlobalContextProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: '' }} />
        <Stack.Screen name="[id]" options={{ title: '', headerShadowVisible: false }} />
        <Stack.Screen name="article/[articles]" options={{ headerShown: false }} />
        <Stack.Screen name="account/index" options={{ title: '' }} />
        <Stack.Screen name="account/[account]" options={{ title: '' }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </GlobalContextProvider>
  );
}
