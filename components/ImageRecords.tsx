import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';
import { Image } from 'expo-image'

type Props = {
  id: Number,
  title: string;
  imageUrl: any;
  size: string;
  result: string;
  onPress: () => void;
  containerStyle?: object;
  createdDate: Date;
  active: boolean;
};

const ImageRecords: React.FC<Props> = ({
  id,
  title,
  imageUrl,
  size,
  result,
  onPress,
  containerStyle,
  createdDate,
  active,
}): JSX.Element | null => {
  if (active == true) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <TouchableOpacity>
            <Card className='w-full max-w-sm'>
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
      <DialogContent>
        <DialogHeader>
          {/* <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {result}
          </DialogDescription> */}
          <Image source={"https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_4_1_201504011527160987_game_Minecraft(1).jpg"}/>
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
    );
  }
  return null;
}

export default ImageRecords;