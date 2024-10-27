import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArrowData, InitialState, NodeData } from "./interfaces";
import arrows from './arrows.json';
import { MessageCardData } from "../FlowCards/MessageCard/interfaces";

const initialState: InitialState = {
    isDragging: false,
    isBinding: false,
    bindingFrom: null,
    isAddModal: false,
    isTextEditModal: false,
    textEditingNode: null,
    blockCardClick: false,
    dragId: undefined,
    scale: 1,
    automationId: "",
    automationName: "",
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
        setIsTextEditModal: (state, action: PayloadAction<boolean>) => { state.isTextEditModal = action.payload },
        setTextEditingNode: (state, action: PayloadAction<MessageCardData | null>) => { state.textEditingNode = action.payload },
        setBlockCardClick: (state, action: PayloadAction<boolean>) => { state.blockCardClick = action.payload },
        setDragId: (state, action: PayloadAction<string | undefined>) => { state.dragId = action.payload },
        setAutomationId: (state, action: PayloadAction<string>) => { state.automationId = action.payload },
        setAutomationName: (state, action: PayloadAction<string>) => { state.automationName = action.payload },
        setArrows: (state, action: PayloadAction<ArrowData[]>) => { state.arrows = action.payload },
        setNodes: (state, action: PayloadAction<NodeData[]>) => { state.nodes = action.payload },
        setScale: (state, action: PayloadAction<number>) => { state.scale = action.payload }
    }
});

export default interactiveMapSlice.reducer;
export const {
    setArrows,
    setAutomationId,
    setAutomationName,
    setBlockCardClick,
    setDragId,
    setIsDragging,
    setIsBinding,
    setBindingFrom,
    setIsAddModal,
    setIsTextEditModal,
    setTextEditingNode,
    setNodes,
    setScale
} = interactiveMapSlice.actions;