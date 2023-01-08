import React, { useEffect } from 'react'
import MiniDrawer from '../../commons/MiniDrawer'
import { useRouter } from 'next/router'
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import Stepper from '../../commons/Stepper'
import { useAppDispatch } from '../../../redux/hooks'
import { resetSteps } from '../../../redux/slices/createCourseStepSlice'
import StepThree from './StepThree'

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
                    <StepOne>
                        <Stepper />
                    </StepOne>
                )
            case "2":
                return (
                    <StepTwo>
                        <Stepper />
                    </StepTwo>
                )
            case "3":
                return (
                    <StepThree>
                        <Stepper />
                    </StepThree>
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