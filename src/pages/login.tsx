import React from 'react'
import Login from '../components/pages/Login'
import { GetServerSideProps } from 'next'
import axios from 'axios'

const login = () => {
    return (
        <Login />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    try {
        const { data } = await axios.get("http://localhost:3000/auth/whoami", {
            withCredentials: true,
            headers: context.req.headers
        })
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    } catch (e) {
        return {
            props: {}
        }
    }
}

export default login