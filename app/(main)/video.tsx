import * as React from 'react';
import { Text } from '~/components/ui/text';
import { View, StyleSheet, ToastAndroid } from 'react-native';
import { Button } from '~/components/ui/button';
import { Video } from '~/lib/icons/Video';
import { Clapperboard } from '~/lib/icons/Clapperboard';
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useRef, useState } from 'react';
import { Repeat2 } from '~/lib/icons/Repeat2';
import { X } from '~/lib/icons/X';
import { Pause } from '~/lib/icons/Pause';
import { Trash } from '~/lib/icons/Trash';
import { Check } from '~/lib/icons/Check';
import { Cctv } from 'lucide-react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { UploadToCloudinary } from '~/service/cloudinary-api';
import { useDispatch, useSelector } from 'react-redux';
import { addVideoRecord } from '~/store/slice/video-slice';
import { Loader } from '~/lib/icons/Loader';
import { RootState } from '~/store/store';
import { changeUser } from '~/store/slice/user-slice';
import { UploadVideo } from '~/service/upload-api';
import { HubConnection } from '@microsoft/signalr';
import connectToSignalR from '~/utils/signal-r-connect';
import { Textarea } from '~/components/ui/textarea';


export default function VideoScreen() {

    const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions()
    const [preview, setPreview] = useState<any>(null)
    const [video, setVideo] = useState<any>(null)
    const [isRecording, setIsRecording] = useState(false)
    const cameraRef = useRef<CameraView | null>(null)
    const [loading, setLoading] = useState(false)
    const [connection, setConnection] = useState<HubConnection | null>(null);
    const [translation, setTranslation] = useState<string[]>([])

    const dispatch = useDispatch()
    const userId = useSelector((state: RootState) => state.userRecordSlice)

    useEffect(() => {
        if (userId == '') {
            const newId = Date.now().toString()
            dispatch(changeUser(newId));
        };
    }, [userId]);

    useEffect(() => {
        const setupConnection = async () => {
            const res = await connectToSignalR(userId, 'notification');
            if (res) {
                res.serverTimeoutInMilliseconds = 1000 * 60000;
                res.keepAliveIntervalInMilliseconds = 1000 * 10;
                setConnection(res);
            }
            res?.on("SendMessage", (res: any) => {
                if (res.statusResponse) {
                    setPreview(null)
                    setLoading(false)
                    setTranslation(res.data)
                } else {
                    ToastAndroid.show('Failed to translate video please try again', ToastAndroid.SHORT)
                }
                console.log(res)
                // setMessages((prevMessages) => [...prevMessages, message]);
            });
        };

        if (!connection && userId !== '')
            setupConnection();

        // return () => {
        //     if (connection) {
        //         connection.stop();
        //     }
        // };
    }, [connection]);

    const grantPermission = () => {
        requestPermission()
        requestMicrophonePermission()
        setIsCameraOn(true)
    }

    const previewPlayer = useVideoPlayer(preview, player => {
        player.loop = true;
        player.play();
    });

    const videoPlayer = useVideoPlayer(video, player => {
        player.loop = true;
        player.play();
    })

    if (!permission || !microphonePermission) {
        return <View />;
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const clear = () => {
        setPreview(null)
        setVideo(null)
    }



    const handleRecordVideo = async () => {
        if (cameraRef.current) {
            try {
                setIsRecording(true);
                const videoData = await cameraRef.current.recordAsync({});
                setPreview(videoData);
            } catch (error) {
                console.error("Error while recording video: ", error);
            } finally {
                setIsRecording(false);
            }
        }
    };

    const handleStopRecording = () => {
        if (cameraRef.current) {
            setIsRecording(false)
            cameraRef.current.stopRecording()
        }
    }

    const pickVideoAsync = async () => {
        const mediaPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!mediaPermission.granted) {
            alert('Permission to access media library is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['videos'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setPreview(result.assets[0])
        }
    };

    const handleUploadVideo = async () => {
        setLoading(true)
        const data = new FormData()
        const file: any = {
            uri: preview.uri || '',
            name: preview.fileName || 'upload.mp4',
            type: preview.mimeType || 'video/mp4'
        }
        data.append('file', file as File)
        data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string)

        const res = await UploadToCloudinary(data)
        if (res) {
            setLoading(false)
            if (res.success) {
                setVideo(res.data.url)
                // ToastAndroid.show('Upload successful', ToastAndroid.SHORT)
                dispatch(addVideoRecord({ url: res.data.url as string, translation: 'Tôi là ai' }))
                await handleTranslate(res.data.url)
            } else {
                ToastAndroid.show('Failed to use video please try again', ToastAndroid.SHORT)
                // alert('Failed to use video please try again');
            }
        }
    }

    const handleTranslate = async (url: string) => {
        try {
            const res = await UploadVideo({ Video: url, UserId: userId })
            if (res) {
                console.log(res)
                if (res.success) {
                    ToastAndroid.show('Video added to queue', ToastAndroid.SHORT)
                    // setPreview(null)
                } else {
                    ToastAndroid.show('Failed to add video to queue', ToastAndroid.SHORT)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }


    if (isCameraOn && !video && !preview) {
        return (
            <View className='flex-1 w-full h-full'>
                <CameraView
                    // className=''1
                    mode='video'
                    ref={cameraRef}
                    style={styles.container}
                    facing={facing}
                >
                    <View className='absolute flex-row gap-3 top-5 left-5 items-center justify-between'>
                        <Cctv className='text-foreground' size={20} />
                        <Text className='text-red-500'>Recording</Text>
                    </View>
                    <View className='absolute bottom-10 left-0 right-0 flex-row gap-1 items-center justify-center'>
                        <Button variant={'ghost'} onPress={toggleCameraFacing}>
                            <Repeat2 className='text-foreground' />
                        </Button>
                        <Button variant={'ghost'} onPress={isRecording ? handleStopRecording : handleRecordVideo} size={'lg'}>
                            {isRecording ? (
                                <Pause className='text-foreground' size={30} />
                            ) : (
                                <Video className='text-foreground' size={30} />
                            )}
                        </Button>
                        <Button variant={'ghost'} onPress={() => setIsCameraOn(false)}>
                            <X className='text-foreground' />
                        </Button>
                    </View>
                </CameraView>
            </View>
        )
    }

    if (preview) {
        return (
            <View className='relative flex-1 p-0 items-center justify-center h-full'>
                <VideoView style={styles.video} player={previewPlayer} contentFit='contain' allowsFullscreen allowsPictureInPicture />
                <View className='absolute bottom-5 left-0 right-0 flex-row gap-1 items-center justify-center'>
                    <Button variant={'ghost'} disabled={loading} onPress={clear}>
                        {loading ? (
                            <Loader className='text-foreground' />
                        ) : (
                            <Trash className='text-foreground' />
                        )}
                    </Button>
                    <Button variant={'ghost'} disabled={loading} onPress={handleUploadVideo}>
                        {loading ? (
                            <Loader className='text-foreground' />
                        ) : (
                            <Check className='text-foreground' />
                        )}
                    </Button>
                </View>
            </View>
        )
    }

    if (video) {
        return (
            <View className='relative flex-1 gap-2'>
                <VideoView style={styles.video} player={videoPlayer} contentFit='contain' allowsFullscreen allowsPictureInPicture />
                <View className='pl-5 pr-5 pt-5'>
                    {translation.map((sentence, index) => (
                        <Text key={index}>{sentence}</Text>
                    ))}
                </View>
                <View className='pl-5 pr-5 pt-5 pb-10'>
                    <Button
                        className='flex-row gap-2 w-full'
                        variant={'outline'}
                        onPress={clear}
                    >
                        <Clapperboard className='text-foreground' size={17} />
                        <Text>Clear</Text>
                    </Button>
                </View>
            </View>
        )
    }

    return (
        <View className='flex-column gap-2 pl-10 pr-10 pt-6'>
            <View className='flex-column gap-3'>
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={(!permission?.granted || !microphonePermission?.granted) ? grantPermission : () => setIsCameraOn(true)}
                    disabled={!connection}
                >
                    <Video className='text-foreground' size={17} />
                    <Text>Film Video</Text>
                </Button>
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={pickVideoAsync}
                    disabled={!connection}
                >
                    <Clapperboard className='text-foreground' size={17} />
                    <Text>Upload Video</Text>
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    video: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
    },
});