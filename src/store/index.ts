import { configureStore } from "@reduxjs/toolkit";
import userReducer, { UserState } from '../component/slices/userDetail';


import authReducer from "./authSlice";
import themeConfigSlice from "./slices/themeConfigSlice";

export interface AppState {
    user: UserState;
    themeConfig: ReturnType<typeof themeConfigSlice>;

}

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        themeConfig: themeConfigSlice,
    },
});

export type RootState = ReturnType<
    typeof store.getState
>;

export type AppDispatch = typeof store.dispatch;