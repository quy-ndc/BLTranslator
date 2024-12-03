import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Camera } from '~/lib/icons/Camera';
import { CloudUpload } from '~/lib/icons/CloudUpload';
import * as ImagePicker from 'expo-image-picker';
import { CameraCapturedPicture, CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Repeat2 } from '~/lib/icons/Repeat2';
import { useRef, useState } from 'react';
import { Image } from 'expo-image'
import { X } from '~/lib/icons/X';
import { Trash } from '~/lib/icons/Trash';
import { Check } from '~/lib/icons/Check';
import { UploadToCloudinary } from '~/service/cloudinary-api';


export default function ImageScreen() {

    const [isCameraOn, setIsCameraOn] = useState<boolean>(false)
    const [facing, setFacing] = useState<CameraType>('back');
    const [permission, requestPermission] = useCameraPermissions();
    const [preview, setPreview] = useState<any>(null)
    const [photo, setPhoto] = useState<any>(null)
    const cameraRef = useRef<CameraView | null>(null)
    const [loading, setLoading] = useState(false)
    const [url, setUrl] = useState('')

    const blurhash =
        '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

    const grantPermission = () => {
        requestPermission()
        setIsCameraOn(true)
    }

    if (!permission) {
        return <View />;
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const handleTakePhoto = async () => {
        if (cameraRef.current) {
            const takenPhoto = await cameraRef.current.takePictureAsync({
                quality: 1,
                base64: true,
                exif: false,
                imageType: 'jpg'
            })
            setPreview(takenPhoto!)
            // setPhoto(takenPhoto!)
        }
    }

    const handleConfirmPhoto = () => {
        setPhoto(preview)
        setPreview(null)
    }

    const handleClear = () => {
        setPreview(null)
        setPhoto(null)
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
            setPreview(result.assets[0])
        }
    };

    const handleUploadImage = async () => {
        setLoading(true)
        setPhoto(preview)
        const data = new FormData()
        const file: any = {
            uri: preview.uri || ' ',
            name: preview.fileName || 'upload.jpeg',
            type: preview.mimeType || 'image/jpeg'
        }
        // preview.base64 ? `data:image/jpeg;base64,${preview!.base64}` :
        data.append('file', file as File)
        data.append('upload_preset', process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string)

        const res = await UploadToCloudinary(data)
        console.log(res)
        if (res) {
            setLoading(false)
            if (res.success) {
                setUrl(res.data.url)
                setPreview(null)
            }
            console.log(res.data.url)
        }
    }

    console.log(preview)

    if (isCameraOn && !photo && !preview) {
        return (
            <View className='flex-1 w-full h-full'>
                <CameraView
                    // className=''
                    ref={cameraRef}
                    mode='picture'
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


    if (preview) {
        return (
            <View className='relative flex-1'>
                <Image
                    style={styles.image}
                    placeholder={blurhash}
                    source={preview.uri}
                    contentFit='contain'
                />
                <View className='absolute bottom-10 left-0 right-0 flex-row gap-1 items-center justify-center'>
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

    if (photo) {
        return (
            <View className='relative flex-1 gap-2 pl-10 pr-10 pt-6'>
                <Image
                    style={styles.image}
                    placeholder={blurhash}
                    source={photo.uri}
                    contentFit='cover'
                />
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={handleClear}
                >
                    <CloudUpload className='text-foreground' size={17} />
                    <Text>{url}</Text>
                </Button>
            </View>
        )
    }

    return (
        <View className='flex-column gap-2 pl-10 pr-10 pt-6'>
            <View className='flex-column gap-3'>
                <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={!permission.granted ? grantPermission : () => setIsCameraOn(true)}
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
                {/* <Button
                    className='flex-row gap-2 w-full'
                    variant={'outline'}
                    onPress={handleClear}
                >
                    <CloudUpload className='text-foreground' size={17} />
                    <Text>Clear</Text>
                </Button> */}
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