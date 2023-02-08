import React from 'react'
import { NextPage, GetServerSideProps } from 'next'
import axios from 'axios'

// Components Import
import Teaching from '../../components/pages/Teaching'
import SwipeableTempDrawer from '../../components/commons/SwipeableTempDrawer'
import NavBar from '../../components/commons/Navbar'

const teaching: NextPage = () => {
    return (
        <>
            <SwipeableTempDrawer />
            <NavBar />
            <Teaching />
        </>
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

export default teaching