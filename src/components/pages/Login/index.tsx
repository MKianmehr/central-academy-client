import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import useLogin from '../../../hooks/useLogin'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import Input from '../../commons/Input'
import Height16 from '../../commons/Height16'
import styles from './styles.module.scss'


const Login = () => {
    const { t } = useTranslation('common');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null)
    const { onSubmit } = useLogin({ email, password })

    const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }, [setEmail])

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }, [setPassword])

    useEffect(() => {
        inputRef.current?.focus()
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <form className={styles.form} onSubmit={onSubmit}>
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
                        />
                        <Height16 />
                        <Input
                            name='password'
                            placeholder={t("password")}
                            value={password}
                            onChange={handlePasswordChange}
                            icon={<LockIcon className={styles.icon} />}
                            type="password"
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
                    <Button type='submit' className={styles.button} variant="contained">
                        {t('login')}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Login