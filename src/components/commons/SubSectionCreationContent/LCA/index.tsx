import React, { useState } from 'react'
import styles from './styles.module.scss';
import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

// Lecture Coding Exercise and assignment are the same (LCA)

const LCA = ({ name, handleCloseSubSectionOption }: { name: string; handleCloseSubSectionOption: () => void }) => {
    const { t } = useTranslation("common")
    const initialValue = 60
    const router = useRouter()
    const isEnglish = router.locale === "en"
    const [remaing, setRemaing] = useState(initialValue)
    const [text, setText] = useState<string>("")
    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
        setRemaing(initialValue - e.target.value.length)
    }

    const onCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleCloseSubSectionOption()
    }
    return (
        <div className={styles.container}>
            <h6>{isEnglish ? `${t("new")} ${name}` : `${name} ${t("new")}`}</h6>
            <div className={styles.input}>
                <input
                    value={text}
                    onChange={onChangeText}
                    placeholder={`${t('Enter a title')}`}
                    maxLength={60}
                />
                {remaing}
            </div>
            <div className={styles.buttons}>
                <Button onClick={onCancelClick} className={styles.cancel}>{t("Cancel")}</Button>
                <Button className={styles.confirm}>{t("add")} {name}</Button>
            </div>
        </div>
    )
}

export default LCA