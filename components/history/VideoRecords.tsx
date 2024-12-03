import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '../ui/dialog';
import { Button } from '../ui/button';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '~/components/ui/text';
import { StyleSheet } from 'react-native';
import { Image } from 'expo-image'
import { useVideoPlayer } from 'expo-video/build/VideoPlayer';
import { VideoView } from 'expo-video';

type Props = {
  id: Number,
  title: string;
  videoUrl: any;
  size: string;
  result: string;
  onPress: () => void;
  containerStyle?: object;
  createdDate: Date;
  active: boolean;
};


const VideoRecords: React.FC<Props> = ({
  id,
  title,
  videoUrl,
  size,
  result,
  onPress,
  containerStyle,
  createdDate,
  active,
}) => {

  const [video, setVideo] = useState<any>(videoUrl)

  const player = useVideoPlayer(video, player => {
    player.loop = true;
    player.play();
  });

  if (active == true) {
    return (
      <View className="w-full">
        <Dialog>
          <DialogTrigger asChild>
            <TouchableOpacity>
              <Card>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{result}</CardDescription>
                </CardContent>
                <CardFooter>
                  <CardDescription>{createdDate.toISOString()}</CardDescription>
                </CardFooter>
              </Card>
            </TouchableOpacity>
          </DialogTrigger>
          <DialogContent className='flex'>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>
                {result}
              </DialogDescription>
              <View className='relative flex-1'>
              <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
                <View style={styles.controlsContainer}>
                    {/* <Button onPress={() => { isPlaying ? player.pause() : player.play() }}><Text>{isPlaying ? 'Pause' : 'Play'}</Text></Button> */}
                    <Button onPress={() => setVideo(null)}><Text>Delete</Text></Button>
                </View>
              </View> 
              {/* <Image source={"https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_4_1_201504011527160987_game_Minecraft(1).jpg"} /> */}
            </DialogHeader>
            <DialogFooter>
              <DialogClose asChild>
                <Button>
                  <Text>OK</Text>
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </View>
    );
  }
  return null;
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
      width: 350,
      height: 275,
  },
  controlsContainer: {
      padding: 10,
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

export default VideoRecords;