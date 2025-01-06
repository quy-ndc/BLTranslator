import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { View, ScrollView } from "react-native";
import { Text } from "~/components/ui/text";
import ImageRecord from "~/components/history/image-record";
import { useSelector } from 'react-redux';
import { RootState } from '~/store/store';
import VideoRecord from "~/components/history/video-record";


export default function HistoryScreen() {

  const imageRecords = useSelector((state: RootState) => state.imageRecordSlice)
  const videoRecords = useSelector((state: RootState) => state.videoReordSlice)

  const [value, setValue] = React.useState("video");

  return (
    <View className="flex-row w-full h-full p-6">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full mx-auto flex-col gap-3"
      >
        <TabsList className="flex-row w-full">
          {/* <TabsTrigger value="image" className="flex-1">
            <Text>Image</Text>
          </TabsTrigger> */}
          <TabsTrigger value="video" className="flex-1">
            <Text>Video</Text>
          </TabsTrigger>
        </TabsList>
        {/* <TabsContent value="image" className="flex-col gap-3 items-center justify-center">
          <ScrollView className="pt-3 pb-3">
            {imageRecords.map((rec) => (
              <ImageRecord
                key={rec.id}
                id={rec.id}
                translation={rec.translation}
                url={rec.url}
                createdAt={rec.createdAt}
              />
            ))}
          </ScrollView>
        </TabsContent> */}
        <TabsContent value="video">
          <ScrollView className="pt-3 pb-3">
            {videoRecords.map((rec) => (
              <VideoRecord
                key={rec.id}
                id={rec.id}
                translation={rec.translation}
                url={rec.url}
                createdAt={rec.createdAt}
              />
            ))}
          </ScrollView>
        </TabsContent>
      </Tabs>
    </View>
  );
}
