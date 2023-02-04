import React from 'react'
import styles from './styles.module.scss'
import { useRouter } from 'next/router'

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

export enum Locale {
    FA = "fa",
    EN = "en"
}
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