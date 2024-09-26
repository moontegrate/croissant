import { configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '../api/apiSlice';
import appSlice from '../components/App/appSlice';
import automationsSlice from '../pages/layouts/automations/automationsSlice';
import interactiveMapSlice from '../components/InteractiveMap/interactiveMapSlice';
import noteCardModalSlice from '../components/NoteCardModal/NoteCardModalSlice';
import templatesSlice from '../pages/layouts/templates/templatesSlice';

const store = configureStore({
    reducer: {
        appSlice,
        automationsSlice,
        interactiveMapSlice,
        noteCardModalSlice,
        templatesSlice,
        [apiSlice.reducerPath]: apiSlice.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(apiSlice.middleware ),
    devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;