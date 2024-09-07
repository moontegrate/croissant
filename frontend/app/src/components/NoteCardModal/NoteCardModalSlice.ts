import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState } from "./interfaces";
import { NodeData } from "../InteractiveMap/interfaces";

const initialState: InitialState = {
    isModalOpen: false,
    node: null
};

const noteCardModalSlice = createSlice({
    name: 'noteCardModal',
    initialState,
    reducers: {
        setIsModalOpen: (state, action: PayloadAction<boolean>) => { state.isModalOpen = action.payload },
        setNode: (state, action: PayloadAction<NodeData | null>) => { state.node = action.payload }
    }
});

export default noteCardModalSlice.reducer;
export const { setIsModalOpen, setNode } = noteCardModalSlice.actions;