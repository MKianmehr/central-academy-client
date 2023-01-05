import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useAppDispatch } from '../../../../redux/hooks';
import { setStepOne } from '../../../../redux/slices/createCourseStepSlice';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import QuizIcon from '@mui/icons-material/Quiz';
import Button from '@mui/material/Button';
import StepOneOptionCard from '../../../commons/StepOneOptionCard'
import { StepOneProp } from '../../../../models/Props'
import styles from './styles.module.scss'
import Link from 'next/link';

const StepOne = ({ children }: StepOneProp) => {
    const dispatch = useAppDispatch()
    const { t } = useTranslation("common")
    const options = [
        { name: "course", type: "course-create-step1-option1-type", description: "course-create-step1-option1-description", icon: <OndemandVideoIcon /> },
        { name: "test", type: "course-create-step1-option2-type", description: "course-create-step1-option2-description", icon: <QuizIcon /> }
    ]
    const [active, setActive] = useState(0)

    const onClickOption = (index: number) => {
        setActive(index)
    }
    const onNextButtonClick = () => {
        dispatch(setStepOne(options[active].name))
    }
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
                                    onClick={onClickOption}
                                    index={index}
                                />
                            )
                        })}
                    </div>
                    <div className={styles.buttonBox}>
                        <Link href="/course/create/2"> <Button onClick={onNextButtonClick} variant="outlined">{t("next")}</Button></Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepOne