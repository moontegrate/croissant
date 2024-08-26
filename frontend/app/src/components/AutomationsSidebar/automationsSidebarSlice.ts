import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    groupsFilter: string
};

const initialState: InitialState = {
    groupsFilter: "all"
};

const automationsSidebarSlice = createSlice({
    name: 'automationsSidebar',
    initialState,
    reducers: {
        setGroupsFilter: (state, action: PayloadAction<string>) => { state.groupsFilter = action.payload }
    }
});

export default automationsSidebarSlice.reducer;
export const { setGroupsFilter } = automationsSidebarSlice.actions;