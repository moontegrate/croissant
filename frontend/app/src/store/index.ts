import { configureStore } from '@reduxjs/toolkit';

import appSlice from '../components/App/appSlice';
import interactiveMapSlice from '../components/InteractiveMap/interactiveMapSlice';

const store = configureStore({
    reducer: {
        appSlice,
        interactiveMapSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;