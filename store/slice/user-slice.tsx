import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: string = ''

const userRecordSlice = createSlice({
    name: 'userRecord',
    initialState,
    reducers: {
        changeUser: (state, action: PayloadAction<string>) => {
            return action.payload
        }
    },
});

export const { changeUser } = userRecordSlice.actions;

export default userRecordSlice.reducer;
