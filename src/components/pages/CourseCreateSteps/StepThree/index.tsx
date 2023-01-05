import React from 'react'
import { StepThreeProp } from '../../../../models/Props'
import styles from './styles.module.scss'

const StepThree = ({ children }: StepThreeProp) => {
    return (
        <div className={styles.container}>
            <div className={styles.createBox}>
                {children}

            </div>
        </div>
    )
}

export default StepThree