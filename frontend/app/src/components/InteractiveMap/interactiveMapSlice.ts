import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialState, NodeData, NodeTypes } from "./interfaces";

const initialState: InitialState = {
    isDragging: false,
    dragId: undefined,
    scale: 1,
    nodes: [
        { id: 1, type: NodeTypes.Message, x: 50, y: 100, zIndex: 1 },
        { id: 2, type: NodeTypes.Action, x: 200, y: 200, zIndex: 2 },
        { id: 3, type: NodeTypes.Condition, x: 400, y: 700, zIndex: 3 },
        { id: 4, type: NodeTypes.Note, x: 300, y: 400, zIndex: 4, noteContent: 'Test note text' }
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