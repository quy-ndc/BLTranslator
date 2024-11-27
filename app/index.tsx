import * as React from 'react';
import { View } from 'react-native';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '~/components/ui/tabs';
import { Text } from '~/components/ui/text';
import { CloudUpload } from '~/lib/icons/CloudUpload';
import { Clapperboard } from '~/lib/icons/Clapperboard';
import { Camera } from '~/lib/icons/Camera';
import { Video } from '~/lib/icons/Video';
import { Loader } from '~/lib/icons/Loader';
import { Textarea } from '~/components/ui/textarea';
import { Progress } from '~/components/ui/progress';


export default function Screen() {

  const [value, setValue] = React.useState('image');

  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 10);

    return () => clearInterval(interval);
  }, []);

  return (
    <View className='flex-1 al p-6 gap-3'>
      <Tabs
        value={value}
        onValueChange={setValue}
        className='w-full max-w-[400px] mx-auto flex-col gap-1.5'
      >
        <TabsList className='flex-row w-full'>
          <TabsTrigger value='image' className='flex-1'>
            <Text>Image</Text>
          </TabsTrigger>
          <TabsTrigger value='video' className='flex-1'>
            <Text>Video</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value='image'>
          <Card>
            <CardHeader>
              <CardTitle>Image</CardTitle>
              <CardDescription>
                Decodes gestures in images into insights with precision
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-row justify-between gap-2 native:gap-2'>
              <Button className='flex-row gap-2 w-1/2' variant={'outline'}>
                <Camera className='text-foreground' size={17} />
                <Text>Take Image</Text>
              </Button>
              <Button className='flex-row gap-2 w-1/2' variant={'outline'}>
                <CloudUpload className='text-foreground' size={17} />
                <Text>Upload Image</Text>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='video'>
          <Card>
            <CardHeader>
              <CardTitle>Video</CardTitle>
              <CardDescription>
                Give body language gestures from videos a meaning
              </CardDescription>
            </CardHeader>
            <CardContent className='flex-row justify-between gap-2 native:gap-2'>
              <Button className='flex-row gap-2 w-1/2' variant={'outline'}>
                <Video className='text-foreground' size={17} />
                <Text>Film Video</Text>
              </Button>
              <Button className='flex-row gap-2 w-1/2' variant={'outline'}>
                <Clapperboard className='text-foreground' size={17} />
                <Text>Upload Video</Text>
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Result </CardTitle>
        </CardHeader>
        <CardContent className='flex-column gap-5 '>
          <View className='flex-row gap-2 justify-between items-center'>
            <Loader color='white' className='text-foreground animate-spin' size={18} />
            <Progress className='w-5/6' value={progress} />
          </View>
          <Textarea />
        </CardContent>
      </Card>
    </View>
  )
}
