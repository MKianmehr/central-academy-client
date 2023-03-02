import React from 'react'
import styles from './styles.module.scss'
import TeachingReasons from './TeachingReasons'
import Numbers from './Numbers'
import Banner from '../../commons/Banner'
import { useRouter } from 'next/router'
import { useAppSelector } from '../../../redux/hooks'
import useTranslation from "next-translate/useTranslation";

const Teaching = () => {
    const { t } = useTranslation('common');
    const router = useRouter()
    const user = useAppSelector(state => state.user)
    const becomeInstructor = async () => {

        if (Object.keys(user).length == 0) {
            router.push('/login', {
                query: { redirect: 'instructor/courses' }
            })
        } else {
            router.push('/teaching/onBoarding')
        }
    }



    return (
        <div className={styles.container}>
            <Banner
                onClickButton={becomeInstructor}
                title={t("Come teach with us")}
                description={t("become an instructor and change lives including your own")}
                buttonText={t("Get started")}
                imageAlt={t("teaching banner")}
                imageSrc='https://s.udemycdn.com/teaching/billboard-desktop-v4.jpg'
            />
            <TeachingReasons />
            <Numbers />
        </div>
    )
}

export default Teaching