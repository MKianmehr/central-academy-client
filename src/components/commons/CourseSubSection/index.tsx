import React, { useContext, useState } from 'react'
import BeforeSubSection from './BeforeSubSection'
import { useDrag, useDrop } from 'react-dnd'
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
import text from '../../../utils/textEnOrFa';
import { useRouter } from 'next/router';
import DragDropTypes from '../../../utils/DragDropTypes'
import { DragDropSubSection } from '../../../models/Props'


const CourseSubSection = ({ index, content, realIndex, sectionIndex }: CourseSubSectionProp) => {
    const { onDragSubSection, sections, handleDeleteSubSection } = useContext(CurriculumContext)
    const [isOpenDialog, setIsOpenDialog] = useState(false)
    const { t } = useTranslation("common")
    const { subSectionOptions } = useContext(SectionContext)
    const [isContentOpen, setIsContentOpen] = useState(false)
    const [isResourseOpen, setIsResourseOpen] = useState(false)
    const router = useRouter()
    const isEng = router.locale === "en"

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
                                        onConfirmDialog={onConfirmDialog}
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