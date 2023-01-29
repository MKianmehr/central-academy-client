import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { UserAndToken } from "../../models/Props";

const initialState: UserAndToken | object = {}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action: PayloadAction<UserAndToken>) => {
            state = action.payload
        },
    }
})

export const {
    login
} = userSlice.actions;

export const user = (state: RootState) => state

export default userSlice.reducer;