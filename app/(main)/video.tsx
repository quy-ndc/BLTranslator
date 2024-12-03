import * as React from 'react';
import { Text } from '~/components/ui/text';
import { View, StyleSheet } from 'react-native';
import { Button } from '~/components/ui/button';
import { Video } from '~/lib/icons/Video';
import { Clapperboard } from '~/lib/icons/Clapperboard';
import { CameraView, CameraType, useCameraPermissions, useMicrophonePermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { useRef, useState } from 'react';
import { Repeat2 } from '~/lib/icons/Repeat2';
import { X } from '~/lib/icons/X';
import { Pause } from '~/lib/icons/Pause';
import { Trash } from '~/lib/icons/Trash';
import { Check } from '~/lib/icons/Check';
import { Cctv } from 'lucide-react-native';
import { VideoView, useVideoPlayer } from 'expo-video';
import { UploadToCloudinary } from '~/service/cloudinary-api';


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

    const grantPermission = () => {
        requestPermission()
        requestMicrophonePermission()
        setIsCameraOn(true)
    }

    const previewPlayer = useVideoPlayer(preview, player => {
        player.loop = true;
        player.play();
    });

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

    // console.log('video', video)

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
            console.log(result);
        }
    };

    const handleUploadImage = async () => {
        setLoading(true)
        setVideo(preview)
        const data = new FormData()
        const file: any = {
            uri: preview.uri || '',
            name: 'upload.mp4',
            type: 'video/mp4'
        }
        data.append('file', file as File)
        data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string)

        const res = await UploadToCloudinary(data)
        console.log(res)
        if (res) {
            if (res.success) {
                setPreview(null)
            }
            console.log(res.data.url)
            setLoading(false)
        }
    }

    console.log('video', preview)

    if (isCameraOn && !video && !preview) {
        return (
            <View className='flex-1 w-full h-full'>
                <CameraView
                    // className=''
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
            <View className='relative flex-1 p-0 items-center- justify-center h-full'>
                <VideoView style={styles.video} player={previewPlayer} contentFit='contain' allowsFullscreen allowsPictureInPicture />
                <View className='absolute bottom-0 left-0 right-0 flex-row gap-1 items-center justify-center'>
                    <Button variant={'ghost'} onPress={() => setPreview(null)}>
                        <Trash className='text-foreground' />
                    </Button>
                    <Button variant={'ghost'} onPress={handleUploadImage}>
                        <Check className='text-foreground' />
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
                >
                    <Video className='text-foreground' size={17} />
                    <Text>Film Video</Text>
                </Button>
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={pickVideoAsync}
                >
                    <Clapperboard className='text-foreground' size={17} />
                    <Text>Upload Vidqeo</Text>
                </Button>
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={clear}
                >
                    <Clapperboard className='text-foreground' size={17} />
                    <Text>Upload Vidqeo</Text>
                </Button>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    contentContainer: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 50,
    },
    video: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',

    },
    message: {
        textAlign: 'center',
        paddingBottom: 10,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
    },
    button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    image: {
        flex: 1,
        width: '100%',
        backgroundColor: '#0553',
    },
});