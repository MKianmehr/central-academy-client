import React, { useCallback, useContext, useState } from 'react'
import { useRouter } from 'next/router';

// components imports
import AddSection from '../AddSection';

// mui imports
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';

// Context Imports
import { SectionContext } from '../../../contexts';

// styles import
import styles from './styles.module.scss'



const AddBeforeSection = () => {

    const [active, setActive] = useState(false)
    const router = useRouter()
    const isRTL = router.locale === "fa"

    const { index } = useContext(SectionContext)

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
            {active && <AddSection index={index} onClick={onClick} />}
        </div>
    )
}

export default AddBeforeSection