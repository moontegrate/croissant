import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    accessToken: string | null,
    isTokenReady: boolean,
    isAuthenticated: boolean | null,
    isHamburgerClicked: boolean
};

const initialState: InitialState = {
    accessToken: null,
    isTokenReady: false,
    isAuthenticated: null,
    isHamburgerClicked: false
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => { state.accessToken = action.payload },
        setIsTokenReady: (state, action: PayloadAction<boolean>) => { state.isTokenReady = action.payload },
        setIsAuthenticated: (state, action: PayloadAction<boolean>) => { state.isAuthenticated = action.payload },
        setIsHamburgerClicked: (state, action: PayloadAction<boolean>) => { state.isHamburgerClicked = action.payload }
    }
});

export default appSlice.reducer;
export const { setAccessToken, setIsTokenReady, setIsAuthenticated, setIsHamburgerClicked } = appSlice.actions;