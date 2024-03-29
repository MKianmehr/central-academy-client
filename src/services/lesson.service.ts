import { useCallback } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios'
import useTranslation from "next-translate/useTranslation";

// Api Imports
import API from '../ApI';
import Axios from './axios.service';

// Props Import
import { LessonServiceInterface, _Class, LessonInterface, _type, AddLessonInterface, EditLessonInterface, CourseInterface } from '../models/Props'
import cleanObject from '../utils/cleanObject';



const LessonService = (onLoad: (loading: boolean) => void): LessonServiceInterface => {

    const { t } = useTranslation('common');

    const addLesson = useCallback(
        async ({ loading, ...Fields }: AddLessonInterface): Promise<{ success: boolean, message: string, lesson?: LessonInterface }> => {
            onLoad(true)
            loading(true)
            const obj = cleanObject(Fields)
            try {
                const { data }: { data: LessonInterface } = await Axios.post(API.ADD_LESSON, obj)
                onLoad(false)
                return { success: true, message: "", lesson: data }
            } catch (e) {
                onLoad(false)
                loading(false)
                if (axios.isAxiosError(e)) {
                    e as AxiosError
                    if (e.response?.status === 400) {
                        toast.error(`${e.response.data.message[0]}`)
                    } else if (e.response?.status === 409) {
                        toast.error(`${e.response.data.message}`)
                    }
                } else {
                    toast.error('Sth went wrong try again later')
                }
                return { success: false, message: "" }
            }
        }, [API])


    const editLesson = useCallback(
        async ({ loading, ...updatedFields }: EditLessonInterface): Promise<{ success: boolean, message: string, lesson?: LessonInterface }> => {
            onLoad(true)
            loading(true)
            const obj = cleanObject(updatedFields)
            try {
                const { data }: { data: LessonInterface } = await Axios.patch(API.EDIT_LESSON, obj)
                onLoad(false)
                return { success: true, message: "", lesson: data }
            } catch (e) {
                onLoad(false)
                loading(false)
                if (axios.isAxiosError(e)) {
                    e as AxiosError
                    if (e.response?.status === 400) {
                        toast.error(`${e.response.data.message[0]}`)
                    } else if (e.response?.status === 409) {
                        toast.error(`${e.response.data.message}`)
                    }
                } else {
                    toast.error('Sth went wrong try again later')
                }
                return { success: false, message: "" }
            }
        }, [API])

    const deleteLesson = useCallback(async ({ courseId, index, loading }: { courseId: string; index: number; loading: (loading: boolean) => void; }) => {
        onLoad(true)
        loading(true)

        try {
            const { data } = await Axios.patch(API.DELETE_LESSON, {
                index,
                courseId,
            })
            onLoad(false)
            loading(false)
            return { success: true, message: "" }

        } catch (e) {
            onLoad(false)
            loading(false)
            if (axios.isAxiosError(e)) {
                e as AxiosError
                if (e.response?.status === 400) {
                    toast.error(`${e.response.data.message[0]}`)
                } else if (e.response?.status === 409) {
                    toast.error(`${e.response.data.message}`)
                }
            } else {
                toast.error('Sth went wrong try again later')
            }
            return { success: false, message: "" }
        }
    }, [API])


    const updateLessonsOrder = useCallback(async ({ courseId, lessons, loading }: { courseId: string; lessons: LessonInterface[]; loading: (loading: boolean) => void; }) => {
        onLoad(true)
        loading(true)
        try {

            const { data }: { data: CourseInterface } = await Axios.patch(API.REORDER_LESSONS, {
                lessons,
                courseId,
            })
            onLoad(false)
            return { success: true, message: "" }
        } catch (e) {
            onLoad(false)
            loading(false)
            if (axios.isAxiosError(e)) {
                e as AxiosError
                if (e.response?.status === 400) {
                    toast.error(`${e.response.data.message[0]}`)
                } else if (e.response?.status === 409) {
                    toast.error(`${e.response.data.message}`)
                }
            } else {
                toast.error('Sth went wrong try again later')
            }
            return { success: false, message: "" }
        }
    }, [API])


    return {
        addLesson,
        editLesson,
        updateLessonsOrder,
        deleteLesson,
    }
}

export default LessonService
