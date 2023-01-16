import React, { useContext, useState } from 'react'
import { useTranslation } from 'next-i18next';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styles from './styles.module.scss'
import RemainingInput from '../../RemaingInput';
import { CurriculumContext, SectionContext } from '../../../../contexts';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const BeforeSection = () => {
    const [active, setActive] = useState(false)
    const { handleAddSection } = useContext(CurriculumContext)
    const { index } = useContext(SectionContext)
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(false)
    const [goal, setGoal] = useState("")
    const { t } = useTranslation("common")
    const router = useRouter()
    const isRTL = router.locale === "fa"

    const onClick = () => {
        setActive(!active)
    }

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitleError(false)
        setTitle(e.target.value)
    }

    const onGoalTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setGoal(e.target.value)
    }

    const onConfirmButtonClick = () => {
        if (!title) {
            setTitleError(true)
            return
        }
        handleAddSection({ title, goal, sectionIndex: index })
    }

    return (
        <div className={[styles.before, active && styles.before__active].join(" ")}>
            <button onClick={onClick} className={[styles.before__button, isRTL && styles.square_rtl].join(" ")}>
                <AddOutlinedIcon className={[styles.multi].join(" ")} />
            </button>
            {active && (
                <div className={styles.beforeContainer}>
                    <h5 className={styles.before__title}>{t("New Section")}:</h5>
                    <RemainingInput
                        value={title}
                        onChange={onTitleChange}
                        maxLength={80}
                        placeHolder={`${t('Enter a title')}`}
                        errorValue={titleError ? `${t("This field may not be blank.")}` : ""}
                    />
                    <p className={styles.before__description}>
                        {t("sectionIncome")}
                    </p>
                    <RemainingInput
                        value={goal}
                        onChange={onGoalTextChange}
                        maxLength={200}
                        placeHolder={`${t("learning objective")}`}
                    />
                    <div className={styles.before__buttonContainer}>
                        <Button onClick={onClick} className={styles.cancel}>{t("Cancel")}</Button>
                        <Button onClick={onConfirmButtonClick} className={styles.confirm}>{t("Add Section")}</Button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default BeforeSection