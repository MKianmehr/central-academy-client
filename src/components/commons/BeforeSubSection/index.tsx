import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';

// Components Import
import AddSubSection from '../AddSubSection';

// Mui Imports
import AddIcon from '@mui/icons-material/Add';

// import styles
import styles from './styles.module.scss';


const BeforeSubSection = ({ index }: { index: number }) => {

    const [hoverButtonActive, setHoverButtonActive] = useState(false)

    const router = useRouter()
    const isRtl = router.locale === "fa"


    const handleHoverButton = useCallback(() => {
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
                <span className={[isRtl ? styles.square_rtl : styles.square, hoverButtonActive && (isRtl ? styles.square_active_rtl : styles.square_active)].join(" ")}></span>
                <div className={[isRtl ? styles.mult_rtl : styles.mult, hoverButtonActive && (isRtl ? styles.mult_active_rtl : styles.mult_active)].join(" ")}>
                    <AddIcon fontSize="large" />
                </div>
            </button>
            {hoverButtonActive && <AddSubSection closeBeforeSubSection={handleHoverButton} index={index} />}
        </div>
    )
}

export default BeforeSubSection