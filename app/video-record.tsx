import React, { useState } from 'react';
import { StyleSheet, ScrollView, Dimensions, View, Platform } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Textarea } from '~/components/ui/textarea';
import { Text } from '~/components/ui/text';
import { ChevronLeft } from '~/lib/icons/ChevronLeft';
import { Trash } from '~/lib/icons/Trash';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '~/components/ui/alert-dialog';
import { useDispatch } from 'react-redux';
import { VideoView, useVideoPlayer } from 'expo-video';
import { removeVideoRecord } from '~/store/slice/video-slice';
import { Headphones } from '~/lib/icons/Headphones';
import * as Speech from 'expo-speech';
import { Pause } from '~/lib/icons/Pause';



export default function VideoRecordScreen() {

    const router = useRouter()
    const dispatch = useDispatch()

    const { id, url, translation } = useLocalSearchParams();

    const [isReading, setIsReading] = useState(false)

    const handleDelete = () => {
        router.back()
        dispatch(removeVideoRecord(id as string))
    }

    const player = useVideoPlayer(url as string, player => {
        player.loop = true;
        player.play();
    });

    const handleRead = () => {
        Speech.speak(translation as string, {
            voice: Platform.OS == 'android' ? 'en-US-default' : 'com.apple.eloquence.en-US.Flo',
            onStart: () => setIsReading(true),
            onStopped: () => setIsReading(false),
            onDone: () => setIsReading(false)
        })
    }

    return (
        <ScrollView className='flex-col' >
            <VideoView style={styles.video} player={player} contentFit='contain' allowsFullscreen allowsPictureInPicture />
            <View className='pl-5 pr-5 pt-5'>
                <Textarea
                    value={translation as string}
                    editable={false}
                />
            </View>
            <View className='flex-row gap-3 pl-10 pr-10 pt-5 pb-10 w-full align-center justify-center'>
                <Button variant={'ghost'} className='flex-row gap-3' onPress={() => router.back()}>
                    <ChevronLeft className='text-foreground' size={18} />
                    <Text>Go back</Text>
                </Button>
                {isReading ? (
                    <Button variant={'ghost'} className='flex-row gap-3' onPress={() => Speech.stop()}>
                        <Pause className='text-foreground' size={17} />
                        <Text>Stop</Text>
                    </Button>
                ) : (
                    <Button variant={'ghost'} className='flex-row gap-3' onPress={handleRead}>
                        <Headphones className='text-foreground' size={18} />
                        <Text>Listen</Text>
                    </Button>
                )}

                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={'destructive'} className='flex-row gap-3'>
                            <Trash className='text-foreground' size={18} />
                            <Text>Delete</Text>
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>This action cannot be undone. This will permanently delete the translation</AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>
                                <Text>Cancel</Text>
                            </AlertDialogCancel>
                            <AlertDialogAction onPress={handleDelete}>
                                <Text>Continue</Text>
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </View>
        </ScrollView >
    );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    video: {
        flex: 1,
        width: width,
        height: height,
    },
});

