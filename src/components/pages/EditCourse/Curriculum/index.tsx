import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router';

// Props Import 
import { AddCurriculumItem, CurriculumItem, EditCurriculumItem, LessonInterface } from '../../../../models/Props';

// Components Imports
import CourseSection from '../../../commons/CourseSection'
import AddSection from '../../../commons/AddSection';

//Mui Imports
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';

// Contexts Import
import { CurriculumContext, EditCourseContext, GlobalContext } from '../../../../contexts';

// Utils Imports

import ClassOptions from '../../../../utils/curriculumClasses';

// Styles Import
import styles from './styles.module.scss'


const Curriculum = () => {

    const { course } = useContext(EditCourseContext)
    const { addLesson, editLesson } = useContext(GlobalContext)
    const { t } = useTranslation("common")
    const [isOpenAddSection, setIsOpenAddSection] = useState(false)
    const [curriculumItems, setCurriculumItems] = useState<LessonInterface[]>(course?.lessons || [])
    const [loading, setLoading] = useState(false)

    const handleLoading = useCallback((loading: boolean) => {
        setLoading(loading)
    }, [])

    useEffect(() => {
        if (curriculumItems.length === 0) {
            setCurriculumItems(course?.lessons || [])
        }
    }, [course])


    // *********
    const SubSectionsBeforeTheFirstSection = useMemo(
        () => {
            return curriculumItems
                .slice(0, curriculumItems.findIndex((curriculumItem) => {
                    return curriculumItem._class === ClassOptions.Chapter
                }))
        },
        [curriculumItems]
    )

    // *********

    const Sections = useMemo(() => {
        const sections = []
        for (let i = 0; i < curriculumItems.length; i++) {
            if (curriculumItems[i]._class === ClassOptions.Chapter) {
                sections.push({ curriculumItem: curriculumItems[i], index: i })
            }
        }
        return sections
    }, [curriculumItems])

    const router = useRouter()
    const isRTL = router.locale === "fa"


    const onDragSection = useCallback((
        { currentIndex, targetIndex }:
            { currentIndex: number; targetIndex: number }
    ) => {

        const min = Math.min(currentIndex, targetIndex)
        const max = Math.max(currentIndex, targetIndex)
        let i = max;
        const allCurriculumItems = [...curriculumItems]

        do {
            i++
        }
        while (i < curriculumItems.length && allCurriculumItems[i]._class !== ClassOptions.Chapter)

        const NumberOfElementsToMove = i - max
        const removedItems = allCurriculumItems.splice(max, NumberOfElementsToMove)
        allCurriculumItems.splice(min, 0, ...removedItems)
        setCurriculumItems(allCurriculumItems)

    }, [curriculumItems])


    const onDragSubSection = useCallback((
        { currentIndex, targetIndex, SubToSub, targetSectionIndex, currentSectionIndex }:
            { currentIndex: number; targetIndex: number; SubToSub: boolean; targetSectionIndex: number; currentSectionIndex: number }
    ) => {

        const allCurriculumItems = [...curriculumItems]
        if (currentIndex > targetIndex && !SubToSub) {
            const [currentSubSection] = allCurriculumItems.splice(currentIndex, 1)
            allCurriculumItems.splice(targetIndex + 1, 0, currentSubSection)
            setCurriculumItems(allCurriculumItems)
            return
        }
        else if (SubToSub && targetSectionIndex !== currentSectionIndex && currentIndex < targetIndex) {
            const [currentSubSection] = allCurriculumItems.splice(currentIndex, 1)
            allCurriculumItems.splice(targetIndex - 1, 0, currentSubSection)
            setCurriculumItems(allCurriculumItems)
        } else {
            const [currentSubSection] = allCurriculumItems.splice(currentIndex, 1)
            allCurriculumItems.splice(targetIndex, 0, currentSubSection)
            setCurriculumItems(allCurriculumItems)
        }
    }, [curriculumItems])

    const handleAddCurriculumItem = async (
        { data, index }:
            { data: AddCurriculumItem, index: number }
    ) => {
        const res = await addLesson({ ...data, courseId: course._id, index, loading: handleLoading })
        if (res.success) {
            const allCurriculumItems = [...curriculumItems]
            if (res.lesson) {
                allCurriculumItems.splice(index, 0, res.lesson)
                setCurriculumItems(allCurriculumItems)
                return true
            }
        }

        return false
    }

    const handleEditCurriculumItem = async (
        { data, index }:
            { data: EditCurriculumItem; index: number }
    ) => {
        editLesson({ loading: handleLoading, ...data, courseId: course._id })
        const allCurriculumItems = [...curriculumItems]

        const [currentItem] = allCurriculumItems.splice(index, 1)

        const newItem: LessonInterface = {
            ...currentItem, ...data
        }

        allCurriculumItems.splice(index, 0, newItem)
        // // request to server
        setCurriculumItems(allCurriculumItems)
        return true
        // or return false
    }

    const handleDeleteCurriculumItem = ({ index }:
        { index: number }
    ) => {

        const allCurriculumItems = [...curriculumItems]
        allCurriculumItems.splice(index, 1)
        setCurriculumItems(allCurriculumItems)
        return true
        // or return false
    }


    const onClickOpenAddSection = useCallback(() => {
        setIsOpenAddSection(!isOpenAddSection)
    }, [isOpenAddSection])

    return (
        <CurriculumContext.Provider value={{
            onDragSection,
            onDragSubSection,
            curriculumItems,
            handleAddCurriculumItem,
            handleEditCurriculumItem,
            handleDeleteCurriculumItem,
        }}
        >
            <div className={styles.container}>
                <h3 className={styles.header}>{t("Curriculum")}</h3>
                <p className={styles.paragraph}>{t("curriculum-describe")}</p>
                <div className={styles.sectionContainer}>

                    {/* SubSections before The first Section */}
                    {SubSectionsBeforeTheFirstSection.length > 0 && (
                        <CourseSection
                            index={0}
                            indexToShow={0}
                            subSections={SubSectionsBeforeTheFirstSection}
                        />
                    )}
                    {/* SubSections before The first Section */}

                    {/* Sections with their children */}
                    {Sections.map((section, index) => {
                        return (
                            <CourseSection
                                key={section.curriculumItem._id}
                                index={section.index}
                                section={section.curriculumItem}
                                indexToShow={index}
                            />
                        )
                    })}
                    {/* Sections with their children */}

                </div>
                <div className={styles.addSectionButtonAndAddSection}>
                    <span className={[isRTL ? styles.multi_rtl : styles.multi, isOpenAddSection && (isRTL ? styles.multi_active_rtl : styles.multi_active)].join(" ")}>
                        <IconButton onClick={onClickOpenAddSection}>
                            <AddIcon fontSize='large' />
                        </IconButton>
                    </span>
                    {!isOpenAddSection && (
                        <Button
                            className={styles.addSectionButton}
                            onClick={onClickOpenAddSection}
                        >
                            {t("Section")}
                        </Button>
                    )}
                    {isOpenAddSection && (
                        <AddSection index={curriculumItems.length} onClick={onClickOpenAddSection} />
                    )}
                </div>
            </div>
        </CurriculumContext.Provider>
    )
}


export default Curriculum