import { useCallback } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";

// Redux Imports
import { useAppDispatch } from '../redux/hooks';
import { uploadCourses } from '../redux/slices/courseSlice';

// Api Imports
import API from '../ApI';
import Axios from './axios.service';

// Props Import
import { CourseServiceInterface, CourseInterface } from '../models/Props'


const CourseService = (onLoad: (loading: boolean) => void): CourseServiceInterface => {

    const { t } = useTranslation('common');
    const dispatch = useAppDispatch()
    const router = useRouter()



    const createCourse = useCallback(
        async (name: string, category: string, loading:
            (loading: boolean) => void): Promise<{ success: boolean, message: string }> => {
            onLoad(true)
            loading(true)
            try {
                const { data }: { data: CourseInterface[] } = await Axios.post(API.CREATE_COURSE, {
                    name,
                    category
                })

                dispatch(uploadCourses(data))
                toast.success(`${t("successfully-add")}`)
                onLoad(false)
                router.replace('/instructor/courses')
                return { success: true, message: "" }
            } catch (e) {

                onLoad(false)
                loading(false)
                if (axios.isAxiosError(e)) {
                    e as AxiosError
                    if (e.response?.status === 409) {
                        toast.error(`${t("course title is duplicate")}`)
                    }
                } else {
                    toast.error('Sth went wrong try again later')
                }
                return { success: false, message: "" }
            }
        }, [API])

    const getCourses = useCallback(async (loading: (loading: boolean) => void) => {
        onLoad(true)
        loading(true)
        try {
            const { data } = await Axios.get(API.GET_COURSES, {
                params: {
                    skip: 10,
                }
            })
            dispatch(uploadCourses(data))
            onLoad(false)
            loading(false)
        } catch (e) {
            onLoad(false)
            loading(false)
            toast.error("Something went wrong")
        }
    }, [API])

    const uploadImage = useCallback(async (image: string, courseId: string, loading: (loading: boolean) => void) => {
        try {
            onLoad(true)
            loading(true)
            const { data } = await Axios.post('/api/course/upload-image', {
                image,
                courseId
            })
            onLoad(false)
            loading(false)
            toast.success("Image successfully added")
            return { success: true, message: "Image successfully added" }
        } catch (e) {
            onLoad(false)
            loading(false)
            if (axios.isAxiosError(e)) {
                e as AxiosError
                if (e?.response?.status === 413) {
                    toast.error(e.response.data.message)
                    return { success: false, message: e.response.data.message }
                } else {
                    toast.error(e?.response?.data)
                    return { success: false, message: "" }
                }
            }
            return { success: false, message: "" }
        }
    }, [])

    return {
        createCourse,
        getCourses,
        uploadImage,
    }
}

export default CourseService
