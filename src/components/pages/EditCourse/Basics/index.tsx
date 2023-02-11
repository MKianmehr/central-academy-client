import React, { useCallback, useState } from 'react'
import useTranslation from "next-translate/useTranslation";
import styles from './styles.module.scss'
import RemainingInputWithLabelAndDes from '../../../commons/RemainingInputWithLabelAndDes';
import MarkdownInput from '../../../commons/MarkdownInput';
import BasicInfo from './BasicInfo';

const Basics = () => {
    const { t } = useTranslation("common")
    const [title, setTitle] = useState('')
    const [subtitle, setSubtitle] = useState('')
    const [description, setDescription] = useState('')

    const titleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }, [])

    const subtitleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSubtitle(e.target.value)
    }, [])

    const descriptionOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }
    return (
        <div className={styles.container}>
            <h3 className={styles.header}>{t("Course landing page")}</h3>
            <p className={styles.paragraph}>{t("basics-describe")}</p>
            <div>
                <RemainingInputWithLabelAndDes
                    maxLength={60}
                    placeHolder={t('insert your course title')}
                    value={title}
                    onChange={titleOnChange}
                    className={styles.input}
                    title={t("course title")}
                    description={t("edit-course-basics")}
                />
                <RemainingInputWithLabelAndDes
                    maxLength={120}
                    placeHolder={t('insert your course subtitle')}
                    value={subtitle}
                    onChange={subtitleOnChange}
                    className={styles.input}
                    title={t("course subtitle")}
                    description={t("edit-course-basics-course-subtitle")}
                />
                <MarkdownInput
                    onChange={descriptionOnChange}
                    value={description}
                    title='Course description'
                    placeHolder='Insert your course description'
                />
                <BasicInfo />
            </div>
        </div>
    )
}

export default Basics