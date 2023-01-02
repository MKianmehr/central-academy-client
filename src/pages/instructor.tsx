import React from 'react'
import Instructor from '../components/pages/Instructor';
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const instructor = () => {
    return (
        <Instructor />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : "fa", ["common"]))
        }
    }
}

export default instructor