import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    isAuthenticated: boolean,
    isHamburgerClicked: boolean
};

const initialState: InitialState = {
    isAuthenticated: true,
    isHamburgerClicked: false
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => { state.isAuthenticated = action.payload },
        setIsHamburgerClicked: (state, action: PayloadAction<boolean>) => { state.isHamburgerClicked = action.payload }
    }
});

export default appSlice.reducer;
export const { setIsAuthenticated, setIsHamburgerClicked } = appSlice.actions;