import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";

// Redux Imports
import { useAppDispatch } from '../redux/hooks';
import { login, logOut } from '../redux/slices/userSlice';
import API from '../ApI';

// Props Import
import { User, UserServiceInterface } from '../models/Props'


const UserService = (onLoad: (loading: boolean) => void): UserServiceInterface => {

    const { t } = useTranslation('common');
    const dispatch = useAppDispatch()
    const [getUserLoading, setGetUserLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        (async () => {
            try {
                setGetUserLoading(true)
                const { data }: { data: User } = await axios.get(API.WHOAMI, { cancelToken: source.token })
                dispatch(login(data))
                setGetUserLoading(false)
            } catch (e) {
                setGetUserLoading(false)
            }
        })()
        return () => source.cancel()
    }, [])

    const signUp = useCallback(
        async (email: string, password: string, loading:
            (loading: boolean) => void): Promise<void> => {
            onLoad(true)
            loading(true)
            try {
                const { data }: { data: User } = await axios.post(API.SIGNUP, {
                    email,
                    password
                })

                dispatch(login(data))
                toast.success(`${t("successfully-register")}`)
                onLoad(false)
                router.replace('/')
            } catch (e) {
                onLoad(false)
                loading(false)
                if (axios.isAxiosError(e)) {
                    e as AxiosError
                    if (e.response?.status === 409) {
                        toast.error(`${t("email in use")}`)
                    }
                } else {
                    toast.error('Sth went wrong try again later')
                }
            }
        }, [])

    const signIn = useCallback(
        async (email: string, password: string, loading: (loading: boolean) => void):
            Promise<void> => {
            onLoad(true)
            loading(true)
            try {
                const { data }: { data: User } = await axios.post(API.SIGNIN, {
                    email,
                    password
                })

                dispatch(login(data))
                toast.success(`${t("successfully-login")}`)
                onLoad(false)
                if (router.query.redirect) {
                    router.replace(router.query.redirect as string)
                } else {
                    router.replace('/')
                }
            } catch (e) {
                onLoad(false)
                loading(false)
                if (axios.isAxiosError(e)) {
                    console.log(e.response?.data.message)
                    e as AxiosError
                    if (e.response?.status === 401) {
                        toast.error(`${t("ckeck login credentials")}`)
                    }
                } else {
                    toast.error('Sth went wrong try again later')
                }
            }
        }, [])

    const signOut = useCallback(async (): Promise<void> => {
        try {
            onLoad(true)
            const { data } = await axios.post(API.SIGNOUT)
            dispatch(logOut())
            toast.success(`${t("successfully-logout")}`)
            onLoad(false)
        } catch (e) {
            onLoad(false)
        }
    }, [])

    return { signUp, signIn, getUserLoading, signOut }
}

export default UserService
