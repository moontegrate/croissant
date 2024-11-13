import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { InitialState } from "./interfaces";
import { NodeData } from "../FlowCards/__base/interfaces";
import { MessageCardData } from "../FlowCards/MessageCard/interfaces";

const initialState: InitialState = {
    isDragging: false,
    isBinding: false,
    bindingFrom: null,
    isAddModal: false,
    isTextEditModal: false,
    textEditingNode: null,
    scale: 1,
    automationId: "",
    automationName: "",
    nodes: [],
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
        setAutomationId: (state, action: PayloadAction<string>) => { state.automationId = action.payload },
        setAutomationName: (state, action: PayloadAction<string>) => { state.automationName = action.payload },
        setNodes: (state, action: PayloadAction<NodeData[]>) => { state.nodes = action.payload },
        setScale: (state, action: PayloadAction<number>) => { state.scale = action.payload }
    }
});

export default interactiveMapSlice.reducer;
export const {
    setAutomationId,
    setAutomationName,
    setIsDragging,
    setIsBinding,
    setBindingFrom,
    setIsAddModal,
    setIsTextEditModal,
    setTextEditingNode,
    setNodes,
    setScale
} = interactiveMapSlice.actions;