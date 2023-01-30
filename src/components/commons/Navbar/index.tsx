import React, { useContext } from 'react';
import Link from 'next/link'
import useTranslation from "next-translate/useTranslation";
import LinearProgress from '@mui/material/LinearProgress';

// Mui Imports
import WindowIcon from '@mui/icons-material/Window';
import AccountMenu from '../AccountMenu/AccountMenu'

// Contexts Import
import { DarkModeContext, GlobalContext } from '../../../contexts';

// Styles Import
import styles from './styles.module.scss'

function NavBar() {

    const { theme, toggleTheme } = useContext(DarkModeContext)
    const { loading } = useContext(GlobalContext)
    const { t } = useTranslation("common")

    return (
        <>
            {loading && <LinearProgress />}
            <div className={styles.container}>
                <h6>
                    <Link className={styles.page} style={{ textDecoration: "none" }} href="/"> {t("website-name")}</Link>
                </h6>
                <ul className={styles.pages}>
                    <li className={styles.page}>
                        <Link className={styles.page} style={{ textDecoration: "none" }} href="/">
                            <WindowIcon /> {"  "}
                            {t("home page")}
                        </Link>
                    </li>
                </ul>
                <div>
                    <AccountMenu theme={theme} toggleTheme={toggleTheme} />
                </div>
            </div>
        </>
    )
}
export default NavBar;