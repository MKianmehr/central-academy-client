import React from 'react'
import { NextPage } from 'next'
import Courses from '../../../components/pages/Courses';
import axios from 'axios';

const courses: NextPage = () => {
    return (
        <Courses />
    )
}

courses.getInitialProps = async ({ req, res, pathname }) => {
    if (req) {
        try {
            const response = await axios.get("http://localhost:3000/auth/isloggedin", {
                withCredentials: true,
                headers: req.headers
            })
        } catch (e) {
            res?.writeHead(302, { Location: "/login?redirect=" + encodeURIComponent(pathname) })
            res?.end()
        }
    }
}


export default courses