import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    theme: {
        colors: {
            flowCardsAccent: {
                messageCard: string,
                actionCard: string,
                conditionCard: string,
                noteCard: string
            }
        }
    },
    accessToken: string | null,
    isTokenReady: boolean,
    isAuthenticated: boolean | null,
    isHamburgerClicked: boolean
};

const initialState: InitialState = {
    theme: {
        colors: {
            flowCardsAccent: {
                messageCard: "#2F71F0",
                actionCard: "#FFC93F",
                conditionCard: "#4CE99E",
                noteCard: "#6C9FFF"
            }
        }
    },
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