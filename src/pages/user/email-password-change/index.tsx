import React from 'react'
import { NextPage } from 'next'
import EmailPasswordChange from '../../../components/pages/EmailPasswordChange'
import axios from 'axios'

const index: NextPage = () => {
    return (
        <EmailPasswordChange />
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