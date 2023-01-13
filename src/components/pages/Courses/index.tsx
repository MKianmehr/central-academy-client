import React, { useState } from 'react'
import MiniDrawer from '../../commons/MiniDrawer'
import { useRouter } from 'next/router';
import { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'next-i18next';
import NoCourseCard from '../../commons/NoCourseCard'
import SelectLabels from '../../commons/Select';
import SearchInput from '../../commons/SearchInput';
import LinkButton from '../../commons/LinkButton';
import InstructorCourseCard from '../../commons/InstructorCourseCard'
import styles from './styles.module.scss'
import { Divider } from '@mui/material';


const labels = [{ fa: "جدید ترین", en: "Newest" }, { fa: "پرفروش ترین", en: "Popular" }]
const images = [
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100, _id: 1 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100, _id: 2 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100, _id: 3 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100, _id: 4 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100, _id: 5 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100, _id: 6 },
    { src: "https://img-c.udemycdn.com/course/240x135/1178124_76bb_11.jpg", title: { fa: "دوره مبتدی تا پیشرفته C#", en: "C# 10 | Ultimate Guide - Beginner to Advanced | Master class" }, rate: 2.5, numberOfStudent: 500, numberOfRate: 100, _id: 7 }
]


const Courses = () => {
    const { t } = useTranslation("common")
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const [searchText, setSearchText] = useState('')
    const [value, setValue] = React.useState(labels[0]);
    const isEng = router.locale === "en"

    const onSearchSubmit = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }
    if (loading) {
        return <NoCourseCard />
    }

    const handleChange = (event: SelectChangeEvent) => {
        labels.forEach((label, index) => {
            if (event.target.value === (isEng ? label.en : label.fa)) {
                setValue(labels[index]);
            }
        });
    };

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
                            <SelectLabels minWidth={100} value={value} labels={labels} onChange={handleChange} />
                            <LinkButton href='/course/create/1' text={t("Create Your Course")} />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.courseContainer}>
                        {images.map((image) => {
                            return <InstructorCourseCard key={image._id} src={image.src} title={image.title} rate={image.rate} numberOfStudent={image.numberOfStudent} numberOfRate={image.numberOfRate} />
                        })}
                    </div>
                </div>
            </div>
        </MiniDrawer>
    )
}

export default Courses