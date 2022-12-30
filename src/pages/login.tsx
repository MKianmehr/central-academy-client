import React from 'react'
import Login from '../components/pages/Login'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const login = () => {
    return (
        <Login />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale ? locale : "fa", ["common"]))
        }
    }
}

export default login