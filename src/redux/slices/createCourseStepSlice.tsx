import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface createCourseStepsState {
    steps: string[];
    state: {};
}

const initialState: createCourseStepsState = {
    steps: [],
    state: { stepOneState: "course" }
}

export const createCourseStepsSlice = createSlice({
    name: "createStep",
    initialState,
    reducers: {
        setSteps: (state, action: PayloadAction<string[]>) => {
            state.steps = action.payload
        },
        setStepOne: (state, action: PayloadAction<string>) => {
            state.state = { ...state, stepOneState: action.payload }
        },
        stepTwo: state => { },
        stepThree: state => { },
        stepFour: state => { },
        resetSteps: state => { }
    }
})

export const {
    setSteps,
    setStepOne,
    stepTwo,
    stepThree,
    stepFour,
    resetSteps,
} = createCourseStepsSlice.actions;

export const selectcreateCourseSteps = (state: RootState) => state.createCourseSteps

export default createCourseStepsSlice.reducer;