import React from 'react'
import { useRouter } from 'next/router'

// Utils Import
import isRtl from '../../../utils/isRtl'

// Styles Import
import styles from './styles.module.scss'


const LinearProgress: React.FC<{ value: number, height?: string, borderRadius?: string }> = ({ value, height, borderRadius }) => {
    const router = useRouter()
    const rtl = isRtl(router.locale as string)
    return (
        <span className={styles.container} style={{ height, borderRadius }}>
            <span className={styles.child} style={{ transform: `translateX(${rtl ? (100 - value) : -(100 - value)}%)` }}></span>
        </span>
    )
}

export default LinearProgress