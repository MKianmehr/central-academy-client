import React from 'react'
import Login from '../components/pages/Login'
import { NextPage } from 'next'
import axios from 'axios'

const login: NextPage = () => {
    return (
        <Login />
    )
}

login.getInitialProps = async (context) => {
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


export default login