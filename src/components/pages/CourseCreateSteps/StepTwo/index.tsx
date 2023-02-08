import React, {
    useState,
    useRef,
    useEffect,
    forwardRef,
    useCallback,
    useImperativeHandle,
    Ref
} from 'react'
import useTranslation from "next-translate/useTranslation";

// Props Import
import { StepperChildProp } from '../../../../models/Props';

// Hook Import
import usePreventBreakLine from '../../../../hooks/usePreventBreakLine';

// Redux Imports
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStepTwo } from '../../../../redux/slices/createCourseStepSlice';

//Styles Import
import styles from './styles.module.scss'


const StepTwo = forwardRef((_, ref: Ref<StepperChildProp>) => {

    const initialValue = 60
    const [remaining, setRemaining] = useState(initialValue)
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [mounted, setMounted] = useState(false)
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.createCourseSteps.state.stepTwo)
    const [text, setText] = useState(state ? state : "")

    const { t } = useTranslation("common")

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

    const onNextClick = useCallback(() => {
        if (text) {
            dispatch(setStepTwo(text))
            return true
        } else {
            return false
        }
    }, [text])

    useImperativeHandle(ref, () => ({
        onNextClick: () => onNextClick(),
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

StepTwo.displayName = "StepTwo"

export default StepTwo