import React from 'react'
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss'
import LinkButton from '../LinkButton';
import Link from 'next/link'

const index = () => {
    const { t } = useTranslation("common")
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h6>{t("Jump into Course Creation")}</h6>
                <LinkButton href='/course/create' text={t("Create Your Course")} />
            </div>
        </div>
    )
}

export default index