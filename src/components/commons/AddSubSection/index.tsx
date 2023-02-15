import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";

// components imports
import Quiz from './Quiz'
import LCA from './LCA'

// Mui Imports
import AddIcon from '@mui/icons-material/Add';

// Context imports
import { SectionContext } from '../../../contexts';

// Utils Imports
import ClassOptions, { QuizOptions } from '../../../utils/curriculumClasses';

// Styles Import
import styles from './styles.module.scss'
import { _Class, _type } from '../../../models/Props';

const AddSubSection = ({ index, closeBeforeSubSection }: { index: number; closeBeforeSubSection: () => void }) => {

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
        if (buttonName === ClassOptions.Quiz) {
            setSubSectionOption(<Quiz
                index={index}
                _class={_Class.Quiz}
                type={_type.Quiz}
                handleCloseSubSectionOption={handleCloseSubSectionOption}
                closeBeforeSubSection={closeBeforeSubSection}
            />)
            setShowSubSectionCreation(true)
        } else {
            setSubSectionOption(<LCA
                closeBeforeSubSection={closeBeforeSubSection}
                index={index}
                _class={((buttonName === QuizOptions.CodingExercise) ? ClassOptions.Quiz : buttonName) as _Class}
                type={((buttonName === QuizOptions.CodingExercise) ? buttonName : undefined) as _type}
                handleCloseSubSectionOption={handleCloseSubSectionOption}
            />)
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