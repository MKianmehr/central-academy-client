import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Props Import
import { LCAProp } from '../../../../models/Props';

// Mui Imports
import { Button } from '@mui/material';

// Component imports
import RemainingInput from '../../RemaingInput';

// Context Import
import { CurriculumContext } from '../../../../contexts';

//Styles Import 
import styles from './styles.module.scss';

// Lecture Coding Exercise and assignment are the same (LCA)

const LCA = (
    { type, handleCloseSubSectionOption, content, index }: LCAProp

) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isEnglish = router.locale === "en"

    const [text, setText] = useState<string>(content ? content.title : "")
    const [textError, setTextError] = useState("")

    const { handleEditCurriculumItem, handleAddCurriculumItem } = useContext(CurriculumContext)

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTextError("")
        setText(e.target.value)

    }

    const onCancelClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        handleCloseSubSectionOption()
    }

    const onClickConfirm = useCallback(() => {
        if (text) {
            if (content && index) {
                const res = handleEditCurriculumItem({
                    index, data: {
                        title: text
                    }
                })
                res && handleCloseSubSectionOption()
            } else {
                const res = handleAddCurriculumItem({
                    index: index
                    , data: {
                        title: text,
                        _class: type
                    }
                })
                res && handleCloseSubSectionOption()
            }
        } else {
            setTextError(`${t("This field may not be blank.")}`)
        }

    }, [text, index, content, handleEditCurriculumItem])
    return (
        <div className={styles.container}>
            <h6>{t(type)}</h6>
            <RemainingInput
                value={text}
                onChange={onChangeText}
                placeHolder={`${t('Enter a title')}`}
                maxLength={60}
                errorValue={textError && textError}
            />
            <div className={styles.buttons}>
                <Button onClick={onCancelClick} className={styles.cancel}>{t("Cancel")}</Button>
                <Button onClick={onClickConfirm} className={styles.confirm}>{t(content ? "edit" : "add")} {t(type)}</Button>
            </div>
        </div>
    )
}

export default LCA