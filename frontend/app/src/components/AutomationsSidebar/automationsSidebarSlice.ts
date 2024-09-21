import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { GroupData, InitialState } from './interfaces';

const initialState: InitialState = {
    groups: [],
    groupsFilter: "all"
};

const automationsSidebarSlice = createSlice({
    name: 'automationsSidebar',
    initialState,
    reducers: {
        setGroups: (state, action: PayloadAction<GroupData[]>) => { state.groups = action.payload },
        setGroupsFilter: (state, action: PayloadAction<string | boolean>) => { state.groupsFilter = action.payload }
    }
});

export default automationsSidebarSlice.reducer;
export const { setGroups, setGroupsFilter } = automationsSidebarSlice.actions;