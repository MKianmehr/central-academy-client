import React from 'react'
import MiniDrawer from '../../commons/MiniDrawer'
import { useRouter } from 'next/router'
import StepOne from './StepOne'
import Stepper from '../../commons/Stepper'
import { useAppDispatch } from '../../../redux/hooks'
import { setSteps } from '../../../redux/slices/createCourseStepSlice'

const Index = () => {
    const dispatch = useAppDispatch()
    dispatch(setSteps(["step 1", "step 2", "step 3", "step 4"]))
    const router = useRouter()
    const step = router.query.step

    const WhichStep = () => {
        switch (step) {
            case "1":
                return (
                    <StepOne>
                        <Stepper />
                    </StepOne>
                )
            case "2":
                return (
                    <StepOne>
                        <Stepper />
                    </StepOne>
                )
            case "3":
                return (
                    <StepOne>
                        <Stepper />
                    </StepOne>
                )
            case "4":
                return (
                    <StepOne>
                        <Stepper />
                    </StepOne>
                )
            default:
                return <></>

        }
    }
    return (
        <MiniDrawer>
            {WhichStep()}
        </MiniDrawer>
    )
}

export default Index