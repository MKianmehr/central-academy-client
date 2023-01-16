import React, { useState } from 'react'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import InputsForAddSection from '../InputForAddSection';



const BeforeSection = () => {
    const [active, setActive] = useState(false)
    const router = useRouter()
    const isRTL = router.locale === "fa"

    const onClick = () => {
        setActive(!active)
    }

    return (
        <div className={[styles.before, active && styles.before__active].join(" ")}>
            <button onClick={onClick} className={[styles.before__button, isRTL && styles.square_rtl].join(" ")}>
                <AddOutlinedIcon className={[styles.multi].join(" ")} />
            </button>
            {active && <InputsForAddSection onClick={onClick} />}
        </div>
    )
}

export default BeforeSection