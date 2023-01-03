import React from 'react'
import Courses from '../../../components/pages/Courses';
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const courses = () => {
    return (
        <Courses />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : "fa", ["common"]))
        }
    }
}

export default courses