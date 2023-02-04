import React from 'react'
import ForgetPassword from '../../../components/pages/ForgetPassword'
import { NextPage } from 'next'
import axios from 'axios'
import SwipeableTempDrawer from '../../../components/commons/SwipeableTempDrawer'
import NavBar from '../../../components/commons/Navbar'

const index: NextPage = () => {
    return (
        <>
            <SwipeableTempDrawer />
            <NavBar />
            <ForgetPassword />
        </>
    )
}

index.getInitialProps = async (context) => {
    const { req, res } = context
    if (req) {
        try {
            const response = await axios.get("http://localhost:3000/auth/isloggedin", {
                withCredentials: true,
                headers: req.headers
            })
            res?.writeHead(302, { Location: '/' })
            res?.end()
        } catch (e) { }
    }
}

export default index
