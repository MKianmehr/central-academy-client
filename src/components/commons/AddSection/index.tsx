import React, { useCallback, useContext, useEffect, useState } from 'react'
import useTranslation from "next-translate/useTranslation";
import { AddSectionProp, _Class } from '../../../models/Props';

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

const AddSection = ({ onClick, section, index }: AddSectionProp) => {

    const [localTitle, setLocalTitle] = useState(section?.title ? section.title : "")
    const [titleError, setTitleError] = useState(false)
    const [localGoal, setLocalGoal] = useState(section?.description ? section.description : "")
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


    const onConfirmButtonClick = useCallback(async () => {
        if (!localTitle || localTitle.length < 3) {
            setTitleError(true)
            return
        }
        const res = await handleAddCurriculumItem({
            index, data: {
                _class: ClassOptions.Chapter as _Class,
                title: localTitle,
                description: localGoal,
            }
        })
        if (res) {
            onClick()
        }
    }, [localTitle, localGoal, index, onClick, handleAddCurriculumItem])


    const onEditSectionButtonClick = useCallback(async () => {
        if (!localTitle || localTitle.length < 3) {
            setTitleError(true)
            return
        }
        if (section) {
            const res = await handleEditCurriculumItem({
                data: { title: localTitle, description: localGoal, lessonId: section._id }, index
            })
            if (res) {
                onClick()
            }
        }
    }, [localTitle, localGoal, index, onClick, handleEditCurriculumItem])


    return (
        <div className={styles.container}>
            <h5 className={styles.title}>{section ? t("Edit Section") : t("New Section")}:</h5>
            <RemainingInput
                value={localTitle}
                onChange={onTitleChange}
                maxLength={80}
                placeHolder={`${t('Enter a title')}`}
                errorValue={titleError ? `${t("Please enter a value that is at least 3 characters long in this field")}` : ""}
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
                <Button onClick={section ? onEditSectionButtonClick : onConfirmButtonClick} className={styles.confirm}>{section ? t("Edit Section") : t("Add Section")}</Button>
            </div>
        </div>
    )
}


export default AddSection