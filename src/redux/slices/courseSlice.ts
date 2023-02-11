import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { CourseInterface } from "../../models/Props";

const initialState: CourseInterface[] | [] = []

export const courseSlice = createSlice({
    name: "courses",
    initialState,
    reducers: {
        uploadCourses: (state, action: PayloadAction<CourseInterface[]>) => {
            return action.payload
        }
    }
})

export const {
    uploadCourses,
} = courseSlice.actions;

export const courses = (state: RootState) => state.courses

export default courseSlice.reducer;