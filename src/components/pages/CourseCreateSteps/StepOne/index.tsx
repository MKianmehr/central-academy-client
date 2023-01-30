import React, {
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useState,
    Ref
} from 'react';

import useTranslation from "next-translate/useTranslation";

// Props Import
import { StepperChildProp } from '../../../../models/Props';

// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStepOne } from '../../../../redux/slices/createCourseStepSlice';

// Components Import
import StepOneOptionCard from '../../../commons/StepOneOptionCard'

// Mui Imports
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QuizIcon from '@mui/icons-material/Quiz';

// Styles Import
import styles from './styles.module.scss'



const options = [
    { name: "course", type: "course-create-step1-option1-type", description: "course-create-step1-option1-description", icon: <OndemandVideoIcon /> },
    { name: "test", type: "course-create-step1-option2-type", description: "course-create-step1-option2-description", icon: <QuizIcon /> }
]

const StepOne = forwardRef((_, ref: Ref<StepperChildProp>) => {

    const dispatch = useAppDispatch()
    const [mounted, setMounted] = useState(false)
    const state = useAppSelector((state) => state.createCourseSteps.state.stepOne)
    const { t } = useTranslation("common")

    const activeIndex = useMemo(() => {
        let active = 0
        options.forEach((option, index) => {
            if (option.name === state) {
                active = index
            }
        })
        return active
    }, [state])

    const [active, setActive] = useState(activeIndex)

    useEffect(() => {
        if (mounted) {
            return () => {
                setActive(0)
            }
        } else {
            setMounted(true)
        }
    }, [])


    const onOptionClick = useCallback((index: number) => {
        setActive(index)
    }, [])

    const onNextButtonClick = useCallback(() => {
        dispatch(setStepOne(options[active].name))
        return true
    }, [active])

    useImperativeHandle(ref, () => ({
        onNextButtonClick: () => onNextButtonClick(),
        title: "question step one"
    }))

    return (
        <div className={styles.options}>
            {options.map((option, index) => {
                const isActive = active === index
                return (
                    <StepOneOptionCard
                        key={index}
                        type={t(`${option.type}`)}
                        description={t(`${option.description}`)}
                        icon={option.icon}
                        isActive={isActive}
                        onClick={onOptionClick}
                        index={index}
                    />
                )
            })}
        </div>
    )
})

StepOne.displayName = "StepOne"

export default StepOne