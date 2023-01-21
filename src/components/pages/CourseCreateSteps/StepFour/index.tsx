import React, {
    Ref,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from 'react'
import { useRouter } from 'next/router';

// Props Import
import { StepperChildProp } from '../../../../models/Props'

// Mui Imports
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

// Redux Import
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStepFour } from '../../../../redux/slices/createCourseStepSlice';

// Styles Import
import styles from './styles.module.scss'

const values = [
    { fa: "من الان خیلی سرم شلوغه (0-2 ساعت)", en: "I’m very busy right now (0-2 hours)" },
    { fa: "من در کنار این کار خواهم کرد (2-4 ساعت)", en: "I’ll work on this on the side (2-4 hours)" },
    { fa: "من انعطاف پذیری زیادی دارم (5+ ساعت)", en: "I have lots of flexibility (5+ hours)" },
    { fa: "هنوز تصمیم نگرفته ام که وقت دارم یا نه", en: "I haven’t yet decided if I have time" }
]

type valueType = { fa: string; en: string }

const StepFour = forwardRef((_, ref: Ref<StepperChildProp>) => {

    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.createCourseSteps.state.stepFour)
    const [mounted, setMounted] = useState(false)

    const router = useRouter()
    const isEng = router.locale === "en"

    const [value, setValue] = useState<valueType>(state);


    useEffect(() => {
        if (mounted) {
            return () => {
                setValue({ fa: "", en: "" })
            }
        } else {
            setMounted(true)
        }
    }, [])

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(JSON.parse(event.target.value));
    }, [])

    const onNextButtonClick = useCallback(() => {
        if (value?.en) {
            dispatch(setStepFour(value))
            return true
        } else {
            return false
        }
    }, [value])

    useImperativeHandle(ref, () => ({
        onNextButtonClick: () => onNextButtonClick(),
        title: "question step four",
        isOkay: "course-create-step4-it's okay"
    }))


    return (
        <div className={styles.container}>
            <FormControl className={styles.formcontrol}>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={JSON.stringify(value)}
                    onChange={handleChange}
                >
                    {values.map((value) => {
                        return (
                            <FormControlLabel key={JSON.stringify(value)} className={styles.each} value={JSON.stringify(value)} control={<Radio className={styles.radio} />} label={isEng ? value.en : value.fa} />
                        )
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    )
})

StepFour.displayName = "StepFour"

export default StepFour