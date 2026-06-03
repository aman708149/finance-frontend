import { createSlice, PayloadAction } from "@reduxjs/toolkit";

 export interface AuthState {
    userId: string | null;
    email: string | null;
    role: any;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    userId: null,
    email: null,
    role: null,
    accessToken: null,
    refreshToken: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,

    reducers: {
        setUser: (
            state,
            action: PayloadAction<AuthState>
        ) => {
            state.userId = action.payload.userId;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.accessToken =
                action.payload.accessToken;
            state.refreshToken =
                action.payload.refreshToken;
        },

        logout: (state) => {
            state.userId = null;
            state.email = null;
            state.role = null;
            state.accessToken = null;
            state.refreshToken = null;
        },
    },
});

export const { setUser, logout } =
    authSlice.actions;

export default authSlice.reducer;