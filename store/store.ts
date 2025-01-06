import { combineReducers, configureStore } from '@reduxjs/toolkit';
import imageSlice from './slice/image-slice';
import videoSlice from './slice/video-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer, persistStore } from 'redux-persist';
import userSlice from './slice/user-slice';

const rootReducer = combineReducers({
    imageRecordSlice: imageSlice,
    videoReordSlice: videoSlice,
    userRecordSlice: userSlice
});

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['imageRecordSlice', 'videoReordSlice', 'userRecordSlice'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});


export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
