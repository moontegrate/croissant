import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Interfaces
import { AccountData, AutomationData, GroupData, InitialState } from "./interfaces";

const initialState: InitialState = {
    accounts: [],
    automations: [],
    groups: [],
    groupsFilter: false,
    channelsFilter: "All channels",
    statusFilter: "All statuses",
    sort: "Created date",
    isAutomationAdding: false,
    currentModalView: 1,
    createAutomationForm: {
        automationName: null,
        selectedAccount: null
    }
};

const automationsSlice = createSlice({
    name: "automations",
    initialState,
    reducers: {
        setAccounts: (state, action: PayloadAction<AccountData[]>) => { state.accounts = action.payload },
        setAutomations: (state, action: PayloadAction<AutomationData[]>) => { state.automations = action.payload },
        setGroups: (state, action: PayloadAction<GroupData[]>) => { state.groups = action.payload },
        setGroupsFilter: (state, action: PayloadAction<string | boolean | null>) => { state.groupsFilter = action.payload },
        setChannelsFilter: (state, action: PayloadAction<string>) => { state.channelsFilter = action.payload },
        setStatusFilter: (state, action: PayloadAction<string>) => { state.statusFilter = action.payload },
        setSortBy: (state, action: PayloadAction<string>) => { state.sort = action.payload },
        setIsAutomationAdding: (state, action: PayloadAction<boolean>) => { state.isAutomationAdding = action.payload },
        setCurrentModalView: (state, action: PayloadAction<number>) => { state.currentModalView = action.payload },
        setCreateAutomationForm: (state, action: PayloadAction<{automationName: string | null, selectedAccount: AccountData | null}>) => { state.createAutomationForm = action.payload }
    }
});

export default automationsSlice.reducer;
export const {
    setAccounts,
    setAutomations,
    setChannelsFilter,
    setCreateAutomationForm,
    setCurrentModalView,
    setGroups,
    setGroupsFilter,
    setIsAutomationAdding,
    setStatusFilter,
    setSortBy,
} = automationsSlice.actions;