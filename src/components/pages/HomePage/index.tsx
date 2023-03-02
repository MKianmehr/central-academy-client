import React from 'react'
import useTranslation from "next-translate/useTranslation";

// Components Import
import Carousel from '../../commons/Carousel';

// Styles Import
import styles from './styles.module.scss'

const HomePage = () => {
    const { t } = useTranslation('common');
    const onClickBannerButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { }

    const banners = [
        {
            imageSrc: "https://c-academy.s3.eu-west-3.amazonaws.com/2a5f5839-c80b-4fbf-bc37-dab9912c8290.png",
            imageAlt: t("homepage-banner-image-alt"),
            title: t("homepage-banner-title"),
            description: t("homepage-banner-description"),
            buttonText: t("homepage-banner-button-text"),
            onClick: onClickBannerButton
        },
        {
            imageSrc: "https://c-academy.s3.eu-west-3.amazonaws.com/2a5f5839-c80b-4fbf-bc37-dab9912c8290.png",
            imageAlt: t("homepage-banner-image-alt"),
            title: t("homepage-banner-title"),
            description: t("homepage-banner-description"),
            buttonText: t("homepage-banner-button-text"),
            onClick: onClickBannerButton
        }
    ]

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <Carousel banners={banners} />
            </div>
        </div>
    )
}

export default HomePage