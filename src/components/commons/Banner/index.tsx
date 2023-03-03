import React from 'react'
import Image from 'next/image'

// Mui Import
import { Button } from '@mui/material'

// Styles Import
import styles from './styles.module.scss'
import Link from 'next/link';

interface Banner {
    href: string;
    title: string;
    description: string;
    buttonText: string;
    imageAlt: string;
    imageSrc: string;
}
const Banner: React.FC<Banner> = ({ href, title, description, buttonText, imageAlt, imageSrc }) => {
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.banner}>
                <Image
                    src={imageSrc}
                    alt={imageAlt}
                    className={styles.banner__image}
                    fill={true}
                />
            </div>
            <div className={styles.banner__text}>
                <h1>{title}</h1>
                <p>{description}</p>
                <Link href={href} className={styles.banner__button}>{buttonText}</Link>
            </div>
        </div>
    )
}

export default Banner