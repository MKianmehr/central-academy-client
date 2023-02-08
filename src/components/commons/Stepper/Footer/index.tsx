import React from 'react'
import useTranslation from "next-translate/useTranslation";

// MUI Imports
import { Button } from '@mui/material'

// Styles Import
import styles from './styles.module.scss'

interface StepperFooterInterface {
    currentIndex: number;
    onNextClick: () => void;
    onPreviousClick: () => void;
    loading: boolean;
}
const StepperFooter: React.FC<StepperFooterInterface> = ({ currentIndex, onNextClick, onPreviousClick, loading }) => {
    const { t } = useTranslation('common');
    return (
        <div className={styles.container}>
            {(currentIndex !== 1) && (
                <div>
                    <Button className={styles.previous} onClick={onPreviousClick}>{t("previous")}</Button>
                </div>
            )}
            <div className={[styles.next, loading && styles.loading].join(" ")}>
                <Button onClick={onNextClick}>{t("next")}</Button>
            </div>
        </div>
    )
}

export default StepperFooter