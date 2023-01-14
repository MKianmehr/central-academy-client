import React from 'react'
import styles from './styles.module.scss'

const FileInput = ({ type, description }: { type: string; description: string }) => {

    return (
        <>
            <div className={styles.inputContainer}>
                <input className={styles.input} type="file" id='video' />
                <label className={styles.inputLabel} htmlFor='video'>
                    <span className={styles.inputLabel__left}>No file selected</span>
                    <span className={styles.horizontalLine}></span>
                    <span className={styles.inputLabel__right}>Select {type}</span>
                </label>
            </div>
            <div className={styles.description}>
                <span className={styles.note}>Note:</span>
                <span className={styles.noteContent}>
                    {description}
                </span>
            </div>
        </>
    )
}

export default FileInput