import React, { useCallback, useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Props Imports
import { CourseSubSectionProp, DragDropSubSection } from '../../../models/Props';

// Component Imports
import BeforeSubSection from '../BeforeSubSection'
import AddSubSectionContent from '../AddSubSectionContent'
import SubSectionResourse from '../AddSubSectionResourse'
import AlertDialog from '../AlertDialog';

// Mui Imports
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import { Button, IconButton } from '@mui/material';

// Utils Imports
import text from '../../../utils/textEnOrFa';
import DragDropTypes from '../../../utils/DragDropTypes'

// Context Imports
import { SubSectionContext, SectionContext, CurriculumContext } from '../../../contexts';

// Styles Imports
import styles from './styles.module.scss'



const CourseSubSection = (
    { index, content, realIndex, sectionIndex }:
        CourseSubSectionProp
) => {
    const { t } = useTranslation("common")

    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isContentOpen, setIsContentOpen] = useState(false)
    const [isResourseOpen, setIsResourseOpen] = useState(false)
    const [contentTitle, setContentTitle] = useState(`${t("Select content type")}`)

    const router = useRouter()
    const isEng = router.locale === "en"

    const { onDragSubSection, sections, handleDeleteSubSection } = useContext(CurriculumContext)
    const { subSectionOptions } = useContext(SectionContext)



    const [_, drag] = useDrag(
        () => ({
            type: DragDropTypes.SubSection,
            item: { index: realIndex, sectionIndex, type: DragDropTypes.SubSection, _id: content._id },
        }),
        [sections]
    )

    const [, drop] = useDrop(
        () => ({
            accept: [DragDropTypes.SubSection],
            drop(_, monitor) {
                const dragItem = monitor.getItem() as DragDropSubSection
                handleOnHover(dragItem)
            },
        }),
        [sections]
    )

    const handleOnHover = (dragItem: DragDropSubSection) => {
        if (dragItem._id === content._id) return
        if (!(sections[dragItem.sectionIndex]?.subSections[dragItem.index]?._id === dragItem._id)) return

        onDragSubSection({ currentPosition: { sectionIndex: dragItem.sectionIndex, currentIndex: dragItem.index }, targetPosition: { sectionIndex: sectionIndex, index: realIndex } })
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
        const res = handleDeleteSubSection({ sectionIndex, index: realIndex })
        if (res) {
            onOpenDialog()
        }
    }, [sectionIndex, realIndex, onOpenDialog])

    const handleContentTitleByOnClickContentType = useCallback((title: string) => {
        setContentTitle(title)
    }, [])

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
                {/* before subsection */}
                <BeforeSubSection />
                {/* before subsection */}

                {/* subsection */}
                <div
                    ref={drag}
                >
                    <div className={styles.subSection}>
                        <div className={styles.left}>
                            <div className={styles.textAndIcons}>
                                <div className={styles.typeAndtitle}>
                                    <div>
                                        <CheckCircleIcon fontSize='small' />
                                        {text(content.type, isEng)} {index}:
                                    </div>
                                    <div>
                                        {content.title}
                                    </div>
                                </div>
                                <div className={[styles.editAndDeleteIcons, styles.hoverableIcons].join(" ")}>
                                    <div>
                                        <IconButton><EditIcon className={styles.editIcon} fontSize='small' /></IconButton>
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
                            {content.type.en.toLowerCase() === "lecture" && (
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
                {/* subsection */}
            </div>
        </SubSectionContext.Provider>
    )
}

export default CourseSubSection

