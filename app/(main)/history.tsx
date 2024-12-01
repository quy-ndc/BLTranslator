import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { View, StyleSheet, Button } from "react-native";
import { CloudUpload } from "~/lib/icons/CloudUpload";
import { Clapperboard } from "~/lib/icons/Clapperboard";
import { Camera } from "~/lib/icons/Camera";
import { Video } from "~/lib/icons/Video";
import { useRouter } from "expo-router";
import { Loader } from "~/lib/icons/Loader";
import { Progress } from "~/components/ui/progress";
import { Textarea } from "~/components/ui/textarea";
import { Text } from "~/components/ui/text";
import ImageRecords from "~/components/ImageRecords";

export default function HistoryScreen() {
  const [value, setValue] = React.useState("image");

  const recording = [
    {
      id: 1,
      title: "Image Record 1",
      imageUrl: "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_4_1_201504011527160987_game_Minecraft(1).jpg",
      size: "16MB",
      result: "Thank you",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
    {
      id: 2,
      title: "Image Record 2",
      imageUrl: "image2.png",
      size: "32MB",
      result: "Hello",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
    {
      id: 3,
      title: "Image Record 3",
      imageUrl: "image3.png",
      size: "128MB",
      result: "Boat",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
  ];

  return (
    <View className="flex-row w-full h-full">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full mx-auto flex-col gap-1.5"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="image" className="flex-1">
            <Text>Image</Text>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex-1">
            <Text>Video</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="image">
        {recording.map((Rec) => (
          <View className="flex-row gap-3"
                key={Rec.id}
          >
            <ImageRecords
              id={Rec.id}
              title={Rec.title}
              imageUrl={Rec.imageUrl}
              size={Rec.size}
              result={Rec.result}
              onPress={Rec.onPress}
              containerStyle={{ marginBottom: 14, paddingHorizontal: 20 }}
              createdDate={Rec.createdDate}
              active={Rec.active}
            />
          </View>
        ))}
        </TabsContent>
        <TabsContent value="video">
          <Card>
            <CardHeader>
              <CardTitle>Video recordings</CardTitle>
              <CardDescription>
                Give body language gestures from videos a meaning
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-row justify-between gap-2 native:gap-2"></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}
