import React, { useCallback } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Image Import
import PlaceHolder from '../../../../public/images/InstructorCourseplaceholder.jpg'

// Components Import
import LinearProgress from '../LinearProgress'

// Mui Import
import { Button } from '@mui/material'

// Styles Import
import styles from './styles.module.scss'

const InstructorCourseCard = () => {
    const router = useRouter()

    const onEditClick = useCallback(() => {
        router.push({
            pathname: "/instructor/course/edit/curriculum",
            query: {
                courseId: "rbrgbvrg"
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
                    <div>Titldvnvkjdndkjvndjvkdn vdvjdkvjdvndjvndjkvdvnjdvne</div>
                    <div className={styles.draftPublic}>
                        <span>Draft</span>
                        <span>Public</span>
                    </div>
                </div>
                <div className={styles.progress}>
                    <div>Finish your course</div>
                    <div className={styles.progressBar}>
                        <LinearProgress value={50} height={"8px"} borderRadius={"5px"} />
                    </div>
                </div>
                {/* Edit on Hover */}
                <Button className={styles.edit} onClick={onEditClick}>
                    Edit / Manage course
                </Button>
            </div>
        </div >
    )
}

export default InstructorCourseCard