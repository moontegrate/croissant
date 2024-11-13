import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./interfaces";
import { NoteCardData } from "../FlowCards/NoteCard/interfaces";

const initialState: InitialState = {
    node: null
};

const noteCardModalSlice = createSlice({
    name: 'noteCardModal',
    initialState,
    reducers: {
        setNode: (state, action: PayloadAction<NoteCardData | null>) => { state.node = action.payload }
    }
});

export default noteCardModalSlice.reducer;
export const { setNode } = noteCardModalSlice.actions;