import React from 'react'
import Login from '../components/pages/Login'
import { NextPage } from 'next'
import axios from 'axios'
import SwipeableTempDrawer from '../components/commons/SwipeableTempDrawer'
import NavBar from '../components/commons/Navbar'

const login: NextPage = () => {
    return (
        <>
            <SwipeableTempDrawer />
            <NavBar />
            <Login />
        </>
    )
}

login.getInitialProps = async (context) => {
    const { req, res } = context
    if (req) {
        try {
            const response = await axios.get("http://nginx/api/auth/isloggedin", {
                withCredentials: true,
                headers: req.headers
            })
            res?.writeHead(302, { Location: '/' })
            res?.end()
        } catch (e) {
        }
    }
}


export default login