import React from 'react'
import Image from 'next/image'

// Mui Import
import { Button } from '@mui/material'

// Styles Import
import styles from './styles.module.scss'

interface Banner {
    onClickButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    title: string;
    description: string;
    buttonText: string;
    imageAlt: string;
    imageSrc: string;
}
const Banner: React.FC<Banner> = ({ onClickButton, title, description, buttonText, imageAlt, imageSrc }) => {
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
                <Button onClick={onClickButton} className={styles.banner__button}>{buttonText}</Button>
            </div>
        </div>
    )
}

export default Banner