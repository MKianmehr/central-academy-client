import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { AddSectionProp } from '../../../models/Props';

// component imports
import RemainingInput from '../RemaingInput'

// Mui imports
import { Button } from '@mui/material'

// context imports
import { CurriculumContext } from '../../../contexts'

// Utils Import
import ClassOptions from '../../../utils/curriculumClasses';

// styles import
import styles from './styles.module.scss'

const AddSection = ({ onClick, title, goal, index }: AddSectionProp) => {

    const [localTitle, setLocalTitle] = useState(title ? title : "")
    const [titleError, setTitleError] = useState(false)
    const [localGoal, setLocalGoal] = useState(goal ? goal : "")
    const [mounted, setMounted] = useState(false)

    const { t } = useTranslation("common")

    const { handleAddCurriculumItem, handleEditCurriculumItem } = useContext(CurriculumContext)

    useEffect(() => {
        if (mounted) {
            return () => {
                setLocalTitle("")
                setLocalGoal("")
                setTitleError(false)
            }
        } else if (!mounted) {
            setMounted(true)
        }
    }, [])

    const onTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleError(false)
        setLocalTitle(e.target.value)
    }, [])


    const onGoalTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalGoal(e.target.value)
    }, [])


    const onConfirmButtonClick = useCallback(() => {
        if (!localTitle) {
            setTitleError(true)
            return
        }
        const res = handleAddCurriculumItem({
            index, data: {
                title: localTitle,
                description: localGoal,
                _class: ClassOptions.Chapter
            }
        })
        if (res) {
            onClick()
        } else {
            // say somthing went wrong
        }
    }, [localTitle, localGoal, index, onClick, handleAddCurriculumItem])


    const onEditSectionButtonClick = useCallback(() => {
        if (!localTitle) {
            setTitleError(true)
            return
        }
        const res = handleEditCurriculumItem({
            data: { title: localTitle, description: localGoal }
            , index
        })
        if (res) {
            onClick()
        } else {
            // say somthing went wrong
        }
    }, [localTitle, localGoal, index, onClick, handleEditCurriculumItem])


    return (
        <div className={styles.container}>
            <h5 className={styles.title}>{title ? t("Edit Section") : t("New Section")}:</h5>
            <RemainingInput
                value={localTitle}
                onChange={onTitleChange}
                maxLength={80}
                placeHolder={`${t('Enter a title')}`}
                errorValue={titleError ? `${t("This field may not be blank.")}` : ""}
            />
            <p className={styles.description}>
                {t("sectionIncome")}
            </p>
            <RemainingInput
                value={localGoal}
                onChange={onGoalTextChange}
                maxLength={200}
                placeHolder={`${t("learning objective")}`}
            />
            <div className={styles.buttonContainer}>
                <Button onClick={onClick} className={styles.cancel}>{t("Cancel")}</Button>
                <Button onClick={title ? onEditSectionButtonClick : onConfirmButtonClick} className={styles.confirm}>{title ? t("Edit Section") : t("Add Section")}</Button>
            </div>
        </div>
    )
}


export default AddSection