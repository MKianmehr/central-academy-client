import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface createCourseStepsState {

}

const initialState: createCourseStepsState = { value: "" }

export const createCourseStepsSlice = createSlice({
    name: "createStep",
    initialState,
    reducers: {
        stepOne: (state, action: PayloadAction<number>) => { },
        stepTwo: state => { },
        stepThree: state => { },
        stepFour: state => { },
        resetSteps: state => { }
    }
})

export const {
    stepOne,
    stepTwo,
    stepThree,
    stepFour,
    resetSteps,
} = createCourseStepsSlice.actions;

export const selectcreateCourseSteps = (state: RootState) => state.createCourseSteps

export default createCourseStepsSlice.reducer;