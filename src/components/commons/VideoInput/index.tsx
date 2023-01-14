import React from 'react'
import styles from './styles.module.scss'
import FileInput from '../FileInput'

const VideoInput = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={[styles.uploadType, styles.uploadType_active].join(" ")}>
                    Upload Video
                </button>
            </div>
            <FileInput type='Video' description='All files should be at least 720p and less than 4.0 GB.' />
        </div>
    )
}

export default VideoInput