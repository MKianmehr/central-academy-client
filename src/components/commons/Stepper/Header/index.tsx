import React from 'react'
import useTranslation from "next-translate/useTranslation";

// Components Import
import LinearProgress from '../../LinearProgress';

// MUI imports
import { Button } from '@mui/material'

// Styles Import
import styles from './styles.module.scss'

const StepperHeader: React.FC<{ currentIndex: number; lastIndex: number; onExitClick: () => void }> = ({ currentIndex, lastIndex, onExitClick }) => {
    const { t } = useTranslation('common');

    return (
        <div className={styles.header}>
            <div className={styles.header__content}>
                <div className={styles.wName}><span>C</span>Academy</div>
                <div className={styles.breakLine}></div>
                <div className={styles.stepExit}>
                    <div>
                        {t("step")} {currentIndex} {t("of")} {lastIndex}
                    </div>
                    <div>
                        <Button onClick={onExitClick} className={styles.exit}>
                            {t("exit")}
                        </Button>
                    </div>
                </div>
            </div>
            <LinearProgress value={(currentIndex / lastIndex) * 100} />
        </div>
    )
}

export default StepperHeader