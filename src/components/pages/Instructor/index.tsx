import React from 'react'
import MiniDrawer from '../../commons/MiniDrawer'
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss'

const Instructor = () => {
    const { t } = useTranslation("common")
    return (
        <MiniDrawer>
            <div className={styles.container}>Instructor</div>
        </MiniDrawer>
    )
}

export default Instructor