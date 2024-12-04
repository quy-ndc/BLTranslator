import React from 'react';
import { StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { Image } from 'expo-image'
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


export default function VideoRecordScreen() {

    const router = useRouter()
    const dispatch = useDispatch()

    const { id, url, translation, createdAt } = useLocalSearchParams();

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const handleDelete = () => {
        router.back()
        dispatch(removeVideoRecord(id as string))
    }

    const player = useVideoPlayer(url as string, player => {
        player.loop = true;
        player.play();
    });


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
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the translation
                            </AlertDialogDescription>
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
        </ScrollView>
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

