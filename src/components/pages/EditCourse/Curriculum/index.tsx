import React, { useCallback, useMemo, useState } from 'react'
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router';

// Props Import 
import { AddCurriculumItem, CurriculumItem } from '../../../../models/Props';

// Components Imports
import CourseSection from '../../../commons/CourseSection'
import AddSection from '../../../commons/AddSection';

//Mui Imports
import AddIcon from '@mui/icons-material/Add';
import { Button, IconButton } from '@mui/material';

// Contexts Import
import { CurriculumContext } from '../../../../contexts';

// Utils Imports

import ClassOptions from '../../../../utils/curriculumClasses';

// Styles Import
import styles from './styles.module.scss'


const response = {
    count: 5,
    next: "",
    previous: "",
    results: [
        {
            _class: "chapter",
            _id: 451,
            title: "Chapter o",
            description: "",
            object_index: 1,
        },
        {
            _class: "quiz",
            _id: 154321,
            title: "Quiz fe",
            type: "quiz",
            description: "",
            is_published: true,
            object_index: 1,
            is_draft: false,
            duration: 0,
            pass_percent: 70,
            num_assessments: 0, // number of questions
            requires_draft: false,
            is_randomized: false
        },
        {
            _class: "chapter",
            _id: 3211,
            title: "Chapter Two",
            description: "",
            object_index: 1,
        },
        {
            _class: "quiz",
            _id: 5672,
            title: "Quiz fe",
            type: "quiz",
            description: "",
            is_published: true,
            object_index: 1,
            is_draft: false,
            duration: 0,
            pass_percent: 70,
            num_assessments: 0, // number of questions
            requires_draft: false,
            is_randomized: false
        },
        {
            _class: "chapter",
            _id: 17098760,
            title: "Chapter One",
            description: "",
            object_index: 1,
        },
        {
            _class: "quiz",
            _id: 12154,
            title: "quiz code exe",
            type: "coding-exercise",
            description: "",
            is_published: false,
            object_index: 0,
            is_draft: false,
            duration: 0,
            pass_percent: 70,
            num_assessments: 1,
            requires_draft: false,
            is_randomized: false
        },
        {
            _class: "practice", // it is assessment
            _id: 876544,
            title: "practice",
            is_published: false,
            object_index: 0 // default if is publishid we check real number
        },
        {
            _class: "lecture",
            _id: 98765435675,
            title: "lect",
            description: "",
            is_published: true,
            is_downloadable: false,
            is_free: true,
            asset: {  // or null
                _class: "asset",
                _id: 987656786,
                asset_type: "Video",
                title: "video name",
                created: "2023.01.13",
                status: 1,
                body: "",
                thumbnail_url: "http://",
                source_url: "",
                content_summary: "00.50",
                processing_errors: [],
                time_estimation: 50
            },
            object_index: 1,
            supplementary_assets: [
                {
                    _class: "asset",
                    _id: 78765898765,
                    asset_type: "File",
                    title: "doc.pdf",
                    created: "2023",
                    status: 1,
                    body: "",
                    thumbnail_url: "htt",
                    source_url: "",
                    content_summary: "310kb",
                    processing_errors: [],
                    time_estimation: 0,
                }
            ]
        },
        {
            _class: "lecture",
            _id: 695968,
            title: "dx",
            description: "",
            is_published: true,
            is_downloadable: true,
            is_free: false,
            asset: {
                _class: "asset",
                _id: 894939,
                asset_type: "Article",
                title: "",
                created: "2023.01.13",
                status: 1,
                body: "",
                thumbnail_url: "http://",
                source_url: "",
                content_summary: "00.50",
                processing_errors: [],
                time_estimation: 50
            },
            object_index: 4,
            supplementary_assets: []
        }
    ]
}

const Curriculum = () => {

    const { t } = useTranslation("common")
    const [isOpenAddSection, setIsOpenAddSection] = useState(false)
    const [curriculumItems, setCurriculumItems] = useState<CurriculumItem[]>(response.results)

    const SubSectionsBeforeTheFirstSection = useMemo(
        () => {
            return curriculumItems
                .slice(0, curriculumItems.findIndex((curriculumItem) => curriculumItem._class === ClassOptions.Chapter))
        },
        [curriculumItems]
    )

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

    const handleAddCurriculumItem = (
        { data, index }:
            { data: AddCurriculumItem, index: number }
    ) => {
        const allCurriculumItems = [...curriculumItems]
        allCurriculumItems.splice(index, 0, { ...data, _id: Math.floor(Math.random() * 10000) + 1 })
        setCurriculumItems(allCurriculumItems)
        return true
        // or return false
    }

    const handleEditCurriculumItem = (
        { data, index }:
            { data: CurriculumItem; index: number }
    ) => {
        const allCurriculumItems = [...curriculumItems]

        const [currentItem] = allCurriculumItems.splice(index, 1)

        const newItem: CurriculumItem = {
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