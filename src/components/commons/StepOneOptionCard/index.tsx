import React from 'react'

// Props Import
import { StepOneOptionCardProp } from '../../../models/Props'

// Styles Import
import styles from './styles.module.scss'

const index = ({ icon, type, description, isActive, onClick, index }: StepOneOptionCardProp) => {
    return (
        <div
            onClick={() => {
                onClick(index)
            }}
            className={[styles.option, isActive && styles.active].join(" ")}
        >
            {icon}
            <div className={styles.type}>{type}</div>
            <div>{description}</div>
        </div>
    )
}

export default index