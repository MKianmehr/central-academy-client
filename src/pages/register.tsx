import React from 'react'
import Register from '../components/pages/Register'
import { GetServerSideProps } from 'next'
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

export default register