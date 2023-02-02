import React from 'react'
import { NextPage } from 'next'
import CourseCreateSteps from '../../../components/pages/CourseCreateSteps'

const Steps: NextPage = () => {
    return (
        <CourseCreateSteps />
    )
}

Steps.getInitialProps = async ({ req, res }) => {
    if (req) {
        res?.writeHead(302, { Location: '/instructor/courses' })
        res?.end()
    }
}

export default Steps