import React, { useContext, useState } from 'react'
import BeforeSubSection from './BeforeSubSection'
import SubSectionContent from './SubSectionContent'
import SubSectionResourse from './SubSectionResourse'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'next-i18next';
import { CourseSubSectionProp } from '../../../models/Props';
import { SubSectionContext, SectionContext, CurriculumContext } from '../../../contexts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.scss'
import { Button, IconButton } from '@mui/material';
import AlertDialog from '../AlertDialog';


const CourseSubSection = ({ index, content, realIndex, sectionIndex }: CourseSubSectionProp) => {
    const { onDragSubSection, sections, handleDeleteSubSection } = useContext(CurriculumContext)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const { t } = useTranslation("common")
    const { subSectionOptions } = useContext(SectionContext)
    const [isContentOpen, setIsContentOpen] = useState(false)
    const [isResourseOpen, setIsResourseOpen] = useState(false)
    // drag handlers
    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, index: number, id: number, type: string) => {
        e.dataTransfer.setData("subSectionIndex", `${index}`)
        e.dataTransfer.setData("subSectionSectionIndex", `${sectionIndex}`)
        e.dataTransfer.setData("subSectionId", `${id}`)
        e.dataTransfer.setData("type", type)
    }

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>, index: number, id: number, type: string) => {
        const movingSubSectionType = e.dataTransfer.getData("type")
        if (movingSubSectionType !== type) return
        const movingSubSectionIndex = parseInt(e.dataTransfer.getData("subSectionIndex"))
        const movingSubSectionId = parseInt(e.dataTransfer.getData("subSectionId"))
        const movingSubSectionSectionIndex = parseInt(e.dataTransfer.getData("subSectionSectionIndex"))
        if (id === movingSubSectionId) return
        let isFind = false
        for (let i = 0; i < sections[movingSubSectionSectionIndex].subSections.length; i++) {

            if (sections[movingSubSectionSectionIndex].subSections[i]._id === movingSubSectionId) {
                isFind = true;
            }
        }
        if (!isFind) {
            return
        }
        onDragSubSection({ currentPosition: { sectionIndex: movingSubSectionSectionIndex, currentIndex: movingSubSectionIndex }, targetPosition: { sectionIndex, index } })
    }
    // drag handlers

    // ui handlers
    const onContentButtonClick = () => {
        setIsContentOpen(!isContentOpen)
        setIsResourseOpen(false)
    }

    const onResourseButtonClick = () => {
        setIsResourseOpen(!isResourseOpen)
        setIsContentOpen(false)
    }

    const onOpenDialog = () => {
        setIsOpenDialog(!isOpenDialog)
    }

    const onConfirmDialog = () => {
        const res = handleDeleteSubSection({ sectionIndex, index: realIndex })
        if (res) {
            onOpenDialog()
        }
    }
    // ui handlers
    return (
        <SubSectionContext.Provider value={{ subSectionOptions, onContentButtonClick, onResourseButtonClick }}>
            <div
                className={styles.container}
            >
                {/* before subsection */}
                <BeforeSubSection />
                {/* before subsection */}

                {/* subsection */}
                <div
                    onDragOver={(e) => {
                        e.preventDefault()
                        handleDragOver(e, realIndex, content._id, "subSection")
                    }}
                    onDragStart={(e) => handleOnDragStart(e, realIndex, content._id, "subSection")}
                    draggable
                >
                    <div className={styles.subsection}>
                        <div className={styles.left}>
                            <div>
                                <CheckCircleIcon fontSize='small' />
                                <span> {content.type} {index}: </span>
                                <span>{content.title}</span>
                                <span className={styles.icons}>
                                    <IconButton><EditIcon className={styles.editIcon} fontSize='small' /></IconButton>
                                    <IconButton onClick={onOpenDialog}><DeleteIcon className={styles.editIcon} fontSize='small' /></IconButton>
                                    <AlertDialog
                                        onConfirmDialog={onConfirmDialog}
                                        onOpenDialog={onOpenDialog}
                                        isOpen={isOpenDialog}
                                        describtion={t("section delete message")}
                                        notificationMessage={t("Please Confirm")} />
                                </span>
                            </div>
                            {content.type.toLowerCase() === "lecture" && (
                                !isContentOpen && (
                                    <div className={styles.addContentButton}>
                                        <Button onClick={onContentButtonClick}>
                                            <AddIcon />
                                            {t("Content")}
                                        </Button>
                                    </div>
                                )
                            )}
                        </div>
                        {!isContentOpen && (
                            <IconButton onClick={onResourseButtonClick}>
                                {isResourseOpen ? <KeyboardArrowUpIcon className={styles.editIcon} /> : <KeyboardArrowDownIcon className={styles.editIcon} />}
                            </IconButton>
                        )}
                        <span className={styles.icons}>
                            <MenuIcon className={styles.editIcon} />
                        </span>
                    </div>
                    {/* subSection content and resourse */}
                    {isContentOpen && <SubSectionContent />}
                    {isResourseOpen && <SubSectionResourse />}
                    {/* subSection content and resourse */}
                </div>
                {/* subsection */}
            </div>
        </SubSectionContext.Provider>
    )
}

export default CourseSubSection