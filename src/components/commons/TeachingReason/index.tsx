import React from 'react'
import styles from './styles.module.scss'
import Image from 'next/image'

const TeachingReason: React.FC<{ src: string; title: string; paragraph: string; alt: string }> = ({ src, title, paragraph, alt }) => {
    return (
        <div className={styles.reason}>
            <div>
                <Image
                    src={src}
                    width={100}
                    height={100}
                    alt={alt}
                />
            </div>
            <div className={styles.reason__title}>{title}</div>
            <div className={styles.reason__paragraph}>{paragraph}</div>
        </div>
    )
}

export default TeachingReason