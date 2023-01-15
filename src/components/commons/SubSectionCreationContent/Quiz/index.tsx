import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import RemainingInput from '../../RemaingInput';
import styles from './styles.module.scss';
import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';
import { useRouter } from 'next/router';

const Quiz = ({ name, handleCloseSubSectionOption }: { name: string; handleCloseSubSectionOption: () => void }) => {
    const router = useRouter()
    const isEnglish = router.locale === "en"
    const [text, setText] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [preview, setPreview] = useState(false)
    const { t } = useTranslation("common")

    const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const onCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleCloseSubSectionOption()
    }

    const onPreviewClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setPreview(!preview)
    }

    const onChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    return (
        <div className={styles.container}>
            <h6>{isEnglish ? `${t("new")} ${name}` : `${name} ${t("new")}`}:</h6>
            <RemainingInput
                value={text}
                onChange={onChangeTitle}
                maxLength={60}
                placeHolder={`${t("Enter a title")}`}
            />
            {preview ? (
                <div className={styles.markdown}>
                    <ReactMarkdown>
                        {description}
                    </ReactMarkdown>
                </div>
            ) : (
                <textarea
                    className={styles.description}
                    value={description}
                    onChange={onChangeTextarea}
                    placeholder={`${t("Description")}`}
                />
            )
            }
            <div className={styles.buttons}>
                <Button onClick={onCancelClick} className={styles.cancel}>{t("Cancel")}</Button>
                {description && <Button onClick={onPreviewClick} className={styles.preview}>{preview ? "Edit Mode" : "Preview Mode"}</Button>}
                <Button className={styles.confirm}>{t("add")} {name}</Button>
            </div>
        </div>
    )
}

export default Quiz