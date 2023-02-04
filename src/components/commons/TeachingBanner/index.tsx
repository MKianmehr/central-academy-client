import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'
import { Button } from '@mui/material'

const TeachingBanner = () => {
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
                <Button className={styles.banner__button}>Get started</Button>
            </div>
        </div>
    )
}

export default TeachingBanner