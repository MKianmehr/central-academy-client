import React from 'react'
import { NextPage } from 'next'
import EditCourse from '../../../../components/pages/EditCourse'
import axios from 'axios'
import { CourseInterface } from '../../../../models/Props'

const Edit: NextPage<{ data: CourseInterface | undefined }> = ({ data }) => {
    return (
        <EditCourse data={data} />
    )
}

Edit.getInitialProps = async (context) => {
    const { req, res, query } = context
    if (req) {
        try {
            if (!query.courseId) {
                res?.writeHead(302, { Location: '/instructor/courses' })
                res?.end()
            }
            const response = await axios.get(`http://nginx/api/course/get-course?courseId=${query.courseId}`, {
                withCredentials: true,
                headers: req.headers
            })
            return {
                data: response.data as CourseInterface
            }
        } catch (e) {
            res?.writeHead(302, { Location: '/instructor/courses' })
            res?.end()
        }
    }
    return { data: undefined }
}


export default Edit