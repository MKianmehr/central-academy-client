import React, { useCallback, useContext, useMemo, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useTranslation } from 'next-i18next';

// Props Imports
import { CourseSubSectionProp, DragDropSubSection } from '../../../models/Props';

// Component Imports
import AddSubSectionContent from '../AddSubSectionContent'
import SubSectionResourse from '../AddSubSectionResourse'
import AlertDialog from '../AlertDialog';
import LCA from '../AddSubSection/LCA';
import Quiz from '../AddSubSection/Quiz'

// Mui Imports
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton } from '@mui/material';

// Utils Imports
import DragDropTypes from '../../../utils/DragDropTypes'
import ClassOptions, { QuizOptions } from '../../../utils/curriculumClasses';
import toUpperCaseFirstLetter from '../../../utils/toUpperCaseFirstLetter';

// Context Imports
import { SubSectionContext, SectionContext, CurriculumContext } from '../../../contexts';

// Styles Imports
import styles from './styles.module.scss'




const CourseSubSection = (
    { index, content, sectionIndex }:
        CourseSubSectionProp
) => {
    const { t } = useTranslation("common")

    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isContentOpen, setIsContentOpen] = useState(false)
    const [isResourseOpen, setIsResourseOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [editContent, setEditContent] = useState<React.ReactNode>()
    const [contentTitle, setContentTitle] = useState(`${t("Select content type")}`)

    const { onDragSubSection, curriculumItems, handleDeleteCurriculumItem } = useContext(CurriculumContext)
    const { subSectionOptions } = useContext(SectionContext)

    const indexToShow = useMemo(() => {
        const type = content._class
        console.log("classsss", type)
        let num = 1
        for (let i = 0; i < index; i++) {
            if (curriculumItems[i]._class === type) num++
        }
        return num
    }, [curriculumItems])

    const typeToShow = useMemo(() => {
        if (content._class === ClassOptions.Quiz && content.type === QuizOptions.CodingExercise) {
            return QuizOptions.CodingExercise
        } else {
            return content._class
        }
    }, [])


    const [_, drag] = useDrag(
        () => ({
            type: DragDropTypes.SubSection,
            item: { index, type: DragDropTypes.SubSection, _id: content._id, currentSectionIndex: sectionIndex },
        }),
        [curriculumItems]
    )

    const [, drop] = useDrop(
        () => ({
            accept: [DragDropTypes.SubSection],
            drop(_, monitor) {
                const dragItem = monitor.getItem() as DragDropSubSection
                handleOnDrag(dragItem)
            },
        }),
        [curriculumItems]
    )

    const handleOnDrag = (dragItem: DragDropSubSection) => {
        if (dragItem._id === content._id) return
        onDragSubSection({
            currentIndex: dragItem.index,
            targetIndex: index,
            SubToSub: true,
            currentSectionIndex: dragItem.currentSectionIndex,
            targetSectionIndex: sectionIndex
        })
    }


    const onContentButtonClick = useCallback(() => {
        setIsContentOpen(!isContentOpen)
        setIsResourseOpen(false)
        setContentTitle(`${t("Select content type")}`)
    }, [isContentOpen])


    const onResourseButtonClick = useCallback(() => {
        setIsResourseOpen(!isResourseOpen)
        setIsContentOpen(false)
    }, [isResourseOpen])


    const onOpenDialog = useCallback(() => {
        setIsOpenDialog(!isOpenDialog)
    }, [isOpenDialog])


    const onConfirmDeleteDialog = useCallback(() => {
        const res = handleDeleteCurriculumItem({ index })
        if (res) {
            onOpenDialog()
        }
    }, [index, onOpenDialog])


    const handleContentTitleByOnClickContentType = useCallback((title: string) => {
        setContentTitle(title)
    }, [])


    const handleEditSubSection = useCallback(() => {

        if (content._class === ClassOptions.Lecture) {
            setIsEditOpen(true)
            setEditContent(<LCA content={content} index={index} type={content._class} handleCloseSubSectionOption={() => setIsEditOpen(false)} />)
        } else if (content._class === ClassOptions.Quiz && content.type === QuizOptions.Simple) {
            setIsEditOpen(true)
            setEditContent(<Quiz content={content} index={index} type={content._class} handleCloseSubSectionOption={() => setIsEditOpen(false)} />)
        } else {
            // redirect to their specific pages
        }
    }, [content, index])

    return (
        <SubSectionContext.Provider value={
            {
                subSectionOptions,
                onContentButtonClick,
                onResourseButtonClick,
                OnClickContentType: handleContentTitleByOnClickContentType
            }
        }
        >
            <div
                className={styles.container}
                ref={drop}
            >
                {/* Edit Box */}
                {isEditOpen && editContent}
                {/* Edit Box */}
                {/* subsection */}
                {!isEditOpen && (
                    <div
                        ref={drag}
                    >
                        <div className={styles.subSection}>
                            <div className={styles.left}>
                                <div className={styles.textAndIcons}>
                                    <div className={styles.typeAndtitle}>
                                        <div className={styles.type}>
                                            {content.is_published ? <CheckCircleIcon fontSize='small' /> : <WarningIcon className={styles.warningIcon} fontSize='small' />}
                                            {t(`${typeToShow}`)} {indexToShow} :
                                        </div>
                                        <div>
                                            {toUpperCaseFirstLetter(content.title)}
                                        </div>
                                    </div>
                                    <div className={[styles.editAndDeleteIcons, styles.hoverableIcons].join(" ")}>
                                        <div>
                                            <IconButton onClick={handleEditSubSection} ><EditIcon className={styles.editIcon} fontSize='small' /></IconButton>
                                        </div>
                                        <div>
                                            <IconButton onClick={onOpenDialog}><DeleteIcon className={styles.editIcon} fontSize='small' /></IconButton>
                                        </div>
                                        <AlertDialog
                                            onConfirmDialog={onConfirmDeleteDialog}
                                            onOpenDialog={onOpenDialog}
                                            isOpen={isOpenDialog}
                                            describtion={t("section delete message")}
                                            notificationMessage={t("Please Confirm")} />
                                    </div>
                                </div>
                                {content._class?.toLowerCase() === ClassOptions.Lecture && (
                                    !isContentOpen && (
                                        <div>
                                            <div className={styles.addButton}>
                                                <Button onClick={onContentButtonClick}>
                                                    <AddIcon />
                                                    {t("Content")}
                                                </Button>
                                            </div>
                                        </div>
                                    )
                                )}
                            </div>
                            <div className={styles.arrowAndMenuIcon}>
                                {!isContentOpen && (
                                    <div className={[styles.hoverableIcons].join(" ")}>
                                        <IconButton onClick={onResourseButtonClick}>
                                            {isResourseOpen ? <KeyboardArrowUpIcon className={styles.editIcon} /> : <KeyboardArrowDownIcon className={styles.editIcon} />}
                                        </IconButton>
                                    </div>
                                )}
                                {isContentOpen && (
                                    <div className={styles.contentOpenTopContainer}>
                                        <div className={styles.contentTitle}>
                                            <span>
                                                {isContentOpen && contentTitle}
                                            </span>
                                            <div>
                                                <IconButton onClick={onContentButtonClick} className={styles.closeIcon}>
                                                    <AddIcon />
                                                </IconButton>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className={[styles.hoverableIcons].join(" ")}>
                                    <IconButton>
                                        <MenuIcon />
                                    </IconButton>
                                </div>
                            </div>
                        </div>

                        {/* subSection content and resourse */}
                        {isContentOpen && <AddSubSectionContent />}
                        {isResourseOpen && <SubSectionResourse />}
                        {/* subSection content and resourse */}

                    </div>
                )}
                {/* subsection */}
            </div>
        </SubSectionContext.Provider>
    )
}

export default CourseSubSection

