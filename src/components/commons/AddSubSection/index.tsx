import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router';

// components imports
import Quiz from './Quiz'
import LCA from './LCA'

// Mui Imports
import AddIcon from '@mui/icons-material/Add';

// Context imports
import { SectionContext } from '../../../contexts';

// Utils Imports
import text from '../../../utils/textEnOrFa';

// Styles Import
import styles from './styles.module.scss'

const AddSubSection = () => {

    const [subSectionOption, setSubSectionOption] = useState<React.ReactElement>(<></>)
    const [enableSubSectionCreation, setShowSubSectionCreation] = useState(false)

    const { subSectionOptions } = useContext(SectionContext)

    const router = useRouter()
    const isEnglish = router.locale === "en"


    const handleCloseSubSectionOption = useCallback(() => {
        setShowSubSectionCreation(false)
    }, [])
    const onClickSubSectionOption = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, buttonName: { fa: string; en: string }) => {
        if (buttonName.en === "Quiz") {
            setSubSectionOption(<Quiz name={text(buttonName, isEnglish)} handleCloseSubSectionOption={handleCloseSubSectionOption} />)
            setShowSubSectionCreation(true)
        } else {
            setSubSectionOption(<LCA name={text(buttonName, isEnglish)} handleCloseSubSectionOption={handleCloseSubSectionOption} />)
            setShowSubSectionCreation(true)
        }
    }, [isEnglish])

    return (
        <div
            className={
                [styles.container, enableSubSectionCreation && styles.enableSubSectionCreation]
                    .join(" ")}
        >
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

export default AddSubSection