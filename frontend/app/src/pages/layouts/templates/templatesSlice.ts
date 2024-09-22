import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { InitialState } from "./interfaces";

const initialState: InitialState = {
    selectedTemplateType: "All templates"
};

const templatesSlice = createSlice({
    name: "templates",
    initialState,
    reducers: {
        setSelectedTemplateType: (state, action: PayloadAction<string>) => { state.selectedTemplateType = action.payload },
    }
});

export default templatesSlice.reducer;
export const {
    setSelectedTemplateType
} = templatesSlice.actions;