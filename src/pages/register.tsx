import React from 'react'
import Register from '../components/pages/Register'
import { NextPage } from 'next'
import axios from 'axios'
import SwipeableTempDrawer from '../components/commons/SwipeableTempDrawer'
import NavBar from '../components/commons/Navbar'

const register: NextPage = () => {
    return (
        <>
            <SwipeableTempDrawer />
            <NavBar />
            <Register />
        </>
    )
}

register.getInitialProps = async (context) => {
    const { req, res } = context
    if (req) {
        try {
            const { data } = await axios.get("http://nginx/api/auth/isloggedin", {
                withCredentials: true,
                headers: req.headers
            })
            res?.writeHead(302, { Location: '/' })
            res?.end()
        } catch (e) {
        }
    }
}

export default register