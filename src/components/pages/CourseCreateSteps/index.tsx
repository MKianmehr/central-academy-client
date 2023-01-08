import React, { useEffect } from 'react'
import MiniDrawer from '../../commons/MiniDrawer'
import { useRouter } from 'next/router'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import Stepper from '../../commons/Stepper'
import { useAppDispatch } from '../../../redux/hooks'
import { resetSteps } from '../../../redux/slices/createCourseStepSlice'


const Index = () => {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const step = router.query.step
    useEffect(() => {
        return () => {
            dispatch(resetSteps())
        }
    }, [])

    const WhichStep = () => {
        switch (step) {
            case "1":
                return (
                    <Stepper>
                        <StepOne />
                    </Stepper>
                )
            case "2":
                return (
                    <Stepper>
                        <StepTwo />
                    </Stepper>
                )
            case "3":
                return (
                    <Stepper>
                        <StepThree />
                    </Stepper>
                )
            case "4":
                return (
                    <Stepper>
                        <StepFour />
                    </Stepper>
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