import React, { useCallback, useEffect, useRef, useState, useContext } from 'react'
import { useRouter } from 'next/router'
import useTranslation from "next-translate/useTranslation";
import { StepperChildProp } from '../../../models/Props'

// Components Import
import StepOne from './StepOne'
import StepTwo from './StepTwo'
import StepThree from './StepThree'
import StepFour from './StepFour'
import Stepper from '../../commons/Stepper'

// Context Import
import { GlobalContext } from '../../../contexts';

// redux Imports
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { resetSteps } from '../../../redux/slices/createCourseStepSlice'

// Styles Import
import styles from './styles.module.scss'

const Index = () => {

    const steps = [
        { component: <StepOne />, title: "question step one", isOkay: "" },
        { component: <StepTwo />, title: "question step two", isOkay: "course-create-step2-it's okay" },
        { component: <StepThree />, title: "question step three", isOkay: "course-create-step3-it's okay" },
        { component: <StepFour />, title: "question step four", isOkay: "course-create-step4-it's okay" }
    ]

    const dispatch = useAppDispatch()
    const createCourseSteps = useAppSelector(state => state.createCourseSteps.state)
    const router = useRouter()
    const [currentStep, setCurrentStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const stepperRef = useRef<StepperChildProp>()
    const { t } = useTranslation("common")

    const { createCourse } = useContext(GlobalContext)

    useEffect(() => {
        return () => {
            dispatch(resetSteps())
        }
    }, [])

    const handleLoading = useCallback((loading: boolean) => {
        setLoading(loading)
    }, [])

    const onNextClick = useCallback(async () => {
        const validToGo = stepperRef.current?.onNextClick()
        if (validToGo && currentStep < steps.length) {
            setCurrentStep((prev) => {
                return prev + 1
            })
        }
        if (validToGo && (currentStep == steps.length)) {
            const res = await createCourse(createCourseSteps.stepTwo, createCourseSteps.stepThree.en, handleLoading)
        }
    }, [currentStep, setCurrentStep])

    const onPreviousClick = useCallback(() => {
        setCurrentStep((prev) => {
            return prev - 1
        })
    }, [])

    const onExitClick = useCallback(() => {
        router.push('/instructor/courses')
    }, [])

    return (
        <Stepper
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
            currentIndex={currentStep}
            lastIndex={steps.length}
            onExitClick={onExitClick}
            loading={loading}
        >
            <div className={styles.container}>
                <div>
                    {<h1 className={styles.title}>{t(steps[currentStep - 1].title)}</h1>}
                    {<p className={styles.okay}>{t(steps[currentStep - 1].isOkay)}</p>}
                </div>
                {React.cloneElement(steps[currentStep - 1].component, {
                    ref: stepperRef
                })}
            </div>
        </Stepper>
    )
}

export default Index