import React from 'react'
import { IconButton } from '@mui/material'
import { useTranslation } from 'next-i18next';
import SettingsIcon from '@mui/icons-material/Settings';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Curriculum from './Curriculum'
import MenuEditCourse from '../../commons/MenuEditCourse'
import styles from './styles.module.scss'


const lists = [
    {
        header: { fa: "برنامه ریزی دوره", en: "Plan your course" },
        sublists: [
            { link: "#", text: { fa: "دانشجوهای مدنظر", en: "Intended learners" } },
            { link: "#", text: { fa: "ساختار دوره", en: "Course structure" } },
            { link: "#", text: { fa: "تنظیم و تست ویدیو", en: "Setup & test video" } }
        ]
    },
    {
        header: { fa: "ساخت محتوا", en: "Create your content" },
        sublists: [
            { link: "#", text: { fa: "فیلم و ویرایش", en: "Film & edit" } },
            { link: "/instructor/course/edit/curriculum", text: { fa: "برنامه درسی", en: "Curriculum" } }
        ]
    },
    {
        header: { fa: "انتشار دوره", en: "Publish your course" },
        sublists: [
            { link: "#", text: { fa: "پوستر دوره", en: "Course landing page" } },
            { link: "#", text: { fa: "قیمت", en: "Price" } }
        ]
    }
]

const EditCourse = () => {
    const router = useRouter()
    const { t } = useTranslation("common")
    const isEnglish = router.locale === "en"
    const step = router.query.step

    const WhichStep = () => {
        switch (step) {
            case "curriculum":
                return (
                    <Curriculum />
                )
            case "2":
                return (
                    <></>
                )
            case "3":
                return (
                    <></>
                )
            case "4":
                return (
                    <></>
                )
            default:
                return <></>

        }
    }

    return (
        <div className={styles.container}>
            <nav className={styles.navbar}>
                <div className={styles.statusContainer}>
                    <Link href="/instructor/courses">
                        {isEnglish ? <ArrowBackIosIcon /> : <ArrowForwardIosIcon />}
                        {t("Back to Course")}
                    </Link>
                    <span className={styles.divider}></span>
                    <span className={styles.status}> {t("status")} <span>( {t("Draft")} )</span></span>
                </div>
                <div>
                    <IconButton className={styles.settings}>
                        <SettingsIcon />
                    </IconButton>
                </div>
            </nav>
            <main className={styles.main}>
                <MenuEditCourse lists={lists} />
                <div className={[styles.content, !isEnglish && styles.content_rtl].join(" ")}>
                    {WhichStep()}
                </div>
            </main>
        </div>
    )
}

export default EditCourse