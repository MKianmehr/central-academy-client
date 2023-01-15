import React, { useState } from 'react'
import styles from './styles.module.scss';
import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';
import RemainingInput from '../../RemaingInput';

// Lecture Coding Exercise and assignment are the same (LCA)

const LCA = ({ name, handleCloseSubSectionOption }: { name: string; handleCloseSubSectionOption: () => void }) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isEnglish = router.locale === "en"
    const [text, setText] = useState<string>("")
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleCloseSubSectionOption()
    }
    return (
        <div className={styles.container}>
            <h6>{isEnglish ? `${t("new")} ${name}` : `${name} ${t("new")}`}</h6>
            <RemainingInput
                value={text}
                onChange={onChangeText}
                placeHolder={`${t('Enter a title')}`}
                maxLength={60}
            />
            <div className={styles.buttons}>
                <Button onClick={onCancelClick} className={styles.cancel}>{t("Cancel")}</Button>
                <Button className={styles.confirm}>{t("add")} {name}</Button>
            </div>
        </div>
    )
}

export default LCA