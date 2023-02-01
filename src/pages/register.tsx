import React from 'react'
import Register from '../components/pages/Register'
import { GetServerSideProps } from 'next'
import axios from 'axios'

const register = () => {
    return (
        <Register />
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


export default register