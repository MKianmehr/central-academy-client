import React from 'react'
import { useRouter } from 'next/router'

// Enum Imports
import Locale from '../../../../utils/localeEnum'

// Styles Import
import styles from './styles.module.scss'

type Props = {}

const numbersList = [
    {
        amount: "57M",
        type: {
            fa: "دانشجو",
            en: "Students"
        },
    },
    {
        amount: "75+",
        type: {
            fa: "زبان",
            en: "Languages"
        },
    },
    {
        amount: "773M",
        type: {
            fa: "ثبت نام شده ها",
            en: "Enrollments"
        }
    },
]

const Numbers = (props: Props) => {
    const router = useRouter()
    const locale = router.locale as Locale

    return (
        <div className={styles.container}>
            {numbersList.map((option, index) => {
                return (
                    <div key={index} className={styles.option}>
                        <div>{option.amount}</div>
                        <p>{option.type[locale]}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default Numbers