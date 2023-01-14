import React, { useMemo, useState } from 'react'
import { useTranslation } from 'next-i18next';
import CourseSection from '../../../commons/CourseSection'
import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import { CurriculumContext } from '../../../../contexts';
import text from '../../../../utils/textEnOrFa';

const initialSections = [
    {
        title: { fa: "مقدمه", en: "Introduction" },
        subSections: [
            { title: { fa: "امنیت", en: "Security" }, type: { fa: "درس", en: "Lecture" }, _id: 1 },
            { title: { fa: "احراز هویت", en: "Authentication" }, type: { fa: "تست", en: "Test" }, _id: 2 },

        ],
        _id: 1
    },
    {
        title: { fa: "فرانت اند", en: "Front-end" },
        subSections: [
            { title: { fa: "امنیت2", en: "Security2" }, type: { fa: "درس", en: "Lecture" }, _id: 3 },
            { title: { fa: "2احراز هویت", en: "Authentication2" }, type: { fa: "درس", en: "Lecture" }, _id: 4 },
            { title: { fa: "2احراز هویت", en: "Authentication3" }, type: { fa: "درس", en: "Lecture" }, _id: 5 },
            { title: { fa: "2احراز هویت", en: "Authentication4" }, type: { fa: "درس", en: "Lecture" }, _id: 6 }

        ],
        _id: 2
    },
    {
        title: { fa: "فرانت اند", en: "Front-end" },
        subSections: [
            { title: { fa: "امنیت2", en: "Security2" }, type: { fa: "درس", en: "Lecture" }, _id: 7 },
            { title: { fa: "2احراز هویت", en: "Authentication5" }, type: { fa: "درس", en: "Lecture" }, _id: 8 },

        ],
        _id: 3
    }
]

const Curriculum = () => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isEnglish = router.locale === "en"
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

    return (
        <CurriculumContext.Provider value={{ onDragSection, onDragSubSection, sections }}>
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
                            name={text(section.title, isEnglish)}
                        />
                    )
                })}
            </div>
        </CurriculumContext.Provider>
    )
}


export default Curriculum