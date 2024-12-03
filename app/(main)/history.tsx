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
import ImageRecords from "~/components/history/ImageRecords";
import VideoRecords from "~/components/history/VideoRecords";

export default function HistoryScreen() {
  const [value, setValue] = React.useState("image");

  const imageRecords = [
    {
      id: 1,
      title: "Image Record 1",
      imageUrl:
        "https://cdn2.fptshop.com.vn/unsafe/1920x0/filters:quality(100)/2015_4_1_201504011527160987_game_Minecraft(1).jpg",
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
    {
      id: 4,
      title: "Image Record 4",
      imageUrl: "image4.png",
      size: "128MB",
      result: "Boat",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
    {
      id: 5,
      title: "Image Record 5",
      imageUrl: "image5.png",
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

  const videoRecords = [
    {
      id: 1,
      title: "Video Record 1",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      size: "128MB",
      result: "Good morning to yall lady",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
    {
      id: 2,
      title: "Video Record 2",
      videoUrl: "video2",
      size: "258MB",
      result: "Its mobius time",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
    {
      id: 3,
      title: "Video Record 3",
      videoUrl: "video3",
      size: "512MB",
      result: "Boat",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
    {
      id: 4,
      title: "Video Record 4",
      videoUrl: "video4",
      size: "128MB",
      result: "Boat",
      onPress: function (): void {
        throw new Error("Function not implemented.");
      },
      containerStyle: null,
      createdDate: new Date(),
      active: true,
    },
    {
      id: 5,
      title: "Video Record 5",
      videoUrl: "video5",
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
    <View className="flex-row w-full h-full p-6">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full mx-auto flex-col gap-3"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger value="image" className="flex-1">
            <Text>Image</Text>
          </TabsTrigger>
          <TabsTrigger value="video" className="flex-1">
            <Text>Video</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent
          value="image"
          className="flex-col gap-3 items-center justify-center"
        >
          {imageRecords.map((Rec) => (
            <ImageRecords
              key={Rec.id}
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
          ))}
        </TabsContent>
        <TabsContent
          value="video"
          className="flex-col gap-3 items-center justify-center"
        >
          {videoRecords.map((Rec) => (
            <VideoRecords
              key={Rec.id}
              id={Rec.id}
              title={Rec.title}
              videoUrl={Rec.videoUrl}
              size={Rec.size}
              result={Rec.result}
              onPress={Rec.onPress}
              containerStyle={{ marginBottom: 14, paddingHorizontal: 20 }}
              createdDate={Rec.createdDate}
              active={Rec.active}
            />
          ))}
        </TabsContent>
      </Tabs>
    </View>
  );
}
