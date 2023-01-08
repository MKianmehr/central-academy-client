import React, { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStepOne } from '../../../../redux/slices/createCourseStepSlice';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QuizIcon from '@mui/icons-material/Quiz';
import Button from '@mui/material/Button';
import StepOneOptionCard from '../../../commons/StepOneOptionCard'
import { StepOneProp } from '../../../../models/Props'
import Link from 'next/link';
import styles from './styles.module.scss'


const options = [
    { name: "course", type: "course-create-step1-option1-type", description: "course-create-step1-option1-description", icon: <OndemandVideoIcon /> },
    { name: "test", type: "course-create-step1-option2-type", description: "course-create-step1-option2-description", icon: <QuizIcon /> }
]

const StepOne = ({ children }: StepOneProp) => {
    const dispatch = useAppDispatch()
    const [mounted, setMounted] = useState(false)
    const state = useAppSelector((state) => state.createCourseSteps.state.stepOne)
    const { t } = useTranslation("common")
    const [active, setActive] = useState(() => {
        let activeIndex = 0
        options.forEach((option, index) => {
            if (option.name === state) {
                activeIndex = index
            }
        })
        return activeIndex
    })

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
    }, [active])

    return (
        <div className={styles.container}>
            <div className={styles.createBox}>
                {children}
                <div className={styles.questionsBox}>
                    <h3 className={styles.title}>{t("question step one")}</h3>
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
                    <div className={styles.buttonBox}>
                        <Link href="/instructor/courses"> <Button variant="outlined">{t("exit")}</Button></Link>
                        <Link href="/course/create/2"> <Button onClick={onNextButtonClick} variant="outlined">{t("next")}</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepOne