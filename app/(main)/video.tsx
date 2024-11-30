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
import { Image } from 'react-native'
import { Pause } from '~/lib/icons/Pause';
import { Cctv } from 'lucide-react-native';


export default function VideoScreen() {

    const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [microphonePermission, requestMicrophonePermission] = useMicrophonePermissions()
    const [video, setVideo] = useState<any>(null)
    const [isRecording, setIsRecording] = useState(false)
    const cameraRef = useRef<CameraView | null>(null)

    const grantPermission = () => {
        requestPermission()
        requestMicrophonePermission()
    }
        
    if (!permission && !microphonePermission) {
        return <View />;
    }
    

    if (!permission?.granted && !microphonePermission?.granted) {
        return (
            <View className='flex-1 justify-center'>
                <Text className='pb-10'>We need your permission to show the camera</Text>
                <Button onPress={grantPermission}>
                    <Text> Grant Permission</Text>
                </Button>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    // console.log('video', video)

    const handleRecordVideo = async () => {
        if (cameraRef.current) {
            try {
                setIsRecording(true);
                const videoData = await cameraRef.current.recordAsync({});
                setVideo(videoData);
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
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
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

    if (isCameraOn && !video) {
        return (
            <View className='flex-1 w-full h-full'>
                <CameraView
                    // className=''
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

    console.log(video)

    if (video) {
        return (
            <View className='flex-1'>
                <Image
                    className='flex w-full h-full'
                    style={styles.image}
                    source={video.uri}
                />
                <Button onPress={() => setVideo(null)}><Text>Delete</Text></Button>
            </View>
        )
    }

    return (
        <View className='flex-column gap-2 pl-10 pr-10 pt-6'>
            <View className='flex-column gap-3'>
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={() => setIsCameraOn(true)}
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
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
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