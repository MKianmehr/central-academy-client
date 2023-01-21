import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';

// import contexts
import AddSubSection from '../AddSubSection';

// import styles
import styles from './styles.module.scss';


const BeforeSubSection = () => {

    const [hoverButtonActive, setHoverButtonActive] = useState(false)

    const router = useRouter()
    const isRtl = router.locale === "fa"

    const handleHoverButton = useCallback((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setHoverButtonActive(!hoverButtonActive)
    }, [hoverButtonActive])

    return (
        <div
            className={
                [styles.container, hoverButtonActive && styles.active]
                    .join(" ")
            }
        >
            <button onClick={handleHoverButton} className={styles.hoverButton}>
                <span className={[isRtl ? styles.square_rtl : styles.square, hoverButtonActive && styles.square_active].join(" ")}></span>
                <span className={[isRtl ? styles.mult_rtl : styles.mult, hoverButtonActive && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}></span>
            </button>
            {hoverButtonActive && <AddSubSection />}
        </div>
    )
}

export default BeforeSubSection