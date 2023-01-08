import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface createCourseStepsState {
    steps: string[];
    state: {
        stepOne: string,
        stepTwo: string,
        stepThree: { fa: string; en: string; },
        stepFour: { fa: string; en: string }
    };
}
interface stepThreePayload {
    fa: string;
    en: string;
}
interface stepFourPayload extends stepThreePayload { }

const initialState: createCourseStepsState = {
    steps: ["step 1", "step 2", "step 3", "step 4"],
    state: {
        stepOne: "course",
        stepTwo: "",
        stepThree: { fa: "", en: "" },
        stepFour: { fa: "", en: "" }
    }
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
        setStepThree: (state, action: PayloadAction<stepThreePayload>) => {
            state.state = { ...state.state, stepThree: action.payload }
        },
        setStepFour: (state, action: PayloadAction<stepFourPayload>) => {
            state.state = { ...state.state, stepFour: action.payload }
        },
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