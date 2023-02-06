import React from 'react'
import { NextPage } from 'next'
import EmailPasswordChange from '../../../components/pages/EmailPasswordChange'
import axios from 'axios'
import SwipeableTempDrawer from '../../../components/commons/SwipeableTempDrawer'
import NavBar from '../../../components/commons/Navbar'

const index: NextPage = () => {
    return (
        <>
            <SwipeableTempDrawer />
            <NavBar />
            <EmailPasswordChange />
        </>
    )
}

index.getInitialProps = async (context) => {
    const { req, res } = context
    if (req) {
        try {
            const response = await axios.get("http://nginx/api/auth/isloggedin", {
                withCredentials: true,
                headers: req.headers
            })
            res?.writeHead(302, { Location: '/' })
            res?.end()
        } catch (e) { }
    }
}

export default index