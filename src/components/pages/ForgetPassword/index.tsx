import React, { useCallback, useContext, useState } from 'react'
import validator from 'validator'
import Link from 'next/link';
import useTranslation from "next-translate/useTranslation";

// Components Import
import Input from '../../commons/Input'

// MUI Imports
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/Email';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Context Imports
import { GlobalContext } from '../../../contexts';

// Styles Import
import styles from './styles.module.scss'


const ForgetPassword = () => {

    const { t } = useTranslation('common');

    const [email, setEmail] = useState("")
    const [emailError, setEmailError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const [resError, setResError] = useState("")

    const { forgetPassword } = useContext(GlobalContext)

    const loading = useCallback((loading: boolean) => {
        setIsLoading(loading)
    }, [])

    const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }, [])

    const onSubmitForm = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if (isLoading) return
        setEmailError("")
        setResError("")
        if (!validator.isEmail(email)) {
            setEmailError(t('incorrect-email-error'))
        } else {
            const res = await forgetPassword(email, loading)
            if (res.success) {
                setSuccess(true)
            } else {
                setResError(res.message)
            }
        }
    }, [email, isLoading])

    return (
        <div className={[styles.container].join(" ")}>
            {!success && (
                <div className={styles.box}>
                    <form className={styles.form} onSubmit={onSubmitForm}>
                        <h3 className={styles.header}>{t("forget-password")}</h3>
                        <div className={styles.inputs}>
                            <Input
                                name='email'
                                placeholder={t("email")}
                                value={email}
                                onChange={handleEmailChange}
                                icon={<EmailIcon className={styles.icon} />}
                                error={emailError && emailError}
                            />
                        </div>
                        <span className={styles.error}>{resError}</span>
                        <div className={styles.or}>{t('or')}</div>
                        <Link style={{ textDecoration: 'none' }} className={styles.link} href="/login">
                            {t('login')}
                        </Link>
                        <Button type='submit' className={[styles.button, isLoading && styles.loading].join(" ")} variant="contained">
                            {t('Reset Password')}
                        </Button>
                    </form>
                </div>
            )}
            {success && (
                <div className={styles.successBox}>
                    <div>
                        <CheckCircleIcon />
                    </div>
                    <div>
                        <h3>{t("Reset password email sent")}</h3>
                        <p>{t("reset-pass-email-sent-paragraph")}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ForgetPassword