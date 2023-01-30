import React from 'react'
import { GetStaticProps, GetStaticPaths } from 'next'
import CourseCreateSteps from '../../../components/pages/CourseCreateSteps'

const Steps = () => {
    return (
        <CourseCreateSteps />
    )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
    return {
        props: {

        }
    }
}
export const getStaticPaths: GetStaticPaths = async () => {
    const steps = 4
    const paths = []
    for (let i = 1; i <= steps; i++) {
        paths.push({ params: { step: `${i}` }, locale: 'en' }, { params: { step: `${i}` }, locale: 'fa' },)
    }
    return {
        paths: paths,

        fallback: false, // can also be true or 'blocking'
    }
}

export default Steps