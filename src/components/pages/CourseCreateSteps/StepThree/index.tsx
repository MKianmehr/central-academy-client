import React, { useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { StepThreeProp } from '../../../../models/Props'
import Link from 'next/link';
import { Button } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';
import SelectLabels from '../../../commons/Select';
import styles from './styles.module.scss'

const StepThree = ({ children }: StepThreeProp) => {
    const labels = [{ fa: "یک دسته بندی را انتخاب کنید", en: "Choose a category" }, { fa: "آی تی و نرم افزار", en: "It & software" }]
    const { t } = useTranslation("common")
    const [value, setValue] = useState(labels[0]);
    const router = useRouter()
    const isEng = router.locale === "en"

    const onNextClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

        if (labels[0].en !== value.en) {
            router.push('/course/create/4')
        }
    }

    const handleChange = (event: SelectChangeEvent) => {
        labels.forEach((label, index) => {
            if (event.target.value === (isEng ? label.en : label.fa)) {
                setValue(labels[index]);
            }
        });
    };
    return (
        <div className={styles.container}>
            <div className={styles.createBox}>
                {children}
                <div className={styles.questionsBox}>
                    <div>
                        <h3 className={styles.title}>{t("question step three")}</h3>
                        <p className={styles.okay}>{t("course-create-step3-it's okay")}</p>
                    </div>
                    <div className={styles.select}>
                        <SelectLabels height="50px" value={value} labels={labels} minWidth={200} maxWidth={700} onChange={handleChange} />
                    </div>
                    <div className={styles.buttons}>
                        <div>
                            <Link href="/course/create/2"> <Button variant="outlined">{t("previous")}</Button></Link>
                            <Link href="/instructor/courses"> <Button variant="outlined">{t("exit")}</Button></Link>
                        </div>
                        <Button onClick={onNextClick} variant="outlined">{t("next")}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default StepThree