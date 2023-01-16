import React, { useCallback, useContext, useRef, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { SectionContext, CurriculumContext } from '../../../contexts';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AlertDialog from '../AlertDialog';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { CourseSection } from '../../../models/Props';
import styles from './styles.module.scss';
import { Button, IconButton } from '@mui/material';
import CourseSubSection from '../CourseSubSection'
import SubSectionCreationContent from '../SubSectionCreationContent';
import { useRouter } from 'next/router';
import BeforeSection from './BeforeSection';
import InputsForAddSection from './InputForAddSection';


const SectionHeader = ({ index, title, handleEditSection }: { index: number; title: string; handleEditSection: () => void }) => {
    const { t } = useTranslation("common")
    const { handleDeleteSection } = useContext(CurriculumContext)
    const [isDialogEnable, setIsDialogEnable] = useState(false)

    const onOpenDialog = () => {
        setIsDialogEnable(!isDialogEnable)
    }

    const onConfirmDialog = () => {
        handleDeleteSection({ sectionIndex: index - 1 })
    }

    return (
        <>
            <span className={styles.title}>{t("Section")}: {index}</span>
            <StickyNote2OutlinedIcon fontSize='small' />
            <span className={styles.name}>{title}</span>
            <span className={styles.icons}>
                <span>
                    <IconButton onClick={handleEditSection} className={styles.icon}>
                        <EditIcon fontSize='small' />
                    </IconButton>
                    <IconButton onClick={onOpenDialog} className={styles.icon}>
                        <DeleteIcon fontSize='small' />
                        <AlertDialog
                            notificationMessage={t("Please Confirm")}
                            onConfirmDialog={onConfirmDialog}
                            onOpenDialog={onOpenDialog}
                            describtion={t("section delete message")}
                            isOpen={isDialogEnable}
                        />
                    </IconButton>
                </span>
                <IconButton >
                    <MenuOutlinedIcon className={styles.menu} />
                </IconButton>
            </span>
        </>
    )
}


const subSectionOptions = [
    { fa: "دوره", en: "Lecture" },
    { fa: "کوییز", en: "Quiz" },
    { fa: "تمرین با کد", en: "Coding Exercise" },
    { fa: "تست تمرینی", en: "Practice Test" },
    { fa: "تمرین", en: "Assignment" }
]

const CourseSection = ({ index, title, subSections, numberOfSubSectionsOfPreviousSection }: CourseSection) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isRtl = router.locale === "fa"
    const draggableRef = useRef<HTMLDivElement>(null);
    const { onDragSection, sections, onDragSubSection } = useContext(CurriculumContext)
    const ghostRef = useRef<HTMLDivElement>(null);
    const padding = isRtl ? { paddingRight: "45px" } : { paddingLeft: "45px" }
    const [isOpenAddCurriculum, setIsOpenAddCurriculum] = useState(false)
    const [isEditSectionActive, setIsEditSectionActive] = useState(false)
    const addButtonPadding = isRtl ? { paddingRight: "25px" } : { paddingLeft: "25px" }

    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, index: number, name: string, type: string) => {
        const draggable = draggableRef.current;
        const ghost = ghostRef.current
        if (draggable && ghost) {
            const rect = draggable.getBoundingClientRect();
            // ghost.style.width = `${draggable.offsetWidth + 20}px`
            e.dataTransfer.setDragImage(ghost, e.clientX - rect.x + 11.5, e.clientY - rect.y + 20);
            e.dataTransfer.setData("sectionIndex", `${index}`)
            e.dataTransfer.setData("sectionName", name)
            e.dataTransfer.setData("type", type)
        }
    }

    const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>, sectionIndex: number, name: string, type: string) => {
        const movingSectionType = e.dataTransfer.getData("type")
        if (movingSectionType !== type) {

            if (!(sections[sectionIndex - 1].subSections.length === 0)) {
                return
            }

            const movingSubSectionIndex = parseInt(e.dataTransfer.getData("subSectionIndex"))
            const movingSubSectionId = parseInt(e.dataTransfer.getData("subSectionId"))
            const movingSubSectionSectionIndex = parseInt(e.dataTransfer.getData("subSectionSectionIndex"))
            let isFind = false
            for (let i = 0; i < sections[movingSubSectionSectionIndex].subSections.length; i++) {

                if (sections[movingSubSectionSectionIndex].subSections[i]._id === movingSubSectionId) {
                    isFind = true;
                }
            }
            if (!isFind) {
                return
            }
            onDragSubSection({ currentPosition: { sectionIndex: movingSubSectionSectionIndex, currentIndex: movingSubSectionIndex }, targetPosition: { sectionIndex: sectionIndex - 1, index: 0 } })
        }
        else {
            const movingSectionIndex = parseInt(e.dataTransfer.getData("sectionIndex"))
            const movingSectionName = e.dataTransfer.getData("sectionName")
            if (name === movingSectionName) return
            const targetSectionIndex = sectionIndex
            onDragSection({ currentIndex: movingSectionIndex, targetIndex: targetSectionIndex })
        }
    }

    const onAddCurriculumClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenAddCurriculum(!isOpenAddCurriculum)
    }

    const handleEditSection = useCallback(() => {
        setIsEditSectionActive(!isEditSectionActive)
    }, [isEditSectionActive])
    return (
        <SectionContext.Provider value={{ subSectionOptions, index: index - 1 }}>

            <div>
                <BeforeSection />
                <div className={styles.container}
                >
                    {!isEditSectionActive && (
                        <div
                            ref={draggableRef}
                            onDragOver={(e) => {
                                e.preventDefault()
                                handleOnDragOver(e, index, title, "section")
                            }}
                            onDragStart={(e) => handleOnDragStart(e, index, title, "section")}
                            draggable
                        >
                            <div className={[styles.header].join(" ")}>
                                <SectionHeader handleEditSection={handleEditSection} index={index} title={title} />
                            </div>
                            <div ref={ghostRef} className={[styles.header, styles.ghost].join(" ")}>
                                <SectionHeader handleEditSection={handleEditSection} index={index} title={title} />
                            </div>
                        </div>
                    )}
                    {isEditSectionActive && (
                        <InputsForAddSection
                            onClick={handleEditSection}
                            title={title}
                            goal=""
                        />
                    )}
                    <div style={padding}>
                        {subSections?.map((list, subSectionIndex) => {
                            return (
                                <CourseSubSection
                                    key={list._id}
                                    index={subSectionIndex + numberOfSubSectionsOfPreviousSection + 1}
                                    realIndex={subSectionIndex}
                                    sectionIndex={index - 1}
                                    content={list}
                                />)
                        })}
                        <button
                            onClick={onAddCurriculumClick}
                            className={[isRtl ? styles.mult_rtl : styles.mult, isOpenAddCurriculum && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}
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
            </div>
        </SectionContext.Provider>
    )
}

export default CourseSection