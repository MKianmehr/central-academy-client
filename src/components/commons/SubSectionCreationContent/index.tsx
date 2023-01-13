import React, { useState } from 'react'
import Quiz from './Quiz'
import LCA from './LCA'
import { SubSectionOptionsProp } from '../../../models/Props';
import AddIcon from '@mui/icons-material/Add';
import text from '../../../utils/textEnOrFa';
import styles from './styles.module.scss'
import { useRouter } from 'next/router';

const SubSectionCreationContent = ({ subSectionOptions }: SubSectionOptionsProp) => {
    const [subSectionOption, setSubSectionOption] = useState<React.ReactElement>(<></>)
    const [enableSubSectionCreation, setShowSubSectionCreation] = useState(false)
    const router = useRouter()

    const isEnglish = router.locale === "en"


    const handleCloseSubSectionOption = () => {
        setShowSubSectionCreation(false)
    }

    const onClickSubSectionOption = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, buttonName: { fa: string; en: string }) => {
        if (buttonName.en === "Quiz") {
            setSubSectionOption(<Quiz name={text(buttonName, isEnglish)} handleCloseSubSectionOption={handleCloseSubSectionOption} />)
            setShowSubSectionCreation(true)
        } else {
            setSubSectionOption(<LCA name={text(buttonName, isEnglish)} handleCloseSubSectionOption={handleCloseSubSectionOption} />)
            setShowSubSectionCreation(true)
        }
    }

    return (
        <div className={[styles.beforeContent, enableSubSectionCreation && styles.enableSubSectionCreation].join(" ")}>
            {enableSubSectionCreation && subSectionOption}
            {!enableSubSectionCreation && subSectionOptions.map((option) => {
                return (
                    <button
                        onClick={(e) => onClickSubSectionOption(e, option)}
                        key={option.en}
                        className={styles.addButton}
                    >
                        <AddIcon />
                        {text(option, isEnglish)}
                    </button>
                )
            })}
        </div>
    )
}

export default SubSectionCreationContent