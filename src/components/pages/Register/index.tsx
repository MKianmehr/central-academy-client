import React, { useState, useCallback, useContext } from 'react'
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link';
import validator from 'validator'

// Context Import
import { GlobalContext } from '../../../contexts';

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


const Register = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')
    const [confirmPasswordError, setConfirmPasswordError] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const { signUp } = useContext(GlobalContext)

    const { t } = useTranslation('common');

    const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }, [setEmail])

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }, [setPassword])

    const handleConfirmPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value);
    }, [setConfirmPassword])

    const loading = useCallback((loading: boolean) => {
        setIsLoading(loading)
    }, [])


    const onSubmitForm = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (isLoading) return

        setEmailError("")
        setPasswordError("")
        setConfirmPasswordError("")

        if (!validator.isEmail(email)) {
            setEmailError(`${t('incorrect-email-error')}`)
        } else if (password.length < 6) {

            setPasswordError(`${t("pass-length-error")}`)
        } else if (!(password === confirmPassword)) {
            setConfirmPasswordError(`${t("password-not-match")}`)
        } else {
            await signUp(email, password, loading)
        }
    }, [email, password, confirmPassword, isLoading])


    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <form className={styles.form} onSubmit={onSubmitForm}>
                    <Button className={styles.option}>
                        <GoogleIcon />
                        {t('Sign up with Google')}
                    </Button>
                    <Height16 />
                    <div className={styles.inputs}>
                        <Input
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
                        <Height16 />
                        <Input
                            name='password'
                            placeholder={t("confirm password")}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            icon={<LockIcon className={styles.icon} />}
                            type="password"
                            error={confirmPasswordError && confirmPasswordError}
                        />
                        <Height16 />
                    </div>
                    <Height16 />
                    <Height16 />
                    <Link style={{ textDecoration: 'none' }} className={styles.link} href="/login">
                        {t('already have an account')}
                    </Link>
                    <Height16 />
                    <Button type='submit' className={[styles.button, isLoading && styles.loading].join(" ")} variant="contained">
                        {t('register')}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Register