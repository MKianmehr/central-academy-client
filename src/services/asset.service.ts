import { useCallback } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosProgressEvent } from 'axios'
import useTranslation from "next-translate/useTranslation";

// Api Imports
import API from '../ApI';
import Axios from './axios.service';

// Props Import
import { _Class, _type, UploadVideoInterface, AssetServiceInterface } from '../models/Props'
import cleanObject from '../utils/cleanObject';
import { useAppSelector } from '../redux/hooks';



const AssetService = (onLoad: (loading: boolean) => void): AssetServiceInterface => {

    const { t } = useTranslation('common');
    const courses = useAppSelector(state => state.courses)

    const uploadVideo = useCallback(async ({ courseId, lessonId, videoData, handleProgress }: UploadVideoInterface) => {
        const formData = new FormData()
        formData.append("video", videoData)
        formData.append("courseId", courseId)
        formData.append("lessonId", lessonId)

        try {
            const { data } = await Axios.post(API.VIDEO_UPLOAD, formData, {
                onUploadProgress: (e: AxiosProgressEvent) => {
                    if (e.total) {
                        handleProgress(Math.round((100 * e.loaded) / e.total))
                    }
                }


            })
            const course = courses.find((course) => {
                return course._id === courseId
            })
            console.log(courses, "courseeeee")
            return { success: true, message: "" }
        }
        catch (e) {
            if (axios.isAxiosError(e)) {
                e as AxiosError
                if (e.response?.status === 413) {
                    toast.error(`${t("too large")}`)
                }
            } else {
                toast.error('Sth went wrong try again later')
            }
            return { success: false, message: "" }
        }
    }, [API, courses])


    return {
        uploadVideo,
    }
}

export default AssetService
