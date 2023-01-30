import React from 'react'
import EditCourse from '../../../../components/pages/EditCourse'
import { GetStaticProps } from 'next'

const Edit = () => {
    return (
        <EditCourse />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {

        }
    }
}

export async function getStaticPaths() {
    return {
        paths: [
            { params: { step: 'curriculum' }, locale: "en" },
            { params: { step: 'curriculum' }, locale: "fa" },
            { params: { step: '2' } }
        ],
        fallback: false, // can also be true or 'blocking'
    }
}

export default Edit