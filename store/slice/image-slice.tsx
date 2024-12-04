import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ImageRecord {
    id: string
    url: string
    translation: string
    createdAt: string
}

const initialState: ImageRecord[] = []

const imageRecordSlice = createSlice({
    name: 'imageRecord',
    initialState,
    reducers: {
        addImageRecord: (state, action: PayloadAction<{ url: string, translation: string }>) => {
            state.push({
                id: Date.now().toString(),
                url: action.payload.url,
                translation: action.payload.translation,
                createdAt: new Date().toISOString()
            });
        },
        removeImageRecord: (state, action: PayloadAction<string>) => {
            return state.filter((record) => record.id !== action.payload);
        },
        resetImageRecord: (state) => {
            state = []
        }
    },
});

export const { addImageRecord, removeImageRecord, resetImageRecord } = imageRecordSlice.actions;

export default imageRecordSlice.reducer;
