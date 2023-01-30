import React from 'react'
import useTranslation from "next-translate/useTranslation";

// Components Import
import FileInput from '../FileInput'

// Styles Import
import styles from './styles.module.scss'

const VideoInput = () => {

    const { t } = useTranslation("common")

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={[styles.uploadType, styles.uploadType_active].join(" ")}>
                    {t("Upload Video")}
                </button>
            </div>
            <FileInput type={{ fa: "ویدیو", en: "Video" }} description={t("video input condition")} />
        </div>
    )
}

export default VideoInput