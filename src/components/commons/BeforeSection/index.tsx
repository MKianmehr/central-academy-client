import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/router';

// components imports
import AddSection from '../AddSection';

// mui imports
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// styles import
import styles from './styles.module.scss'



const AddBeforeSection = () => {

    const [active, setActive] = useState(false)
    const router = useRouter()
    const isRTL = router.locale === "fa"

    const onClick = useCallback(() => {
        setActive(!active)
    }, [active])

    return (
        <div
            className={
                [styles.container, active && styles.active]
                    .join(" ")
            }
        >
            <button onClick={onClick} className={[styles.before__button, isRTL && styles.square_rtl].join(" ")}>
                <AddOutlinedIcon className={[styles.multi].join(" ")} />
            </button>
            {active && <AddSection onClick={onClick} />}
        </div>
    )
}

export default AddBeforeSection