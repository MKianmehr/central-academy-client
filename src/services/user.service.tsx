import { useCallback, useContext, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'next-i18next';
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router';

// Repository Import
import { UserRepository } from './user.repository';

// Redux Imports
import { useAppDispatch } from '../redux/hooks';
import { login } from '../redux/slices/userSlice';

// Context Imports
import { GlobalContext } from '../contexts';

// Props Import
import { UserAndToken, UserService } from '../models/Props'


const UserService = (): UserService => {

    const { t } = useTranslation('common');
    const { onLoad } = useContext(GlobalContext)
    const dispatch = useAppDispatch()
    const router = useRouter()
    const repo = useMemo(() => new UserRepository(), [])


    const signUp = useCallback(
        async (email: string, password: string, loading:
            (loading: boolean) => void): Promise<void> => {
            onLoad(true)
            loading(true)
            try {
                const { data }: { data: UserAndToken } = await axios.post('/api/auth/signup', {
                    email,
                    password
                })

                dispatch(login(data))
                repo.saveToken(data.accessToken)
                toast.success(t("successfully-register"))
                onLoad(false)
                router.replace('/')
            } catch (e) {
                onLoad(false)
                loading(false)
                if (axios.isAxiosError(e)) {
                    e as AxiosError
                    if (e.response?.status === 409) {
                        toast.error(t("email in use"))
                    }
                } else {
                    toast.error('Sth went wrong try again later')
                }
            }
        }, [])

    const signIn = useCallback(async (email: string, password: string): Promise<void> => {
        onLoad(true)
        try {
            const { data }: { data: UserAndToken } = await axios.post('/api/auth/signin', {
                email,
                password
            })

            dispatch(login(data))
            repo.saveToken(data.accessToken)
            toast.success(t("successfully-login"))
            onLoad(false)
            router.replace('/')
        } catch (e) {
            onLoad(false)
            if (axios.isAxiosError(e)) {
                e as AxiosError
                if (e.response?.status === 409) {
                    toast.error(t("email in use"))
                }
            } else {
                toast.error('Sth went wrong try again later')
            }
        }
    }, [])
    return { signUp, signIn }
}

export default UserService