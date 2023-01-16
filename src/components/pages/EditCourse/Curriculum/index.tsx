import React, { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next';
import CourseSection from '../../../commons/CourseSection'
import styles from './styles.module.scss'
import { CurriculumContext } from '../../../../contexts';

const initialSections = [
    {
        title: "Introduction",
        subSections: [
            { title: "Security", type: "Lecture", _id: 1 },
            { title: "Authentication", type: "Test", _id: 2 },

        ],
        _id: 1
    },
    {
        title: "Front-end",
        subSections: [
            { title: "Security2", type: "Lecture", _id: 3 },
            { title: "Authentication2", type: "Lecture", _id: 4 },
            { title: "Authentication3", type: "Lecture", _id: 5 },
            { title: "Authentication4", type: "Lecture", _id: 6 }

        ],
        _id: 2
    },
    {
        title: "Front-end2",
        subSections: [
            { title: "Security2", type: "Lecture", _id: 7 },
            { title: "Authentication5", type: "Lecture", _id: 8 },

        ],
        _id: 3
    }
]

const Curriculum = () => {
    const { t } = useTranslation("common")
    const [sections, setSections] = useState(initialSections)

    const numberOfSubSectionsOfPreviousSections = useMemo(() => {
        let numberOfSubSectionsOfPreviousSections: number[] = [0]
        for (let i = 1; i < sections.length; i++) {
            numberOfSubSectionsOfPreviousSections.push(sections[i - 1].subSections.length + numberOfSubSectionsOfPreviousSections[i - 1])
        }
        return numberOfSubSectionsOfPreviousSections
    }, [sections])

    const onDragSection = ({ currentIndex, targetIndex }: { currentIndex: number; targetIndex: number }) => {
        const allSections = [...sections]
        const currentSection = allSections[currentIndex - 1]
        allSections.splice(currentIndex - 1, 1)
        allSections.splice(targetIndex - 1, 0, currentSection)

        setSections(allSections)
    }
    const onDragSubSection = ({ currentPosition, targetPosition }: {
        currentPosition: {
            sectionIndex: number;
            currentIndex: number;
        };
        targetPosition: {
            sectionIndex: number;
            index: number;
        };
    }) => {
        const newSections = JSON.parse(JSON.stringify(sections))
        const allSections = [...newSections]
        const currentSubSection = allSections[currentPosition.sectionIndex].subSections[currentPosition.currentIndex]
        allSections[currentPosition.sectionIndex].subSections.splice(currentPosition.currentIndex, 1)
        allSections[targetPosition.sectionIndex].subSections.splice(targetPosition.index, 0, currentSubSection)
        setSections(allSections)
    }

    const handleAddSection = ({ title, goal, sectionIndex }: { title: string; goal?: string; sectionIndex: number }) => {
        const newSection = {
            title,
            goal,
            subSections: [
            ],
            _id: 4
        }
        const allSections = [...sections]
        allSections.splice(sectionIndex, 0, newSection)
        // request to server if okay setSections
        setSections(allSections)
        return true
        // or return false
    }

    const handleEditSection = ({ title, goal, sectionIndex }: { title: string; goal?: string; sectionIndex: number }) => {
        const allSections = [...sections]
        const newSection = { ...allSections[sectionIndex], title, goal }
        allSections.splice(sectionIndex, 1)
        allSections.splice(sectionIndex, 0, newSection)
        // request to server
        setSections(allSections)
        return true
        // or return false
    }

    const handleDeleteSection = ({ sectionIndex }: { sectionIndex: number }) => {
        const allSections = [...sections]
        allSections.splice(sectionIndex, 1)
        // request to server
        setSections(allSections)
        return true
        // or return false
    }

    const handleDeleteSubSection = ({ sectionIndex, index }: { sectionIndex: number; index: number }) => {
        const allSections = [...sections]
        allSections[sectionIndex].subSections.splice(index, 1)
        setSections(allSections)
        return true
    }

    const handleAddSubSection = () => {
        return false
    }

    return (
        <CurriculumContext.Provider value={{
            onDragSection,
            onDragSubSection,
            sections,
            handleAddSection,
            handleEditSection,
            handleDeleteSection,
            handleDeleteSubSection
        }}
        >
            <div className={styles.container}>
                <h3 className={styles.header}>{t("Curriculum")}</h3>
                <p className={styles.paragraph}>{t("curriculum-describe")}</p>
                {sections.map((section, index) => {
                    return (
                        <CourseSection
                            key={section._id}
                            numberOfSubSectionsOfPreviousSection={numberOfSubSectionsOfPreviousSections[index]}
                            subSections={sections[index].subSections}
                            index={index + 1}
                            title={section.title}
                        />
                    )
                })}
            </div>
        </CurriculumContext.Provider>
    )
}


export default Curriculum