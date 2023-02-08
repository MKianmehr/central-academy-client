import React, {
    Ref,
    forwardRef,
    useCallback,
    useEffect,
    useImperativeHandle,
    useState
} from 'react'
import { useRouter } from 'next/router';

// Redux Imports

import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { setStepThree } from '../../../../redux/slices/createCourseStepSlice';

// Props Import
import { StepperChildProp } from '../../../../models/Props';

// Components Imports
import SelectLabels from '../../../commons/Select';

// Mui Imports
import { SelectChangeEvent } from '@mui/material/Select';

// Styles Import
import styles from './styles.module.scss'

const labels = [{ fa: "یک دسته بندی را انتخاب کنید", en: "Choose a category" }, { fa: "آی تی و نرم افزار", en: "It & software" }]


const StepThree = forwardRef((_, ref: Ref<StepperChildProp>) => {

    const [mounted, setMounted] = useState(false)
    const dispatch = useAppDispatch()
    const state = useAppSelector(state => state.createCourseSteps.state.stepThree)
    const [value, setValue] = useState(state.en ? state : labels[0]);

    const router = useRouter()
    const isEng = router.locale === "en"

    useEffect(() => {
        if (mounted) {
            return () => {
                setValue(labels[0])
            }
        } else {
            setMounted(true)
        }
    }, [])

    const onNextClick = useCallback(() => {
        if (labels[0].en !== value.en) {
            dispatch(setStepThree(value))
            return true
        } else {
            return false
        }
    }, [value, labels])

    useImperativeHandle(ref, () => ({
        onNextClick: () => onNextClick(),
    }))

    const handleChange = useCallback((event: SelectChangeEvent) => {
        labels.forEach((label, index) => {
            if (event.target.value === (isEng ? label.en : label.fa)) {
                setValue(labels[index]);
            }
        });
    }, [isEng, labels])

    return (
        <div className={styles.select}>
            <SelectLabels
                height="50px"
                value={value}
                labels={labels}
                minWidth={200}
                maxWidth={900}
                onChange={handleChange}
            />
        </div>
    )
})

StepThree.displayName = "StepThree"

export default StepThree