import React from 'react'
import Register from '../components/pages/Register'
import { GetServerSideProps } from 'next'

const register = () => {
    return (
        <Register />
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


export default register