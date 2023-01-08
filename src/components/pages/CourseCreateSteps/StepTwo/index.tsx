import React, { useState, useRef, useEffect, forwardRef, useCallback, useImperativeHandle, Ref } from 'react'
import { useTranslation } from 'next-i18next';
import usePreventBreakLine from '../../../../hooks/usePreventBreakLine';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStepTwo } from '../../../../redux/slices/createCourseStepSlice';
import { StepperChildProp } from '../../../../models/Props';
import styles from './styles.module.scss'


const StepTwo = forwardRef((_, ref: Ref<StepperChildProp>) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [mounted, setMounted] = useState(false)
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.createCourseSteps.state.stepTwo)
    const { t } = useTranslation("common")
    const [text, setText] = useState(state ? state : "")
    const initialValue = 60
    const [remaining, setRemaining] = useState(initialValue)
    usePreventBreakLine(textareaRef)

    useEffect(() => {
        if (mounted) {
            return () => setText("")
        } else {
            setMounted(true)
        }
    }, [])

    const onChangeText = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setText(e.target.value)
        setRemaining(initialValue - e.target.value.length)
    }, [])

    const onNextButtonClick = useCallback(() => {
        if (text) {
            dispatch(setStepTwo(text))
            return true
        } else {
            return false
        }
    }, [text])

    useImperativeHandle(ref, () => ({
        onNextButtonClick: () => onNextButtonClick(),
        title: "question step two",
        isOkay: "course-create-step2-it's okay"
    }))

    return (
        <div className={styles.container}>
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
        </div>
    )
})

export default StepTwo