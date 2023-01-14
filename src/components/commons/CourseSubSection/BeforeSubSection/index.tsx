import React, { useState } from 'react'
import SubSectionCreationContent from '../../SubSectionCreationContent';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';


const BeforeSubSection = () => {
    const router = useRouter()
    const isRtl = router.locale === "fa"
    const [hoverButtonActive, setHoverButtonActive] = useState(false)

    const handleHoverButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setHoverButtonActive(!hoverButtonActive)
    }
    return (
        <div className={[styles.before, hoverButtonActive && styles.before_active].join(" ")}>
            <button onClick={handleHoverButton} className={styles.hoverButton}>
                <span className={[isRtl ? styles.square_rtl : styles.square, hoverButtonActive && styles.square_active].join(" ")}></span>
                <span className={[isRtl ? styles.mult_rtl : styles.mult, hoverButtonActive && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}></span>
            </button>
            {hoverButtonActive && <SubSectionCreationContent />}
        </div>
    )
}

export default BeforeSubSection