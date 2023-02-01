import React, { useCallback, useContext } from 'react';
import Link from 'next/link'
import useTranslation from "next-translate/useTranslation";
import LinearProgress from '@mui/material/LinearProgress';
import { useRouter } from 'next/router';

// Props Import
import { User } from '../../../models/Props';

// Redux Imports
import { useAppSelector } from '../../../redux/hooks';

// Component Imports
import CheckButton from '../CheckButton';

// Mui Imports
import AccountMenu from '../AccountMenu/AccountMenu';
import { Avatar, Button, IconButton, Skeleton } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';

// Contexts Import
import { DarkModeContext, GlobalContext } from '../../../contexts';

// Utils Import
import UserTypes from '../../../utils/userTypes';

// Styles Import
import styles from './styles.module.scss'

function NavBar() {

    const { theme, toggleTheme } = useContext(DarkModeContext)
    const { loading, getUserLoading } = useContext(GlobalContext)
    const user: Partial<User> = useAppSelector(state => state.user)
    const { t } = useTranslation("common")

    const router = useRouter()
    const { pathname, asPath, query } = router;

    const onToggleLanguageClick = useCallback(() => {
        router.push({ pathname, query }, router.asPath, { locale: (router.locale === "en") ? "fa" : "en" });
    }, [router])

    return (
        <>
            {loading && <LinearProgress />}
            <div className={styles.container}>
                <h6>
                    <Link className={styles.page} style={{ textDecoration: "none" }} href="/"> {t("website-name")}</Link>
                </h6>
                <div className={styles.left}>
                    {!pathname.startsWith("/instructor") && (getUserLoading ? <IconButton><Skeleton variant="rectangular" width={33} height={33} /></IconButton> : (
                        user?.role?.includes(UserTypes.INSTRUCTOR) ? (
                            <Link href="/instructor/courses">
                                {t("ins")}
                            </Link>
                        ) : (
                            <Link href="/instructor/courses">
                                {t("teach on central academy")}
                            </Link>
                        )
                    ))}
                    {getUserLoading ? (
                        <IconButton><Skeleton variant="circular" width={33} height={33} /></IconButton>
                    ) : (
                        Object.keys(user).length > 0 ? <AccountMenu theme={theme} toggleTheme={toggleTheme} /> : (
                            <div className={styles.notLoggedIn}>
                                <Button className={[styles.notLoggedInContent, styles.signIn].join(" ")}>
                                    <Link href="/login">
                                        {t("login")}
                                    </Link>
                                </Button>
                                <Button className={[styles.notLoggedInContent].join(" ")}>
                                    <Link href="/register">
                                        {t("signUp")}
                                    </Link>
                                </Button>
                                <Button className={styles.notLoggedInContent} onClick={onToggleLanguageClick}>
                                    <LanguageIcon />
                                </Button>
                                <Avatar variant="square" sx={{ backgroundColor: (theme === "dark") ? "#000" : "#fff", border: "1px solid rgb(30, 73, 118)" }}>
                                    <CheckButton isOn={theme === "dark" ? "on" : "off"} onChange={toggleTheme} onIcon={<DarkModeIcon sx={{ color: "black" }} />} offIcon={<LightModeIcon sx={{ color: "#FFB100" }} />} htmlFor="btn-check-darkmode" />
                                </Avatar>
                            </div>
                        )
                    )
                    }
                </div>
            </div>
        </>
    )
}
export default NavBar;