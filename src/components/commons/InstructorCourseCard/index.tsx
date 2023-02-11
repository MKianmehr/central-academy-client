import React, { useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from "next-translate/useTranslation";

// Props Import
import { CourseInterface } from '../../../models/Props'

// Image Import
import PlaceHolder from '../../../../public/images/InstructorCourseplaceholder.jpg'

// Components Import
import LinearProgress from '../LinearProgress'

// Mui Import
import { Button } from '@mui/material'

// Styles Import
import styles from './styles.module.scss'

const InstructorCourseCard: React.FC<{ course: CourseInterface }> = ({ course }) => {
    const router = useRouter()
    const { t } = useTranslation("common")

    const onEditClick = useCallback(() => {
        router.push({
            pathname: "/instructor/course/edit/curriculum",
            query: {
                courseId: course._id,
            }
        })
    }, [])

    return (
        <div className={styles.container}>
            <div>
                <Image src={PlaceHolder} alt='course' height={118} width={118} />
            </div>
            <div className={styles.content}>
                <div className={styles.titleDraft}>
                    <div>{course.name}</div>
                    <div className={styles.draftPublic}>
                        <span>{course.published ? "Published" : "Draft"}</span>
                        <span>Public</span>
                    </div>
                </div>
                <div className={styles.progress}>
                    <div>{t("Finish your course")}</div>
                    <div className={styles.progressBar}>
                        <LinearProgress value={50} height={"8px"} borderRadius={"5px"} />
                    </div>
                </div>
                {/* Edit on Hover */}
                <Button className={styles.edit} onClick={onEditClick}>
                    {t("Edit / Manage course")}
                </Button>
            </div>
        </div >
    )
}

export default InstructorCourseCard