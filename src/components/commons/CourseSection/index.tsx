import React, { useCallback, useContext, useState, CSSProperties } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CourseSectionProp, DragDropSubSection, DragDropSection } from '../../../models/Props';
import DragDropTypes from '../../../utils/DragDropTypes'

// Material-UI imports
import { Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Context imports 
import { SectionContext, CurriculumContext } from '../../../contexts';

// Components imports
import SectionHeader from '../SectionHeader';
import CourseSubSection from '../CourseSubSection'
import AddSubSection from '../AddSubSection';
import BeforeSection from '../BeforeSection';
import AddSection from '../AddSection';
import BeforeSubSection from '../BeforeSubSection';

// Styles imports
import styles from './styles.module.scss';


const subSectionOptions = [
    { fa: "دوره", en: "Lecture" },
    { fa: "کوییز", en: "Quiz" },
    { fa: "تمرین با کد", en: "Coding Exercise" },
    { fa: "تست تمرینی", en: "Practice Test" },
    { fa: "تمرین", en: "Assignment" }
]

const CourseSection = ({ index, numberOfSubSectionsOfPreviousSection, section }: CourseSectionProp) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isRtl = router.locale === "fa"
    const { onDragSection, sections, onDragSubSection } = useContext(CurriculumContext)
    const [isOpenAddCurriculum, setIsOpenAddCurriculum] = useState(false)
    const [isEditSectionActive, setIsEditSectionActive] = useState(false)
    const addButtonPadding: CSSProperties = isRtl ? { paddingRight: "25px" } : { paddingLeft: "25px" }

    const [_, drag, dragPreview] = useDrag(
        () => ({
            type: DragDropTypes.Section,
            item: { index: index - 1, _id: section._id },
        }),
        [sections]
    )

    const [, drop] = useDrop(
        () => ({
            accept: [DragDropTypes.Section, DragDropTypes.SubSection],
            drop(item: DragDropSection | DragDropSubSection, monitor) {
                handleOnDrop(item)
            },
            hover(item: DragDropSection | DragDropSubSection, monitor) {
                handleOnHover(item)
            }
        }),
        [sections],
    )

    const handleOnHover = (item: DragDropSection | DragDropSubSection) => {
        if ('sectionIndex' in item) {
            if (!(sections[index - 1].subSections.length === 0)) {
                return
            }
            onDragSubSection({ currentPosition: { sectionIndex: item.sectionIndex, currentIndex: item.index }, targetPosition: { sectionIndex: index - 1, index: 0 } })
        }
    }

    const handleOnDrop = (item: DragDropSection | DragDropSubSection) => {
        if ('sectionIndex' in item) {
            return
        }
        else {
            if (item._id === section._id) return
            onDragSection({ currentIndex: item.index, targetIndex: index - 1 })
        }
    }

    const onAddCurriculumClick = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setIsOpenAddCurriculum(!isOpenAddCurriculum)
    }, [isOpenAddCurriculum])

    const handleEditSection = useCallback(() => {
        setIsEditSectionActive(!isEditSectionActive)
    }, [isEditSectionActive])
    return (
        <SectionContext.Provider value={{ subSectionOptions, index: index - 1 }}>
            <div>
                {/* Before */}
                <BeforeSection />
                {/* Before */}

                {/* Course Section */}
                <div className={styles.container}
                >
                    {!isEditSectionActive && (
                        <div
                            ref={drop}
                        >
                            <SectionHeader ref={drag} handleEditSection={handleEditSection} index={index} title={section.title} />
                            <SectionHeader ref={dragPreview} handleEditSection={handleEditSection} index={index} title={section.title} className={styles.ghost} />
                        </div>
                    )}
                    {isEditSectionActive && (
                        <AddSection
                            onClick={handleEditSection}
                            title={section.title}
                            goal=""
                        />
                    )}

                    {/* Course SubSection */}
                    <div
                        className={[
                            styles.subSectionContainer,
                            isRtl ? styles.paddingRight : styles.paddingLeft]
                            .join(" ")}
                    >
                        {section.subSections?.map((list, subSectionIndex) => {
                            return (
                                <div key={list._id}>
                                    <BeforeSubSection />
                                    <CourseSubSection
                                        index={subSectionIndex + numberOfSubSectionsOfPreviousSection + 1}
                                        realIndex={subSectionIndex}
                                        sectionIndex={index - 1}
                                        content={list}
                                    />
                                </div>
                            )
                        })}
                        <button
                            onClick={onAddCurriculumClick}
                            className={[isRtl ? styles.mult_rtl : styles.mult, isOpenAddCurriculum && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}
                        >
                            <AddIcon fontSize="large" />
                        </button>
                        {isOpenAddCurriculum && (
                            <div className={styles.SubSectionCreationContent}>
                                <AddSubSection />
                            </div>
                        )}
                        {
                            !isOpenAddCurriculum && <div className={styles.addButton}>
                                <Button style={addButtonPadding} onClick={onAddCurriculumClick}>
                                    {t("Curriculum item")}
                                </Button>
                            </div>
                        }
                        {/* Course SubSection */}
                    </div>
                </div>
                {/* Course Section */}
            </div>
        </SectionContext.Provider>
    )
}

export default CourseSection