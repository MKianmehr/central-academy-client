import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface createCourseStepsState {
    steps: string[];
    state: { stepOne: string, stepTwo: string };
}

const initialState: createCourseStepsState = {
    steps: ["step 1", "step 2", "step 3", "step 4"],
    state: { stepOne: "course", stepTwo: "" }
}

export const createCourseStepsSlice = createSlice({
    name: "createStep",
    initialState,
    reducers: {
        setSteps: (state, action: PayloadAction<string[]>) => {
            state.steps = action.payload
        },
        setStepOne: (state, action: PayloadAction<string>) => {
            state.state = { ...state.state, stepOne: action.payload }
        },
        setStepTwo: (state, action: PayloadAction<string>) => {
            state.state = { ...state.state, stepTwo: action.payload }
        },
        setStepThree: state => { },
        setStepFour: state => { },
        resetSteps: state => {
            state = initialState
        }
    }
})

export const {
    setSteps,
    setStepOne,
    setStepTwo,
    setStepThree,
    setStepFour,
    resetSteps,
} = createCourseStepsSlice.actions;

export const selectcreateCourseSteps = (state: RootState) => state.createCourseSteps

export default createCourseStepsSlice.reducer;