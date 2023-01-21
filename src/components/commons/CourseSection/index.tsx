import React, { useCallback, useContext, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CourseSectionProp, DragDropSubSection, DragDropSection } from '../../../models/Props';
import DragDropTypes from '../../../utils/DragDropTypes'

// Material-UI imports
import { Button } from '@mui/material';

// Context imports 
import { SectionContext, CurriculumContext } from '../../../contexts';

// Components imports
import SectionHeader from './SectionHeader';
import CourseSubSection from '../CourseSubSection'
import SubSectionCreationContent from '../SubSectionCreationContent';
import BeforeSection from './BeforeSection';
import InputsForAddSection from './InputForAddSection';

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
    const padding = isRtl ? { paddingRight: "45px" } : { paddingLeft: "45px" }
    const [isOpenAddCurriculum, setIsOpenAddCurriculum] = useState(false)
    const [isEditSectionActive, setIsEditSectionActive] = useState(false)
    const addButtonPadding = isRtl ? { paddingRight: "25px" } : { paddingLeft: "25px" }

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
                            ref={drop}
                        >
                            <SectionHeader ref={drag} handleEditSection={handleEditSection} index={index} title={section.title} />
                            <SectionHeader ref={dragPreview} handleEditSection={handleEditSection} index={index} title={section.title} className={styles.ghost} />
                        </div>
                    )}
                    {isEditSectionActive && (
                        <InputsForAddSection
                            onClick={handleEditSection}
                            title={section.title}
                            goal=""
                        />
                    )}
                    <div style={padding}>
                        {section.subSections?.map((list, subSectionIndex) => {
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