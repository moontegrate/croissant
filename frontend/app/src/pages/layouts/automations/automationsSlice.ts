import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { AutomationData } from "./interfaces";
import { InitialState } from "./interfaces";

const initialState: InitialState = {
    automations: []
};

const automationsSlice = createSlice({
    name: "automations",
    initialState,
    reducers: {
        setAutomations: (state, action: PayloadAction<AutomationData[]>) => { state.automations = action.payload }
    }
});

export default automationsSlice.reducer;
export const { setAutomations } = automationsSlice.actions;