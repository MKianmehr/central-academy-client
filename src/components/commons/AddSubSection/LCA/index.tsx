import React, { useCallback, useContext, useState } from 'react'
import useTranslation from "next-translate/useTranslation";

// Props Import
import { LCAProp, _Class } from '../../../../models/Props';

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
    { _class, type, handleCloseSubSectionOption, content, index, closeBeforeSubSection }: LCAProp

) => {
    const { t } = useTranslation("common")

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

    const onClickConfirm = useCallback(async () => {

        // closeBeforeSubSection is use just for when we create a subsection not editing

        if (text) {
            if (content && index) {
                const res = await handleEditCurriculumItem({
                    index, data: {
                        title: text,
                        lessonId: content._id,
                    }
                })
                if (res) {
                    handleCloseSubSectionOption()
                }
            } else if (closeBeforeSubSection) {
                const res = await handleAddCurriculumItem({
                    index: index
                    , data: {
                        title: text,
                        _class,
                        type
                    }
                })
                if (res) {
                    handleCloseSubSectionOption()
                    closeBeforeSubSection()
                }
            }
        } else {
            setTextError(`${t("This field may not be blank.")}`)
        }

    }, [text, index, content, handleEditCurriculumItem])
    return (
        <div className={styles.container}>
            <h6>{t(type ? type : _class)}</h6>
            <RemainingInput
                value={text}
                onChange={onChangeText}
                placeHolder={`${t('Enter a title')}`}
                maxLength={60}
                errorValue={textError && textError}
            />
            <div className={styles.buttons}>
                <Button onClick={onCancelClick} className={styles.cancel}>{t("Cancel")}</Button>
                <Button onClick={onClickConfirm} className={styles.confirm}>{t(content ? "edit" : "add")} {t(type ? type : _class)}</Button>
            </div>
        </div>
    )
}

export default LCA