import React, { useState } from 'react'
import MiniDrawer from '../../commons/MiniDrawer'
import { useTranslation } from 'next-i18next';
import NoCourseCard from '../../commons/NoCourseCard'
import SelectLabels from '../../commons/Select';
import SearchInput from '../../commons/SearchInput';
import LinkButton from '../../commons/LinkButton';
import InstructorCourseCard from '../../commons/InstructorCourseCard'
import styles from './styles.module.scss'
import { Divider } from '@mui/material';


const labels = ["newest"]
const images = [
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100 }
]


const Courses = () => {
    const { t } = useTranslation("common")
    const [loading, setLoading] = useState(false)
    const [searchText, setSearchText] = useState('')

    const onSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }
    if (loading) {
        return <NoCourseCard />
    }
    return (
        <MiniDrawer>
            <div className={styles.container}>
                <div className={styles.courses}>
                    <div className={styles.header}>
                        <div className={styles.header_input}>
                            <h3 className={styles.title}>{t("Courses")}</h3>
                            <SearchInput placeHolder={t("search your courses")} value={searchText} onChange={onSearchSubmit} className={styles.input} />
                        </div>
                        <div className={styles.header_createCourse}>
                            <SelectLabels labels={labels} />
                            <LinkButton href='' text={t("Create Your Course")} />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.courseContainer}>
                        {images.map((image) => {
                            return <InstructorCourseCard src={image.src} title={image.title} rate={image.rate} numberOfStudent={image.numberOfStudent} numberOfRate={image.numberOfRate} />
                        })}
                    </div>
                </div>
            </div>
        </MiniDrawer>
    )
}

export default Courses