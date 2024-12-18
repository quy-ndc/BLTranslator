import { Tabs } from 'expo-router';
import { Image } from '~/lib/icons/Image';
import { Video } from '~/lib/icons/Video';
import { History } from '~/lib/icons/History';

export default function TabLayout() {
    return (
        <Tabs>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Image',
                    tabBarIcon: ({ color, size }) => (
                        <Image color={color} size={size} />
                    ),
                    headerShown: false,
                    animation: 'shift'
                }}
            />
            <Tabs.Screen
                name="video"
                options={{
                    title: 'Video',
                    tabBarIcon: ({ color, size }) => (
                        <Video color={color} size={size} />
                    ),
                    headerShown: false,
                    animation: 'shift'
                }} />
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    tabBarIcon: ({ color, size }) => (
                        <History color={color} size={size} />
                    ),
                    headerShown: false,
                    animation: 'shift'
                }}
            />
        </Tabs>
    );
}
