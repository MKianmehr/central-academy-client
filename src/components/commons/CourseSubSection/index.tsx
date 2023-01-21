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
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const [isContentOpen, setIsContentOpen] = useState(false)
    const [isResourseOpen, setIsResourseOpen] = useState(false)

    const router = useRouter()
    const isEng = router.locale === "en"

    const { t } = useTranslation("common")

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

    return (
        <SubSectionContext.Provider value={{ subSectionOptions, onContentButtonClick, onResourseButtonClick }}>
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
                    <div className={styles.subsection}>
                        <div className={styles.left}>
                            <div>
                                <CheckCircleIcon fontSize='small' />
                                <span> {text(content.type, isEng)} {index}: </span>
                                <span>{content.title}</span>
                                <span className={styles.icons}>
                                    <IconButton><EditIcon className={styles.editIcon} fontSize='small' /></IconButton>
                                    <IconButton onClick={onOpenDialog}><DeleteIcon className={styles.editIcon} fontSize='small' /></IconButton>
                                    <AlertDialog
                                        onConfirmDialog={onConfirmDeleteDialog}
                                        onOpenDialog={onOpenDialog}
                                        isOpen={isOpenDialog}
                                        describtion={t("section delete message")}
                                        notificationMessage={t("Please Confirm")} />
                                </span>
                            </div>
                            {content.type.en.toLowerCase() === "lecture" && (
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