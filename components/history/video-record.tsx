import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { TouchableOpacity, View, ToastAndroid } from 'react-native';
import { formatDate } from '~/utils/format-date';
import { useRouter } from 'expo-router';
import { Button } from '../ui/button';
import { Trash } from '~/lib/icons/Trash';
import { Copy } from '~/lib/icons/Copy';
import * as Clipboard from 'expo-clipboard';
import { useDispatch } from 'react-redux';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from '../ui/alert-dialog';
import { Text } from '../ui/text'
import { removeVideoRecord } from '~/store/slice/video-slice';
import { Headphones } from '~/lib/icons/Headphones';
import * as Speech from 'expo-speech';


type Props = {
  id: string
  url: string
  translation: string
  createdAt: string
};

const VideoRecord: React.FC<Props> = ({ id, url, translation, createdAt }) => {

  const router = useRouter()
  const dispatch = useDispatch()

  const handleRecordClick = () => {
    router.push({
      pathname: '/video-record',
      params: {
        id: id,
        url: url,
        translation: translation,
      }
    })
  }

  const handleCopy = async () => {
    await Clipboard.setStringAsync(translation);
  }

  const handleRead = () => {
    Speech.speak(translation)
  }

  const handleDelete = () => {
    dispatch(removeVideoRecord(id))
    ToastAndroid.show('Deleted from memory', ToastAndroid.SHORT)
  }

  return (
    <TouchableOpacity onPress={handleRecordClick} className='mb-3'>
      <Card>
        <CardHeader>
          <CardTitle>Translation on {formatDate(createdAt)}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription style={{ fontSize: 17 }}>{translation}</CardDescription>
        </CardContent>
        <CardFooter>
          <View className='flex-row w-full align-center justify-between'>
            <View />
            <View className='flex-row'>
              <Button variant={'ghost'} onPress={handleCopy}>
                <Copy className='text-foreground' size={17} />s
              </Button>
              <Button variant={'ghost'} onPress={handleRead}>
                <Headphones className='text-foreground' size={17} />
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant={'ghost'}>
                    <Trash className='text-foreground' size={17} />
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
          </View>
        </CardFooter>
      </Card>
    </TouchableOpacity>
  );
}

export default VideoRecord