import React, { useState, useRef } from 'react'
import { useTranslation } from 'next-i18next';
import Button from '@mui/material/Button';
import Link from 'next/link';
import usePreventBreakLine from '../../../../hooks/usePreventBreakLine';
import { StepTwoProp } from '../../../../models/Props'
import styles from './styles.module.scss'
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStepTwo } from '../../../../redux/slices/createCourseStepSlice';
import { useRouter } from 'next/router';

const StepTwo = ({ children }: StepTwoProp) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const router = useRouter()
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => {
        return state.createCourseSteps.state.stepTwo
    })
    const { t } = useTranslation("common")
    const [text, setText] = useState(state ? state : "")
    const [initialValue, setInitialValue] = useState(60)
    const [remaining, setRemaining] = useState(initialValue)
    usePreventBreakLine(textareaRef)

    const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
        setRemaining(initialValue - e.target.value.length)
    }

    const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (text) {
            dispatch(setStepTwo(text))
            router.push('/course/create/3')
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.createBox}>
                {children}
                <div className={styles.questionsBox}>
                    <div>
                        <h3 className={styles.title}>{t("question step two")}</h3>
                        <p className={styles.okay}>{t("course-create-step2-it's okay")}</p>
                    </div>
                    <div className={styles.inputContainer}>
                        <textarea
                            ref={textareaRef}
                            maxLength={60}
                            rows={1}
                            value={text}
                            onChange={onChangeText}
                            placeholder={`${t("course-create-step2-placeholder")}`}
                        />
                        <span className={styles.remaining}>{remaining}</span>
                    </div>
                    <div className={styles.buttons}>
                        <div>
                            <Link href="/course/create/1"> <Button variant="outlined">{t("previous")}</Button></Link>
                            <Link href="/instructor/courses"> <Button variant="outlined">{t("exit")}</Button></Link>
                        </div>
                        <Button onClick={onNextClick} variant="outlined">{t("next")}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepTwo