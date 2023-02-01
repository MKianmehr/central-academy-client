import React from 'react'
import Login from '../components/pages/Login'
import { GetServerSideProps } from 'next'

const login = () => {
    return (
        <Login />
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    if (context.req.cookies.session) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    } else {
        return {
            props: {}
        }
    }

}

export default login