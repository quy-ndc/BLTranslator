import { ChannelProvider } from 'ably/react';
import * as React from 'react';
import { useSelector } from 'react-redux';
import VideoModule from '~/components/history/video/video-module';
import { RootState } from '~/store/store';

export default function VideoScreen() {

    const userId = useSelector((state: RootState) => state.userRecordSlice)

    return (
        <ChannelProvider channelName={`notification:${userId}`}>
            <VideoModule userId={userId} />
        </ChannelProvider>
    )
}