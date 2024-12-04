import AsyncStorage from '@react-native-async-storage/async-storage';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { MoonStar } from '~/lib/icons/MoonStar';
import { Sun } from '~/lib/icons/Sun';
import { useColorScheme } from '~/lib/useColorScheme';
import { Button } from './ui/button';

export function ThemeToggle() {
  const { isDarkColorScheme, setColorScheme } = useColorScheme();
  return (
    <Button
      onPress={() => {
        const newTheme = isDarkColorScheme ? 'light' : 'dark';
        setColorScheme(newTheme);
        setAndroidNavigationBar(newTheme);
        AsyncStorage.setItem('theme', newTheme);
      }}
      variant={'ghost'}
      className='web:ring-offset-background web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2'
    >
      {isDarkColorScheme ? (
        <MoonStar className='text-foreground' size={23} strokeWidth={1.25} />
      ) : (
        <Sun className='text-foreground' size={24} strokeWidth={1.25} />
      )}
    </Button>
  );
}
