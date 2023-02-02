import React from 'react'
import Register from '../components/pages/Register'
import { NextPage } from 'next'
import axios from 'axios'

const register: NextPage = () => {
    return (
        <Register />
    )
}

register.getInitialProps = async (context) => {
    const { req, res } = context
    if (req) {
        try {
            const { data } = await axios.get("http://localhost:3000/auth/isloggedin", {
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