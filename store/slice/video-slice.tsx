import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface VideoRecord {
    id: string
    url: string
    translation: string
    createdAt: string
}

const initialState: VideoRecord[] = []

const videoRecordSlice = createSlice({
    name: 'videoRecord',
    initialState,
    reducers: {
        addVideoRecord: (state, action: PayloadAction<{ url: string, translation: string }>) => {
            state.push({
                id: Date.now().toString(),
                url: action.payload.url,
                translation: action.payload.translation,
                createdAt: new Date().toISOString()
            });
        },
        removeVideoRecord: (state, action: PayloadAction<string>) => {
            return state.filter((record) => record.id !== action.payload);
        },
        resetVideoRecord: (state) => {
            state = []
        }
    },
});

export const { addVideoRecord, removeVideoRecord, resetVideoRecord } = videoRecordSlice.actions;

export default videoRecordSlice.reducer;
