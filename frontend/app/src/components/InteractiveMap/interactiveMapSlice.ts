import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArrowData, InitialState, NodeData } from "./interfaces";
import arrows from './arrows.json';

const initialState: InitialState = {
    isDragging: false,
    isBinding: false,
    bindingFrom: null,
    isAddModal: false,
    blockCardClick: false,
    dragId: undefined,
    scale: 1,
    automationId: "",
    nodes: [],
    arrows: arrows.arrows
};

const interactiveMapSlice = createSlice({
    name: 'interactiveMap',
    initialState,
    reducers: {
        setIsDragging: (state, action: PayloadAction<boolean>) => { state.isDragging = action.payload },
        setIsBinding: (state, action: PayloadAction<boolean>) => { state.isBinding = action.payload },
        setBindingFrom: (state, action: PayloadAction<string | null>) => { state.bindingFrom = action.payload },
        setIsAddModal: (state, action: PayloadAction<boolean>) => { state.isAddModal = action.payload },
        setBlockCardClick: (state, action: PayloadAction<boolean>) => { state.blockCardClick = action.payload },
        setDragId: (state, action: PayloadAction<string | undefined>) => { state.dragId = action.payload },
        setAutomationId: (state, action: PayloadAction<string>) => { state.automationId = action.payload },
        setArrows: (state, action: PayloadAction<ArrowData[]>) => { state.arrows = action.payload },
        setNodes: (state, action: PayloadAction<NodeData[]>) => { state.nodes = action.payload },
        setScale: (state, action: PayloadAction<number>) => { state.scale = action.payload }
    }
});

export default interactiveMapSlice.reducer;
export const { setArrows, setAutomationId, setBlockCardClick, setDragId, setIsDragging, setIsBinding, setBindingFrom, setIsAddModal, setNodes, setScale } = interactiveMapSlice.actions;