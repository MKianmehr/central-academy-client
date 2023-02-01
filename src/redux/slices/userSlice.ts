import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { User } from "../../models/Props";

const initialState: User | object = {}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            return { ...action.payload }
        },
        logOut: (state) => {
            return {}
        },
    }
})

export const {
    login,
    logOut,
} = userSlice.actions;

export const user = (state: RootState) => state.user

export default userSlice.reducer;