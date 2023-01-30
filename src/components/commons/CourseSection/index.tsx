import React, { useCallback, useContext, useState, CSSProperties, useRef, useEffect } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router';
import { CourseSectionProp, DragDropSection, DragDropSubSection } from '../../../models/Props';
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


const subSectionOptions = ["lecture", "quiz", "coding-exercise", "practice", "assignment"]

const CourseSection = ({ index, section, subSections, indexToShow }: CourseSectionProp) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isRtl = router.locale === "fa"
    const { onDragSection, curriculumItems, onDragSubSection } = useContext(CurriculumContext)
    const [isOpenAddCurriculum, setIsOpenAddCurriculum] = useState(false)
    const [isEditSectionActive, setIsEditSectionActive] = useState(false)
    const [lastSubSectionIndexOfThisSection, setLastSubSectionIndexOfThisSection] = useState(0)
    const addButtonPadding: CSSProperties = isRtl ? { paddingRight: "25px" } : { paddingLeft: "25px" }

    const subSectionContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (subSectionContainerRef.current) {
            setLastSubSectionIndexOfThisSection(subSectionContainerRef.current.childNodes.length + index + 1)
        }
    }, [subSectionContainerRef.current?.childNodes.length, index, isOpenAddCurriculum])

    const [_, drag, dragPreview] = useDrag(
        () => ({
            type: DragDropTypes.Section,
            item: { index: index, _id: section?._id, type: DragDropTypes.Section },
        }),
        [curriculumItems]
    )

    const [, drop] = useDrop(
        () => ({
            accept: [DragDropTypes.Section, DragDropTypes.SubSection],
            drop(item: DragDropSection, monitor) {
                handleOnDrop(item)
            }
        }),
        [curriculumItems],
    )

    const handleOnDrop = (item: DragDropSection | DragDropSubSection) => {
        if (item._id === section?._id) return
        if (item.type === DragDropTypes.SubSection && "currentSectionIndex" in item) {
            onDragSubSection({ currentIndex: item.index, targetIndex: index, SubToSub: false, targetSectionIndex: index, currentSectionIndex: item.currentSectionIndex })
            return
        }
        onDragSection({ currentIndex: item.index, targetIndex: index })
    }

    const onAddCurriculumClick = useCallback(() => {
        setIsOpenAddCurriculum(!isOpenAddCurriculum)
    }, [isOpenAddCurriculum])

    const handleEditSection = useCallback(() => {
        setIsEditSectionActive(!isEditSectionActive)
    }, [isEditSectionActive])

    const subSection = useCallback((startIndex: number) => {
        let children = []
        let i = startIndex;
        while (i < curriculumItems.length && curriculumItems[i]._class !== "chapter") {
            children.push(
                <div key={curriculumItems[i]._id}>
                    <BeforeSubSection index={i} />
                    <CourseSubSection
                        index={i}
                        sectionIndex={index}
                        content={curriculumItems[i]}
                    />
                </div>
            )
            i++
        }
        return { children, lastIndex: i }
    }, [curriculumItems, index])


    return (
        <SectionContext.Provider value={{ subSectionOptions, index }}>
            <div>
                {/* Before */}
                <BeforeSection />
                {/* Before */}

                {/* Course Section */}
                <div className={styles.container}
                >
                    {section && !isEditSectionActive && (
                        <div
                            ref={drop}
                        >
                            <SectionHeader
                                ref={drag}
                                handleEditSection={handleEditSection}
                                index={index}
                                indexToShow={indexToShow}
                                title={section?.title}
                            />
                            <SectionHeader
                                ref={dragPreview}
                                handleEditSection={handleEditSection}
                                index={index}
                                indexToShow={indexToShow}
                                title={section?.title}
                                className={styles.ghost}
                            />
                        </div>
                    )}
                    {section && isEditSectionActive && (
                        <AddSection
                            onClick={handleEditSection}
                            title={section?.title}
                            goal={section.description}
                            index={index}
                        />
                    )}
                    {/* Course SubSection */}
                    <div
                        className={[
                            styles.subSectionContainer,
                            isRtl ? styles.paddingRight : styles.paddingLeft]
                            .join(" ")}
                    >
                        <span
                            ref={subSectionContainerRef}
                        >
                            {section && subSection(index + 1).children}
                            {!section && subSections?.map((_, i) => {
                                return (
                                    <div key={curriculumItems[i]._id}>
                                        <BeforeSubSection index={i} />
                                        <CourseSubSection
                                            index={i}
                                            sectionIndex={index}
                                            content={curriculumItems[i]}
                                        />
                                    </div>
                                )
                            })}
                        </span>
                        <button
                            onClick={onAddCurriculumClick}
                            className={[isRtl ? styles.mult_rtl : styles.mult, isOpenAddCurriculum && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}
                        >
                            <AddIcon fontSize="large" />
                        </button>
                        {isOpenAddCurriculum && (
                            <div className={styles.SubSectionCreationContent}>
                                <AddSubSection closeBeforeSubSection={onAddCurriculumClick} index={lastSubSectionIndexOfThisSection} />
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