import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { SectionContext } from '../../../contexts';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { CourseSection } from '../../../models/Props';
import styles from './styles.module.scss';
import { Button, IconButton } from '@mui/material';
import CourseSubSection from '../CourseSubSection'
import SubSectionCreationContent from '../SubSectionCreationContent';
import { useRouter } from 'next/router';

const subSectionOptions = [
    { fa: "دوره", en: "Lecture" },
    { fa: "کوییز", en: "Quiz" },
    { fa: "تمرین با کد", en: "Coding Exercise" },
    { fa: "تست تمرینی", en: "Practice Test" },
    { fa: "تمرین", en: "Assignment" }
]

const CourseSection = ({ index, name, subSections, numberOfSubSectionsOfPreviousSection }: CourseSection) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isRtl = router.locale === "fa"
    const padding = isRtl ? { paddingRight: "45px" } : { paddingLeft: "45px" }
    const [onDrag, setOnDrag] = useState(false)
    const [isOpenAddCurriculum, setIsOpenAddCurriculum] = useState(false)
    const addButtonPadding = isRtl ? { paddingRight: "25px" } : { paddingLeft: "25px" }

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>) => {
        setOnDrag(true)
        console.log("onDragtotall")
    }

    const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
        setOnDrag(false)
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
        console.log("onDropTotall")
    }

    const onAddCurriculumClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenAddCurriculum(!isOpenAddCurriculum)
    }
    return (
        <SectionContext.Provider value={{ subSectionOptions }}>

            <div className={styles.container}>
                <div
                    className={[styles.header].join(" ")}
                    onDragOver={(e) => { e.preventDefault() }}
                    onDragStart={handleOnDragStart}
                    onDragEnd={handleOnDragEnd}
                    onDrop={handleOnDrop}
                    draggable
                >
                    <span className={styles.title}>{t("Section")}: {index}</span>
                    <StickyNote2OutlinedIcon fontSize='small' />
                    <span className={styles.name}>{name}</span>
                    <span className={styles.icons}>
                        <span>
                            <IconButton className={styles.icon}>
                                <EditIcon fontSize='small' />
                            </IconButton>
                            <IconButton className={styles.icon}>
                                <DeleteIcon fontSize='small' />
                            </IconButton>
                        </span>
                        <IconButton>
                            <MenuOutlinedIcon />
                        </IconButton>
                    </span>
                </div>
                <div style={padding}>
                    {subSections.map((list, index) => {
                        return (
                            <CourseSubSection
                                key={list._id}
                                index={index + numberOfSubSectionsOfPreviousSection + 1}
                                content={list}
                            />)
                    })}
                    <button
                        onClick={onAddCurriculumClick}
                        className={[styles.mult, isOpenAddCurriculum && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}
                    ></button>
                    {isOpenAddCurriculum && (
                        <div className={styles.SubSectionCreationContent}>
                            <SubSectionCreationContent />
                        </div>
                    )}
                    {!isOpenAddCurriculum && <div className={styles.addButton}>
                        <Button style={addButtonPadding} onClick={onAddCurriculumClick}>{t("Curriculum item")}</Button>
                    </div>}
                </div>
            </div>
        </SectionContext.Provider>
    )
}

export default CourseSection