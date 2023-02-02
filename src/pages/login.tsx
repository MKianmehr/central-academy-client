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
            const { data } = await axios.get("http://localhost:3000/auth/whoami", {
                withCredentials: true,
                headers: req.headers
            })
            res?.setHeader('set-cookie', `user=${JSON.stringify(data)}`)
            res?.writeHead(302, { Location: '/' })
            res?.end()
        } catch (e) {
        }
    }
}


export default login