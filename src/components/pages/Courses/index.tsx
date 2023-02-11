import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";
import Skeleton from '@mui/material/Skeleton';

// Components Import
import MiniDrawer from '../../commons/MiniDrawer'
import NoCourseCard from '../../commons/NoCourseCard'
import SelectLabels from '../../commons/Select';
import SearchInput from '../../commons/SearchInput';
import LinkButton from '../../commons/LinkButton';
import InstructorCourseCard from '../../commons/InstructorCourseCard'

// Mui Imports
import { SelectChangeEvent } from '@mui/material/Select';
import { Divider } from '@mui/material';

// Context Import
import { GlobalContext } from '../../../contexts';

// Redux Import
import { useAppSelector } from '../../../redux/hooks';

// Styles Import
import styles from './styles.module.scss'


const labels = [{ fa: "جدید ترین", en: "Newest" }, { fa: "پرفروش ترین", en: "Popular" }]


const Courses = () => {

    const { t } = useTranslation("common")
    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState('')
    const [value, setValue] = React.useState(labels[0]);
    const courses = useAppSelector(state => state.courses)

    const { getCourses } = useContext(GlobalContext)

    const router = useRouter()
    const isEng = router.locale === "en"

    const handleLoading = useCallback((loading: boolean) => {
        setLoading(loading)
    }, [])

    useEffect(() => {
        getCourses(handleLoading)
    }, [])

    const onSearchSubmit = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(e.target.value)
    }, [])

    const handleChange = useCallback((event: SelectChangeEvent) => {
        labels.forEach((label, index) => {
            if (event.target.value === (isEng ? label.en : label.fa)) {
                setValue(labels[index]);
            }
        });
    }, [isEng, labels])

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
                            <LinkButton href='/course/create' text={t("Create Your Course")} />
                        </div>
                    </div>
                    <Divider />
                    <div className={styles.courseContainer}>
                        {loading && (
                            <div className={styles.loading}>
                                <Skeleton variant="rectangular" width={"90%"} height={80} />
                                <Skeleton variant="rectangular" width={"90%"} height={80} />
                                <Skeleton variant="rectangular" width={"90%"} height={80} />
                            </div>
                        )}
                        {!loading && (
                            courses.length == 0 ? <NoCourseCard /> : courses.map((course) => {
                                return <InstructorCourseCard key={course._id} course={course} />
                            })
                        )}
                    </div>
                </div>
            </div>
        </MiniDrawer>
    )
}

export default Courses