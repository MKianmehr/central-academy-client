import React, { useMemo } from 'react'
import { useTranslation } from 'next-i18next';
import CourseSection from '../../../commons/CourseSection'
import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import text from '../../../../utils/textEnOrFa';

const sections = [
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
            { title: { fa: "2احراز هویت", en: "Authentication2" }, type: { fa: "درس", en: "Lecture" }, _id: 5 },
            { title: { fa: "2احراز هویت", en: "Authentication2" }, type: { fa: "درس", en: "Lecture" }, _id: 6 }

        ],
        _id: 2
    },
    {
        title: { fa: "فرانت اند", en: "Front-end" },
        subSections: [
            { title: { fa: "امنیت2", en: "Security2" }, type: { fa: "درس", en: "Lecture" }, _id: 7 },
            { title: { fa: "2احراز هویت", en: "Authentication2" }, type: { fa: "درس", en: "Lecture" }, _id: 8 },

        ],
        _id: 3
    }
]

const Curriculum = () => {
    const { t } = useTranslation("common")
    const router = useRouter()
    const isEnglish = router.locale === "en"

    const numberOfSubSectionsOfPreviousSections = useMemo(() => {
        let numberOfSubSectionsOfPreviousSections: number[] = [0]
        for (let i = 1; i < sections.length; i++) {
            numberOfSubSectionsOfPreviousSections.push(sections[i - 1].subSections.length + numberOfSubSectionsOfPreviousSections[i - 1])
        }
        return numberOfSubSectionsOfPreviousSections
    }, [sections])

    return (
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
    )
}


export default Curriculum