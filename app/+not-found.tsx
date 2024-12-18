import { Link, Stack } from 'expo-router';
import { View } from 'react-native';
import { Text } from '~/components/ui/text';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View className='flex-1 align-center items-center'>
        <Text>This screen doesn't exist.</Text>

        <Link href='/(main)'>
          <Text>Go to home screen!</Text>
        </Link>
      </View>
    </>
  );
}
