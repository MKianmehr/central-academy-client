import React from 'react'
import Image from 'next/image'
import { useRouter } from 'next/router'

// Mui imports
import { Button } from '@mui/material'

// Redux Import
import { useAppSelector } from '../../../redux/hooks'

// Styles Import
import styles from './styles.module.scss'

const TeachingBanner = () => {
    const router = useRouter()
    const user = useAppSelector(state => state.user)
    const becomeInstructor = async () => {

        if (Object.keys(user).length == 0) {
            router.push('/login', {
                query: { redirect: 'instructor/courses' }
            })
        } else {
            router.push('/teaching/onBoarding')
        }
    }

    return (
        <div className={styles.bannerContainer}>
            <div className={styles.banner}>
                <Image
                    src={"https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg"}
                    alt='teach with us'
                    className={styles.banner__image}
                    fill={true}
                />
            </div>
            <div className={styles.banner__text}>
                <h1>Come teach with us</h1>
                <p>become an instructor and change lives including your own</p>
                <Button onClick={becomeInstructor} className={styles.banner__button}>Get started</Button>
            </div>
        </div>
    )
}

export default TeachingBanner