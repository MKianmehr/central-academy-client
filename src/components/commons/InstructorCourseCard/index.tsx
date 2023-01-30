import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import useTranslation from "next-translate/useTranslation";

// Props Import
import { InstructorCourseCardProp } from '../../../models/Props';

// Components Imports
import Height16 from '../Height16'

// Mui Imports
import Rating from '@mui/material/Rating';

// Styles Import
import styles from './styles.module.scss';

const InstructorCourseCard = (
    { title, src, rate, numberOfRate, numberOfStudent }:
        InstructorCourseCardProp
) => {
    const { t } = useTranslation("common")
    return (
        <Link href="/instructor/course/edit/curriculum" style={{ textDecorationLine: "none" }}>
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
                <h6 className={styles.title}>{title}</h6>
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