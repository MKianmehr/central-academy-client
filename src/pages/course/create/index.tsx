import React from 'react'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CourseCreate from '../../../components/pages/CourseCreate'

const index = () => {
    return (
        <CourseCreate />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : "fa", ["common"]))
        }
    }
}

export default index