import * as React from 'react';
import Link from 'next/link'
import WindowIcon from '@mui/icons-material/Window';
import { useTranslation } from 'next-i18next';
import AccountMenu from '../AccountMenu/AccountMenu'
import { DarkModeContext } from '../../../contexts';
import styles from './styles.module.scss'

function NavBar() {
    const { theme, toggleTheme } = React.useContext(DarkModeContext)
    const { t } = useTranslation("common")
    return (
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
    )
}
export default NavBar;