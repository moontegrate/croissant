import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, NodeData, NodeTypes } from "./interfaces";

const initialState: InitialState = {
    isDragging: false,
    dragId: undefined,
    scale: 1,
    nodes: [
        { id: 1, type: NodeTypes.Message, x: 50, y: 100, zIndex: 1 },
        { id: 2, type: NodeTypes.Action, x: 200, y: 100, zIndex: 1 }
    ]
};

const interactiveMapSlice = createSlice({
    name: 'interactiveMap',
    initialState,
    reducers: {
        setIsDragging: (state, action: PayloadAction<boolean>) => { state.isDragging = action.payload },
        setDragId: (state, action: PayloadAction<number | undefined>) => { state.dragId = action.payload },
        setNodes: (state, action: PayloadAction<NodeData[]>) => { state.nodes = action.payload },
        setScale: (state, action: PayloadAction<number>) => { state.scale = action.payload },
    }
});

export default interactiveMapSlice.reducer;
export const {setDragId, setIsDragging, setNodes, setScale } = interactiveMapSlice.actions;