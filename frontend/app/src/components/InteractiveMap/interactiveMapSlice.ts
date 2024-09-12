import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, NodeData } from "./interfaces";
import nodes from './nodes.json';

const initialState: InitialState = {
    isDragging: false,
    isBinding: false,
    bindingFrom: null,
    isAddModal: false,
    dragId: undefined,
    scale: 1,
    nodes: nodes.nodes
};

const interactiveMapSlice = createSlice({
    name: 'interactiveMap',
    initialState,
    reducers: {
        setIsDragging: (state, action: PayloadAction<boolean>) => { state.isDragging = action.payload },
        setIsBinding: (state, action: PayloadAction<boolean>) => { state.isBinding = action.payload },
        setBindingFrom: (state, action: PayloadAction<number | null>) => { state.bindingFrom = action.payload },
        setIsAddModal: (state, action: PayloadAction<boolean>) => { state.isAddModal = action.payload },
        setDragId: (state, action: PayloadAction<number | undefined>) => { state.dragId = action.payload },
        setNodes: (state, action: PayloadAction<NodeData[]>) => { state.nodes = action.payload },
        setScale: (state, action: PayloadAction<number>) => { state.scale = action.payload }
    }
});

export default interactiveMapSlice.reducer;
export const { setDragId, setIsDragging, setIsBinding, setBindingFrom, setIsAddModal, setNodes, setScale } = interactiveMapSlice.actions;