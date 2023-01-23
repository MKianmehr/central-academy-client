import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

// components imports
import Quiz from './Quiz'
import LCA from './LCA'

// Mui Imports
import AddIcon from '@mui/icons-material/Add';

// Context imports
import { SectionContext } from '../../../contexts';

// Utils Imports
import text from '../../../utils/textEnOrFa';
import ClassOptions from '../../../utils/curriculumClasses';

// Styles Import
import styles from './styles.module.scss'

const AddSubSection = ({ index }: { index: number }) => {

    const [subSectionOption, setSubSectionOption] = useState<React.ReactElement>(<></>)
    const [enableSubSectionCreation, setShowSubSectionCreation] = useState(false)

    const { subSectionOptions } = useContext(SectionContext)

    const { t } = useTranslation("common")

    const router = useRouter()
    const isEnglish = router.locale === "en"


    const handleCloseSubSectionOption = useCallback(() => {
        setShowSubSectionCreation(false)
    }, [])
    const onClickSubSectionOption = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>, buttonName: string) => {
        if (buttonName === "quiz") {
            setSubSectionOption(<Quiz index={index} type={ClassOptions.Quiz} handleCloseSubSectionOption={handleCloseSubSectionOption} />)
            setShowSubSectionCreation(true)
        } else {
            setSubSectionOption(<LCA index={index} type={buttonName} handleCloseSubSectionOption={handleCloseSubSectionOption} />)
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
                        key={option}
                        className={styles.addButton}
                    >
                        <AddIcon />
                        {t(option)}
                    </button>
                )
            })}
        </div>
    )
}

export default AddSubSection