import React, { useState } from 'react'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'next-i18next';
import { CourseSubSectionProp } from '../../../models/Props';
import SubSectionCreationContent from '../SubSectionCreationContent';
import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import text from '../../../utils/textEnOrFa';


const CourseSubSection = ({ index, subSectionOptions, content }: CourseSubSectionProp) => {
    const { t } = useTranslation("common")
    const [hoverButtonActive, setHoverButtonActive] = useState(false)
    const router = useRouter()
    const isRtl = router.locale === "fa"
    const isEnglish = router.locale === "en"

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log("onDrag", index)
    }

    const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log("OnDragEnd", index)
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log("onDrop", index)
    }

    const handleHoverButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setHoverButtonActive(!hoverButtonActive)
    }


    return (
        <div
            className={styles.container}
        >
            <div className={[styles.before, hoverButtonActive && styles.before_active].join(" ")}>
                <button onClick={handleHoverButton} className={styles.hoverButton}>
                    <span className={[isRtl ? styles.square_rtl : styles.square, hoverButtonActive && styles.square_active].join(" ")}></span>
                    <span className={[isRtl ? styles.mult_rtl : styles.mult, hoverButtonActive && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}></span>
                </button>
                {hoverButtonActive && <SubSectionCreationContent subSectionOptions={subSectionOptions} />}
            </div>
            <div
                onDragOver={(e) => { e.preventDefault() }}
                onDragStart={(e) => handleOnDragStart(e, index)}
                onDragEnd={(e) => handleOnDragEnd(e, index)}
                onDrop={(e) => handleOnDrop(e, index)}
                draggable
            >
                <div className={styles.lecture}>
                    <CheckCircleIcon fontSize='small' />
                    <span> {text(content.type, isEnglish)} {index}: </span>
                    <span>{text(content.title, isEnglish)}</span>
                </div>
                <div></div>
            </div>
        </div>
    )
}

export default CourseSubSection