import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { AccountData, AutomationData, GroupData, InitialState } from "./interfaces";

const initialState: InitialState = {
    accounts: [],
    automations: [],
    groups: [],
    groupsFilter: "all"
};

const automationsSlice = createSlice({
    name: "automations",
    initialState,
    reducers: {
        setAccounts: (state, action: PayloadAction<AccountData[]>) => { state.accounts = action.payload },
        setAutomations: (state, action: PayloadAction<AutomationData[]>) => { state.automations = action.payload },
        setGroups: (state, action: PayloadAction<GroupData[]>) => { state.groups = action.payload },
        setGroupsFilter: (state, action: PayloadAction<string | boolean>) => { state.groupsFilter = action.payload }
    }
});

export default automationsSlice.reducer;
export const {
    setAccounts,
    setAutomations,
    setGroups,
    setGroupsFilter
} = automationsSlice.actions;