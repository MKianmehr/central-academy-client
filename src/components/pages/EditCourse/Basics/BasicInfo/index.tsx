import React, { useCallback, useState } from 'react'
import useTranslation from "next-translate/useTranslation";

// Props Import
import { CustomEventForCustomSelect, KeyValue } from '../../../../../models/Props'

// Components Imports
import CustomSelect from '../../../../commons/CustomSelect'
import FileInput from '../../../../commons/FileInput';

// Styles Import
import styles from './styles.module.scss'


const languages: KeyValue[] = [{ fa: "انگلیسی", en: "English" }, { fa: "فارسی", en: "Persian" }]

const courseLevels: KeyValue[] = [
    { fa: "-- انتخاب سطح --", en: "-- Select Level --" },
    { fa: "مبتدی", en: "Beginner Level" }
]

const categories: KeyValue[] = [
    { fa: '-- انتخاب دسته بندی --', en: "-- Select Category --" },
    { fa: "آی تی و نرم افزار", en: "IT & Software" }
]

const BasicInfo = () => {
    const [selectedLang, setSelectedLang] = useState(languages[0])
    const [level, setLevel] = useState(courseLevels[0])
    const [category, setCategory] = useState(categories[0])

    const { t } = useTranslation("common")

    const onSelectLang = useCallback((e: CustomEventForCustomSelect) => {
        setSelectedLang(e.target.value)
    }, [])

    const onSelectLevel = useCallback((e: CustomEventForCustomSelect) => {
        setLevel(e.target.value)
    }, [])

    const onSelectCategory = useCallback((e: CustomEventForCustomSelect) => {
        setCategory(e.target.value)
    }, [])

    return (
        <div className={styles.container}>
            <h3 className={styles.title}>{t("Basic Info")}</h3>
            <div className={styles.selectBox}>
                <CustomSelect values={languages} value={selectedLang} onChange={onSelectLang} className={styles.select} />
                <CustomSelect values={courseLevels} value={level} onChange={onSelectLevel} className={styles.select} />
                <CustomSelect values={categories} value={category} onChange={onSelectCategory} className={styles.select} />
            </div>
            <div>
                <h4 className={styles.title}>{t("What is primarily taught in your course")}</h4>
                <input className={styles.input} placeholder='e.g. Landscape Photography' />
            </div>
            <div className={styles.courseImage}>
                <div>
                    <h4 className={styles.title}>{t("Course image")}</h4>
                    {/* Images */}
                </div>
                <div className={styles.fileInput}>
                    <p>Upload your course image here. It must meet our course image quality standards to be accepted. Important guidelines: 750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the image.</p>
                    <FileInput type={"Upload File"} />
                </div>
            </div>
        </div>
    )
}

export default BasicInfo