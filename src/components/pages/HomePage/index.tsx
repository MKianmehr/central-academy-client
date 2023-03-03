import React from 'react'
import useTranslation from "next-translate/useTranslation";

// Components Import
import Carousel from '../../commons/Carousel';

// Styles Import
import styles from './styles.module.scss'
import HomePageBanner from '../../commons/HomePageBanner';

const HomePage = () => {
    const { t } = useTranslation('common');
    return (
        <div className={styles.container}>
            <HomePageBanner />
            <div>
                <h4>Students are viewing</h4>

            </div>
        </div>
    )
}

export default HomePage