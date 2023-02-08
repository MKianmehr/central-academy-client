import React, { useCallback, useState, useContext } from 'react'
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router'

// Context Imports
import { GlobalContext } from '../../../contexts';

// Components Imports
import StepperMultiQuestion from '../../commons/StepperMultiQuestion'
import Stepper from '../../commons/Stepper'

// Enum Import
import Locale from '../../../utils/localeEnum'

// Styles Import 
import styles from './styles.module.scss'

const steps = [
    {
        title: {
            fa: "دانش خود را به اشتراک بگذارید",
            en: "Share your knowledge"
        },
        paragraph: {
            fa: "دوره های آکادمی مرکزی تجربیاتی مبتنی بر ویدئو هستند که به دانش آموزان فرصت یادگیری مهارت های عملی را می دهند. چه تجربه تدریس داشته باشید، چه برای اولین بار است، ما به شما کمک می کنیم دانش خود را در یک دوره آنلاین که زندگی دانشجویی را بهبود می بخشد، بسته بندی کنید.",
            en: "CAcademy courses are video-based experiences that give students the chance to learn actionable skills. Whether you have experience teaching, or it’s your first time, we’ll help you package your knowledge into an online course that improves student lives."
        },
        question: {
            title: {
                fa: "قبلاً چه نوع تدریسی انجام داده اید؟",
                en: "What kind of teaching have you done before?"
            },
            options: [
                { fa: "حضوری، غیر رسمی", en: "In person, informally" },
                { fa: "حضوری، حرفه ای", en: "In person, professionally" },
                { fa: "آنلاین", en: "Online" },
                { fa: "غیره", en: "Others" },
            ]
        }
    },
    {
        title: {
            fa: "یک دوره ایجاد کنید",
            en: "Create a course"
        },
        paragraph: {
            fa: "در طول سال‌ها به هزاران مربی کمک کرده‌ایم یاد بگیرند که چگونه در خانه ضبط کنند. صرف نظر از سطح تجربه شما، می توانید یک حرفه ای ویدیو نیز شوید. ما شما را با جدیدترین منابع، نکات و پشتیبانی برای کمک به موفقیت شما مجهز خواهیم کرد.",
            en: "Over the years we’ve helped thousands of instructors learn how to record at home. No matter your experience level, you can become a video pro too. We’ll equip you with the latest resources, tips, and support to help you succeed."
        },
        question: {
            title: {
                fa: "قبلاً چه نوع تدریسی انجام داده اید؟",
                en: "What kind of teaching have you done before?"
            },
            options: [
                { fa: "حضوری، غیر رسمی", en: "In person, informally" },
                { fa: "حضوری، حرفه ای", en: "In person, professionally" },
                { fa: "آنلاین", en: "Online" },
                { fa: "غیره", en: "Others" },
            ]
        }
    }
]


const TeachingOnBoarding = () => {
    const [currentStep, setCurrentStep] = useState(1)
    const [answers, setAnswers] = useState<{ [key: string]: string }>({})
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const locate = router.locale as Locale

    const { becomeInstructor } = useContext(GlobalContext)

    const { t } = useTranslation("common")

    const onFinishClick = useCallback((loading: boolean) => {
        setLoading(loading)
    }, [])

    const onNextClick = useCallback(async () => {
        if (steps.length > currentStep && answers[currentStep]) {
            setCurrentStep((prev) => {
                return prev + 1
            })
        } else if (steps.length > currentStep && !answers[currentStep]) {
            setError(t("choose-one-become-instructor"))
        } else {
            await becomeInstructor(onFinishClick)
        }
    }, [currentStep, answers])
    const onPreviousClick = useCallback(() => {
        if (currentStep > 1) {
            setCurrentStep((prev) => {
                return prev - 1
            })
        }
    }, [currentStep])


    const onExitClick = useCallback(() => {
        router.push('/')
    }, [])

    const onSelectOption = useCallback((answer: string, step: number) => {
        setError("")
        setAnswers((prev) => {
            prev[`${step}`] = answer
            return { ...prev }
        })
    }, [answers])

    return (
        <Stepper
            onNextClick={onNextClick}
            onPreviousClick={onPreviousClick}
            onExitClick={onExitClick}
            currentIndex={currentStep}
            lastIndex={steps.length}
            loading={loading}
        >
            <div className={styles.container}>
                <h2>{steps[currentStep - 1].title[locate] ? steps[currentStep - 1].title[locate] : steps[currentStep - 1].title["en"]}</h2>
                <p>{steps[currentStep - 1].paragraph[locate] ? steps[currentStep - 1].paragraph[locate] : steps[currentStep - 1].paragraph["en"]}</p>
                <StepperMultiQuestion onSelectOption={onSelectOption} question={steps[currentStep - 1].question} step={currentStep} />
                {error && <span className={styles.error}>{error}</span>}
            </div>
        </Stepper>
    )
}

export default TeachingOnBoarding