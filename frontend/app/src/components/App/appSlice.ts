import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    isAuthenticated: boolean
};

const initialState: InitialState = {
    isAuthenticated: true
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => { state.isAuthenticated = action.payload }
    }
});

export default appSlice.reducer;
export const { setIsAuthenticated } = appSlice.actions;