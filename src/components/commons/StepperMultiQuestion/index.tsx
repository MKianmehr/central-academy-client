import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';

// ENUM Import
import Locale from '../../../utils/localeEnum';

// MUI Imports
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';

// Styles Import
import styles from './styles.module.scss'


interface QuestionInterface {
    question: {
        title: {
            fa: string;
            en: string;
        };
        options: {
            fa: string;
            en: string;
        }[];
    };
    step: number;
    onSelectOption: (answer: string, step: number) => void;
}

const StepperMultiQuestion: React.FC<QuestionInterface> = ({ question, step, onSelectOption }) => {

    const [selectedOption, setSelectedOption] = useState<string>()
    const router = useRouter()
    const locale = router.locale as Locale

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption((event.target as HTMLInputElement).value);
        onSelectOption((event.target as HTMLInputElement).value, step)
    }, [step])

    return (
        <div>
            <h3 className={styles.title}>{question.title[locale]}</h3>
            <FormControl className={styles.questions}>
                <RadioGroup
                    value={selectedOption}
                    onChange={handleChange}
                >
                    {question.options.map((option, index) => {
                        return <FormControlLabel
                            className={styles.option}
                            key={index}
                            value={option[locale]}
                            control={<Radio />}
                            label={option[locale]}
                        />
                    })}
                </RadioGroup>
            </FormControl>
        </div>
    )
}

export default StepperMultiQuestion