import React from 'react'
import styles from './styles.module.scss'
import TeachingBanner from '../../commons/TeachingBanner'
import TeachingReasons from './TeachingReasons'
import Numbers from './Numbers'

const Teaching = () => {



    return (
        <div className={styles.container}>
            <TeachingBanner />
            <TeachingReasons />
            <Numbers />
        </div>
    )
}

export default Teaching