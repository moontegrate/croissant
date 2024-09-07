import { configureStore } from '@reduxjs/toolkit';

import appSlice from '../components/App/appSlice';
import automationsSidebarSlice from '../components/AutomationsSidebar/automationsSidebarSlice';
import interactiveMapSlice from '../components/InteractiveMap/interactiveMapSlice';
import NoteCardModalSlice from '../components/NoteCardModal/NoteCardModalSlice';

const store = configureStore({
    reducer: {
        appSlice,
        automationsSidebarSlice,
        interactiveMapSlice,
        NoteCardModalSlice
    },
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;