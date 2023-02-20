import React, { useCallback, useContext, useState } from 'react'
import useTranslation from "next-translate/useTranslation";

// Context Imports
import { CurriculumContext, SubSectionContext } from '../../../contexts';

// Components Import
import FileInput from '../FileInput'
import UploadProgressTable from '../UploadProgressTable';

// Styles Import
import styles from './styles.module.scss'

const VideoInput = () => {

    const { handleUploadVideo } = useContext(CurriculumContext)
    const { content, onResourseButtonClick } = useContext(SubSectionContext)
    const [videoName, setVideoName] = useState("")
    const [progress, setProgress] = useState(0)
    const [error, setError] = useState({ reason: "" })

    const { t } = useTranslation("common")

    const handleProgress = useCallback((status: number) => {
        setProgress(status)
    }, [])

    const onChangeFile = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0] && e.target.files[0].type.startsWith('video')) {
            const file = e.target.files[0]
            setVideoName(file.name)
            const res = await handleUploadVideo({ lessonId: content._id, handleProgress, videoData: file })
            if (res.success) {
                onResourseButtonClick()
            } else {
                setError({ reason: res.message })
            }
        }
    }, [])

    const onCancelUpload = useCallback(() => {
        setVideoName("")
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={[styles.uploadType, styles.uploadType_active].join(" ")}>
                    {t("Upload Video")}
                </button>
            </div>
            {!videoName && (
                <FileInput
                    onChange={onChangeFile}
                    type={t("select video")}
                    description={t("video input condition")}
                    accept='video/*'
                />
            )}
            {videoName && <UploadProgressTable
                fileName={videoName}
                type="Video"
                status={progress}
                onCancel={onCancelUpload}
            />}
        </div>
    )
}

export default VideoInput