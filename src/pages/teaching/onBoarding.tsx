import React from 'react'
import { GetServerSideProps } from 'next'
import axios from 'axios'

// Components Import
import TeachingOnBoarding from '../../components/pages/TeachingOnBoarding'

const onBoarding = () => {
    return (
        <TeachingOnBoarding />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context
    try {
        const response = await axios.get("http://nginx/api/auth/is-instructor", {
            withCredentials: true,
            headers: req.headers
        })

        res?.writeHead(302, { Location: '/instructor/courses' })
        res?.end()
    } catch (e) {
    }

    return {
        props: {}
    }
}
export default onBoarding