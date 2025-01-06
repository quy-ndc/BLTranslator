import '~/global.css';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { SplashScreen, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/lib/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { Provider } from 'react-redux';
import { persistor, store } from '~/store/store';
import { Text } from '~/components/ui/text'
import { PersistGate } from 'redux-persist/integration/react';
import AblyWrapper from '~/utils/ably-provider';
import Toast from 'react-native-toast-message';


const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: NAV_THEME.dark,
};

export {
  ErrorBoundary,
} from 'expo-router';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem('theme');
      if (Platform.OS === 'web') {
        document.documentElement.classList.add('bg-background');
      }
      if (!theme) {
        AsyncStorage.setItem('theme', colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === 'dark' ? 'dark' : 'light';
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);
        setAndroidNavigationBar(colorTheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      setAndroidNavigationBar(colorTheme);
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={<View className='flex-1 w-full h-full align-center justify-center'><Text>Loading...</Text></View>} persistor={persistor}>
          <AblyWrapper>
            <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
              <StatusBar style={isDarkColorScheme ? 'light' : 'dark'} />
              <Stack>
                <Stack.Screen
                  name='(main)'
                  options={{
                    title: 'Translator',
                    headerRight: () => <ThemeToggle />,
                  }}
                />
                <Stack.Screen
                  name='image-record'
                  options={{
                    title: 'Image record',
                    presentation: 'modal',
                    headerShown: false,
                    animation: 'fade'
                  }}
                  getId={({ params }) => params?.id || undefined}
                />
                <Stack.Screen
                  name='video-record'
                  options={{
                    title: 'Video record',
                    presentation: 'modal',
                    headerShown: false,
                    animation: 'fade'
                  }}
                  getId={({ params }) => params?.id || undefined}
                />
                <Stack.Screen
                  name='+not-found'
                  options={{
                    headerShown: false
                  }}
                />
              </Stack>
              <PortalHost />
            </ThemeProvider>
          </AblyWrapper>
        </PersistGate>
      </Provider>
      <Toast />
    </>
  );
}
