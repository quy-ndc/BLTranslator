import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Camera } from '~/lib/icons/Camera';
import { CloudUpload } from '~/lib/icons/CloudUpload';
import * as ImagePicker from 'expo-image-picker';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Repeat2 } from '~/lib/icons/Repeat2';
import { useRef, useState } from 'react';
import { Image } from 'react-native'
import { X } from '~/lib/icons/X';


export default function ImageScreen() {

    const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState<any>(null)
    const cameraRef = useRef<CameraView | null>(null)

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View className='flex-1 justify-center'>
                <Text className='pb-10'>We need your permission to show the camera</Text>
                <Button onPress={requestPermission}>Grant Permission</Button>
            </View>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const takenPhoto = await cameraRef.current.takePictureAsync({
                quality: 1,
                base64: true,
                exif: false
            })
            setPhoto(takenPhoto)
        }
    }

    const pickImageAsync = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (!permission.granted) {
            alert('Permission to access media library is required!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result);
        }
    };

    if (isCameraOn && !photo) {
        return (
            <View className='flex-1 w-full h-full'>
                <CameraView
                    // className=''
                    ref={cameraRef}
                    style={styles.container}
                    facing={facing}
                >
                    <View className='absolute bottom-10 left-0 right-0 flex-row gap-1 items-center justify-center'>
                        <Button variant={'ghost'} onPress={toggleCameraFacing}>
                            <Repeat2 className='text-foreground' />
                        </Button>
                        <Button variant={'ghost'} onPress={handleTakePhoto} size={'lg'}>
                            <Camera className='text-foreground' size={30} />
                        </Button>
                        <Button variant={'ghost'} onPress={() => setIsCameraOn(false)}>
                            <X className='text-foreground' />
                        </Button>
                    </View>
                </CameraView>
            </View>
        )
    }


    if (photo) {
        return (
            <View className='flex-1'>
                <Image
                    className='flex w-full h-full'
                    style={styles.image}
                    source={photo.uri}
                />
                <Button onPress={() => setPhoto(null)}><Text>Delete</Text></Button>
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
                    <Camera className='text-foreground' size={17} />
                    <Text>Take Image</Text>
                </Button>
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={pickImageAsync}
                >
                    <CloudUpload className='text-foreground' size={17} />
                    <Text>Upload Image</Text>
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