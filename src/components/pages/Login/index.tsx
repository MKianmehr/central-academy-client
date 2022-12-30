import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useTranslation } from 'next-i18next';
import useLogin from '../../../hooks/useLogin'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import GoogleIcon from '@mui/icons-material/Google';
import Input from '../../commons/Input'
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
        <div className={['container-fluid', styles.test].join(" ")}>
            <div className={styles.loginContainer}>
                <form onSubmit={onSubmit}>
                    <Input
                        name='email'
                        placeholder={t("email")}
                        value={email}
                        onChange={handleEmailChange}
                        icon={<EmailIcon className={styles.icon} />}
                    />
                    <Input
                        name='password'
                        placeholder={t("password")}
                        value={password}
                        onChange={handlePasswordChange}
                        icon={<LockIcon className={styles.icon} />}
                        type="password"
                    />
                    <button></button>
                </form>
            </div>
        </div>
    )
}

export default Login