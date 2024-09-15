import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import appSlice from '../components/App/appSlice';
import automationsSidebarSlice from '../components/AutomationsSidebar/automationsSidebarSlice';
import interactiveMapSlice from '../components/InteractiveMap/interactiveMapSlice';
import NoteCardModalSlice from '../components/NoteCardModal/NoteCardModalSlice';

const store = configureStore({
    reducer: {
        appSlice,
        automationsSidebarSlice,
        interactiveMapSlice,
        NoteCardModalSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware ),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;