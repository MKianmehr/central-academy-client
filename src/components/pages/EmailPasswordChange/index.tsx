import React, { useCallback, useContext, useState } from 'react'
import useTranslation from "next-translate/useTranslation";
import { useRouter } from 'next/router';

// Components Import
import Input from '../../commons/Input'
import Height16 from '../../commons/Height16'


// MUI Imports
import Button from '@mui/material/Button';
import LockIcon from '@mui/icons-material/Lock';

// Context Imports
import { GlobalContext } from '../../../contexts';

// Styles Import
import styles from './styles.module.scss'

const EmailPasswordChange = () => {
    const { t } = useTranslation('common');
    const router = useRouter()

    const [password, setPassword] = useState("")
    const [passwordError, setPasswordError] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [confirmPasswordError, setConfirmPasswordError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [resError, setResError] = useState("")

    const { emailPasswordChange } = useContext(GlobalContext)

    const loading = useCallback((loading: boolean) => {
        setIsLoading(loading)
    }, [])

    const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }, [])

    const handleConfirmPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.target.value)
    }, [])

    const onSubmitForm = useCallback(async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        if (isLoading) return
        setPasswordError("")
        setConfirmPasswordError("")
        setResError("")
        if (password.length < 7) {
            setPasswordError(t("pass-length-error"))
        } else if (password !== confirmPassword) {
            setConfirmPasswordError(t("password-not-match"))
        } else if (!router.query.reset_code) {
            setResError("Invalid URL")
        } else {
            const res = await emailPasswordChange(password, router.query.reset_code as string, loading)
            if (!res.success) {
                setResError(res.message)
            }
        }
    }, [password, isLoading, confirmPassword, router])


    return (
        <div className={[styles.container].join(" ")}>
            <div className={styles.box}>
                <form className={styles.form} onSubmit={onSubmitForm}>
                    <h3 className={styles.header}>{t("Reset Password")}</h3>
                    <div className={styles.inputs}>
                        <Input
                            name='password'
                            placeholder={t("password")}
                            value={password}
                            onChange={handlePasswordChange}
                            icon={<LockIcon className={styles.icon} />}
                            error={passwordError && passwordError}
                        />
                        <Height16 />
                        <Input
                            name='confirmPassword'
                            placeholder={t("confirm password")}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            icon={<LockIcon className={styles.icon} />}
                            error={confirmPasswordError && confirmPasswordError}
                        />
                    </div>
                    <Height16 />
                    <span className={styles.error}>{resError}</span>
                    <Button type='submit' className={[styles.button, isLoading && styles.loading].join(" ")} variant="contained">
                        {t('submit')}
                    </Button>
                </form>
            </div>
        </div>
    )
}

export default EmailPasswordChange