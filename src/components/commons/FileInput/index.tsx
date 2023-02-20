import React from 'react'
import useTranslation from "next-translate/useTranslation";

// Props Import 
import { FileInputProp } from '../../../models/Props';

// Styles Import
import styles from './styles.module.scss'

const FileInput = (
    { type, description, onChange, fileName, accept }:
        FileInputProp
) => {

    const { t } = useTranslation("common")

    return (
        <>
            <div className={styles.inputContainer}>
                <input className={styles.input} type="file" id='video' onChange={onChange} accept={accept && accept} />
                <label className={styles.inputLabel} htmlFor='video'>
                    <span className={styles.inputLabel__left}>{fileName ? fileName : t("No file selected")}</span>
                    <span className={styles.horizontalLine}></span>
                    <span className={styles.inputLabel__right}>{type}</span>
                </label>
            </div>
            {description && <div className={styles.description}>
                <span className={styles.note}>{t("Note")}:</span>
                <span className={styles.noteContent}>
                    {description}
                </span>
            </div>}
        </>
    )
}

export default FileInput