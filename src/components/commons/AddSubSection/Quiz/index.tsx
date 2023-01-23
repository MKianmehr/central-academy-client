import React, { useCallback, useContext, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Props Imports
import { SimpleQuiz } from '../../../../models/Props';


// Components Import
import RemainingInput from '../../RemaingInput';

// Mui Imports
import { Button } from '@mui/material';

// Context Import
import { CurriculumContext } from '../../../../contexts';

// Styles Import
import styles from './styles.module.scss';

const Quiz = ({ type, index, handleCloseSubSectionOption, content }: SimpleQuiz) => {

    const router = useRouter()
    const isEnglish = router.locale === "en"

    const [text, setText] = useState<string>(content ? content.title : "")
    const [description, setDescription] = useState<string>(content ? (content.description || "") : "")
    const [preview, setPreview] = useState(false)

    const { t } = useTranslation("common")

    const { handleEditCurriculumItem } = useContext(CurriculumContext)

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

    const onClickConfirm = useCallback(() => {

        if (content && index) {
            const res = handleEditCurriculumItem({
                index, data: {
                    title: text,
                    description
                }
            })
            if (res) {
                handleCloseSubSectionOption()
            }
        } else { }
    }, [text, index, content, handleEditCurriculumItem, description])
    return (
        <div className={styles.container}>
            <h6>{t(type)}</h6>
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
                {description && <Button onClick={onPreviewClick} className={styles.preview}>{preview ? t("edit mode") : t("preview mode")}</Button>}
                <Button onClick={onClickConfirm} className={styles.confirm}>{t(content ? "edit" : "add")} {t(type)}</Button>
            </div>
        </div>
    )
}

export default Quiz