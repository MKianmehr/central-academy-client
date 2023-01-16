import React, { useContext, useEffect, useState } from 'react'
import { CurriculumContext, SectionContext } from '../../../../contexts'
import { useTranslation } from 'next-i18next';
import RemainingInput from '../../RemaingInput'
import { Button } from '@mui/material'
import styles from './styles.module.scss'

const InputsForAddSection = ({ onClick, title, goal }: { onClick: () => void; title?: string; goal?: string }) => {
    const { handleAddSection, handleEditSection } = useContext(CurriculumContext)
    const { t } = useTranslation("common")
    const { index } = useContext(SectionContext)
    const [localTitle, setLocalTitle] = useState(title ? title : "")
    const [titleError, setTitleError] = useState(false)
    const [localGoal, setLocalGoal] = useState(goal ? goal : "")
    const [mounted, setMounted] = useState(false)

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

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleError(false)
        setLocalTitle(e.target.value)
    }

    const onGoalTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocalGoal(e.target.value)
    }

    const onConfirmButtonClick = () => {
        if (!localTitle) {
            setTitleError(true)
            return
        }
        const res = handleAddSection({ title: localTitle, goal: localGoal, sectionIndex: index })
        if (res) {
            onClick()
        } else {
            // say somthing went wrong
        }
    }

    const onEditSectionButtonClick = () => {
        if (!localTitle) {
            setTitleError(true)
            return
        }
        const res = handleEditSection({ title: localTitle, goal: localGoal, sectionIndex: index })
        if (res) {
            onClick()
        } else {
            // say somthing went wrong
        }
    }
    return (
        <div className={styles.beforeContainer}>
            <h5 className={styles.before__title}>{title ? t("Edit Section") : t("New Section")}:</h5>
            <RemainingInput
                value={localTitle}
                onChange={onTitleChange}
                maxLength={80}
                placeHolder={`${t('Enter a title')}`}
                errorValue={titleError ? `${t("This field may not be blank.")}` : ""}
            />
            <p className={styles.before__description}>
                {t("sectionIncome")}
            </p>
            <RemainingInput
                value={localGoal}
                onChange={onGoalTextChange}
                maxLength={200}
                placeHolder={`${t("learning objective")}`}
            />
            <div className={styles.before__buttonContainer}>
                <Button onClick={onClick} className={styles.cancel}>{t("Cancel")}</Button>
                <Button onClick={title ? onEditSectionButtonClick : onConfirmButtonClick} className={styles.confirm}>{title ? t("Edit Section") : t("Add Section")}</Button>
            </div>
        </div>
    )
}


export default InputsForAddSection