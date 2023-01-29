import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import validator from 'validator'

// Services Import
import UserService from '../../../services/user.service';


// Components Import
import Input from '../../commons/Input'
import Height16 from '../../commons/Height16'

// Mui Import
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';

// Styles Import
import styles from './styles.module.scss'


const Login = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    const { t } = useTranslation('common');

    const { signIn } = UserService()

    const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }, [setEmail])

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }, [setPassword])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])


    const loading = useCallback((loading: boolean) => {
        setIsLoading(loading)
    }, [])

    const onSubmitForm = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLoading) return
        setEmailError("")
        setPasswordError("")

        if (!validator.isEmail(email)) {
            setEmailError(`${t('incorrect-email-error')}`)
        } else if (password.length < 6) {
            setPasswordError(`${t("pass-length-error")}`)
        } else {
            await signIn(email, password, loading)
        }
    }, [email, password, isLoading])

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <form className={styles.form} onSubmit={onSubmitForm}>
                    <Button className={styles.option}>
                        <GoogleIcon />
                        {t('Sign in with Google')}
                    </Button>
                    <Height16 />
                    <div className={styles.inputs}>
                        <Input
                            ref={inputRef}
                            name='email'
                            placeholder={t("email")}
                            value={email}
                            onChange={handleEmailChange}
                            icon={<EmailIcon className={styles.icon} />}
                            error={emailError && emailError}
                        />
                        <Height16 />
                        <Input
                            name='password'
                            placeholder={t("password")}
                            value={password}
                            onChange={handlePasswordChange}
                            icon={<LockIcon className={styles.icon} />}
                            type="password"
                            error={passwordError && passwordError}
                        />
                    </div>
                    <Height16 />
                    <Link className={styles.link} style={{ textDecoration: 'none' }} href="#">
                        {t('forget password')}
                    </Link>
                    <Height16 />
                    <div className={styles.or}>{t('or')}</div>
                    <Height16 />
                    <Link style={{ textDecoration: 'none' }} className={styles.link} href="/register">
                        {t('create account')}
                    </Link>
                    <Height16 />
                    <Button type='submit' className={[styles.button, isLoading && styles.loading].join(" ")} variant="contained">
                        {t('login')}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login