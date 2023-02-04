import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import axios, { AxiosError, AxiosResponse } from 'axios'
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";

// Redux Imports
import { useAppDispatch } from '../redux/hooks';
import { login, logOut } from '../redux/slices/userSlice';
import API from '../ApI';

// Repo
import UserRepository from './user.repository';

// Props Import
import { User, UserServiceInterface } from '../models/Props'


const UserService = (onLoad: (loading: boolean) => void): UserServiceInterface => {

    const { t } = useTranslation('common');
    const dispatch = useAppDispatch()
    const [getUserLoading, setGetUserLoading] = useState(true)
    const router = useRouter()
    const userRepo = useMemo(() => {
        return new UserRepository()
    }, [])


    useEffect(() => {
        const user = userRepo.getUser()
        user && dispatch(login(user))
        setGetUserLoading(false)

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
                dispatch(logOut())
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
                userRepo.setUser(data)
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
                userRepo.setUser(data)
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
        }, [router])



    const signOut = useCallback(async (): Promise<void> => {
        try {
            onLoad(true)
            const { data } = await axios.post(API.SIGNOUT)
            dispatch(logOut())
            userRepo.removeUser()
            toast.success(`${t("successfully-logout")}`)
            if (router.pathname.startsWith('/instructor') || router.pathname.startsWith('/course')) {
                router.replace('/')
            }
            onLoad(false)
        } catch (e) {
            onLoad(false)
        }
    }, [router])



    const forgetPassword = useCallback(async (email: string, loading: (loading: boolean) => void): Promise<{
        success: boolean;
        message: string;
    }> => {
        try {
            onLoad(true)
            loading(true)
            console.log("here")
            const res = await axios.post('/api/auth/forget-password', { email })
            console.log("res", res.data)
            const data: { success: boolean, message: string } = res.data
            loading(false)
            onLoad(false)
            return data
        } catch (e) {
            loading(false)
            onLoad(false)
            if (axios.isAxiosError(e)) {
                return { success: false, message: e.response?.data.message }
            }
            return { success: false, message: "Something went wrong" }
        }
    }, [])


    const emailPasswordChange = useCallback(async (password: string, resetCode: string, loading: (loading: boolean) => void): Promise<{
        success: boolean;
        message: any;
    }> => {
        try {
            onLoad(true)
            loading(true)
            const res: AxiosResponse = await axios.post(`/api/auth/email-password-change/${resetCode}`, { password })
            const data: { success: boolean; message: string; user: User } = res.data
            loading(false)
            onLoad(false)
            toast.success(data.message)
            dispatch(login(data.user))
            router.push("/")
            return data
        } catch (e) {
            loading(false)
            onLoad(false)
            if (axios.isAxiosError(e)) {
                return { success: false, message: e.response?.data.message }
            } else {
                return { success: false, message: "Something went wrong" }
            }
        }
    }, [])













    axios.interceptors.response.use(
        function (response: AxiosResponse) {
            // any status code that is in range of 2xx cause 
            // this function to trigger
            return response
        }, function (error) {
            // any status code that falls outside the range of 2xx 
            // cause this function to trigger

            const res = error.response
            if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
                return new Promise((resolve, reject) => {
                    axios.post("http://localhost:3000/auth/signout")
                        .then(() => {
                            dispatch(logOut())
                            userRepo.removeUser()
                            router.push('/login')
                        })
                        .catch((err) => {
                            reject(err)
                        })
                })
            }
            return Promise.reject(error);
        }

    )

    return {
        signUp,
        signIn,
        signOut,
        forgetPassword,
        emailPasswordChange,
        getUserLoading,
    }
}

export default UserService
