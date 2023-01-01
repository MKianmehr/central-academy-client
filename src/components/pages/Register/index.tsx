import React, { useState, useCallback } from 'react'
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import useLogin from '../../../hooks/useLogin'
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import PersonIcon from '@mui/icons-material/Person';
import Input from '../../commons/Input'
import Height16 from '../../commons/Height16'
import styles from './styles.module.scss'


const Register = () => {
    const { t } = useTranslation('common');
    const [name, setName] = useState<string>('')
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const { onSubmit } = useLogin({ email, password })

    const handleNameChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setName(event.target.value);
    }, [setName])

    const handleEmailChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    }, [setEmail])

    const handlePasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setPassword(event.target.value);
    }, [setPassword])

    const handleConfirmPasswordChange = useCallback((event: React.ChangeEvent<HTMLInputElement>): void => {
        setConfirmPassword(event.target.value);
    }, [setConfirmPassword])


    return (
        <div className={styles.container}>
            <div className={styles.box}>
                <form className={styles.form} onSubmit={onSubmit}>
                    <Button className={styles.option}>
                        <GoogleIcon />
                        {t('Sign up with Google')}
                    </Button>
                    <Height16 />
                    <div className={styles.inputs}>
                        <Input
                            name='name'
                            placeholder={t("name")}
                            value={name}
                            onChange={handleNameChange}
                            icon={<PersonIcon className={styles.icon} />}
                        />
                        <Height16 />
                        <Input
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
                        <Height16 />
                        <Input
                            name='password'
                            placeholder={t("confirm password")}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            icon={<LockIcon className={styles.icon} />}
                            type="password"
                        />
                        <Height16 />
                    </div>
                    <Height16 />
                    <Height16 />
                    <Link style={{ textDecoration: 'none' }} className={styles.link} href="/login">
                        {t('already have an account')}
                    </Link>
                    <Height16 />
                    <Button type='submit' className={styles.button} variant="contained">
                        {t('register')}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default Register