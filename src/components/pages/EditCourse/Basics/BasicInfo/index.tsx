import React, { useCallback, useContext, useEffect, useState } from 'react'
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import Image from 'next/image';

// Context Import 
import { EditCourseContext, GlobalContext } from '../../../../../contexts';

// Props Import
import { CustomEventForCustomSelect, KeyValue } from '../../../../../models/Props'

// Components Imports
import CustomSelect from '../../../../commons/CustomSelect'
import FileInput from '../../../../commons/FileInput';

// Utils Import
import fileResizer from '../../../../../utils/imageResizer';

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
    const [imagePreview, setImagePreview] = useState('')
    const [imageName, setImageName] = useState('')
    const [imageLoading, setImageLoading] = useState(false)

    const router = useRouter()
    const [courseId, setCourseId] = useState(router.query.courseId)

    useEffect(() => {
        setCourseId(router.query.courseId)
    }, [router.query])

    const { t } = useTranslation("common")
    const { uploadImage } = useContext(GlobalContext)
    const { course } = useContext(EditCourseContext)

    const onSelectLang = useCallback((e: CustomEventForCustomSelect) => {
        setSelectedLang(e.target.value)
    }, [])

    const onSelectLevel = useCallback((e: CustomEventForCustomSelect) => {
        setLevel(e.target.value)
    }, [])

    const onSelectCategory = useCallback((e: CustomEventForCustomSelect) => {
        setCategory(e.target.value)
    }, [])

    const handleLoading = useCallback((loading: boolean) => {
        setImageLoading(loading)
    }, [])

    const handleImage = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            setImagePreview(window.URL.createObjectURL(file))
            setImageName(file.name)
            try {
                const image = await fileResizer({ file, width: 750, height: 422 }) as string
                uploadImage(image, courseId as string, handleLoading)
            } catch (e) {
                toast.warning(`${e}`)
            }
        }
    }, [courseId])

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
                <div className={styles.imagewithTitle}>
                    <h4 className={styles.title}>{t("Course image")}</h4>
                    <div className={styles.imageContainer}>
                        {imagePreview ? <Image className={styles.image} src={imagePreview} fill={true} alt='course image' /> : (
                            course?.image && course?.image?.Location && <Image className={styles.image} src={course?.image.Location} fill={true} alt='course image' />
                        )}
                    </div>
                </div>
                <div className={styles.fileInput}>
                    <p className={styles.info}>{t("image conditions")}</p>
                    <FileInput
                        fileName={imageName}
                        type={t("Upload File")} onChange={handleImage}
                    />
                </div>
            </div>
        </div>
    )
}

export default BasicInfo