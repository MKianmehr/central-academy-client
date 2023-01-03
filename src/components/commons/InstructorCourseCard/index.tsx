import React from 'react'
import styles from './styles.module.scss';
import Image from 'next/image';
import Rating from '@mui/material/Rating';
import Height16 from '../Height16'
import { InstructorCourseCardProp } from '../../../models/Props';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';


const InstructorCourseCard = ({ title, src, rate, numberOfRate, numberOfStudent }: InstructorCourseCardProp) => {
    const { t } = useTranslation("common")
    const router = useRouter()
    return (
        <Link href="" style={{ textDecorationLine: "none" }}>
            <div className={styles.container}>
                <Image
                    src={src}
                    alt=""
                    width={1000}
                    height={1000}
                    style={{
                        maxWidth: '100%',
                        height: 'auto',
                    }} />
                <Height16 />
                <h6 className={styles.title}>{router.locale === "fa" ? title.fa : title.en}</h6>
                <div className={styles.numbers}>
                    <div className={styles.numberOfStudents}>
                        <div>{t("Number of students")}</div>
                        <div>{numberOfStudent}</div>
                    </div>
                    <div className={styles.rateContainer}>
                        <div>{t("rate")}</div>
                        <div className={styles.rateValue}>
                            <div className={styles.value}>{rate}</div>
                            <Rating value={rate} size="small" readOnly />
                            <div className={styles.rateNum}>{`(${numberOfRate})`}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default InstructorCourseCard