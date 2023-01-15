import React from 'react'
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss'
import text from '../../../utils/textEnOrFa';
import { useRouter } from 'next/router';

const FileInput = ({ type, description }: { type: { fa: string; en: string; }; description: string }) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isEng = router.locale === "en"
    return (
        <>
            <div className={styles.inputContainer}>
                <input className={styles.input} type="file" id='video' />
                <label className={styles.inputLabel} htmlFor='video'>
                    <span className={styles.inputLabel__left}>{t("No file selected")}</span>
                    <span className={styles.horizontalLine}></span>
                    <span className={styles.inputLabel__right}>{t("Select")} {text(type, isEng)}</span>
                </label>
            </div>
            <div className={styles.description}>
                <span className={styles.note}>{t("Note")}:</span>
                <span className={styles.noteContent}>
                    {description}
                </span>
            </div>
        </>
    )
}

export default FileInput