import * as React from 'react';
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";
import Link from 'next/link';

// Components Import
import CheckButton from '../CheckButton';

// Mui Imports
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import WindowIcon from '@mui/icons-material/Window';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import Avatar from '@mui/material/Avatar';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import LanguageIcon from '@mui/icons-material/Language';

// Context Import
import { DarkModeContext } from '../../../contexts';

// Styles Import
import styles from './styles.module.scss'



type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SwipeableTempDrawer() {
    const { theme, toggleTheme } = React.useContext(DarkModeContext)
    const { t } = useTranslation("common")
    const router = useRouter()
    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const drawerPosition = router.locale === "fa" ? "right" : "left"

    const { pathname, asPath, query } = router;

    const onToggleLanguageClick = () => {
        router.push({ pathname, query }, router.asPath, { locale: (router.locale === "en") ? "fa" : "en" });
    };

    const toggleDrawer =
        (anchor: Anchor, open: boolean) =>
            (event: React.KeyboardEvent | React.MouseEvent) => {
                if (
                    event &&
                    event.type === 'keydown' &&
                    ((event as React.KeyboardEvent).key === 'Tab' ||
                        (event as React.KeyboardEvent).key === 'Shift')
                ) {
                    return;
                }

                setState({ ...state, [anchor]: open });
            };

    const list = (anchor: Anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250, height: "100%", backgroundColor: (theme === "dark" ? "#1C1C24" : "#fff"), color: (theme === "dark" ? "#fff" : "#000") }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <ListItem disablePadding>
                        <ListItemButton className={styles.menuItem}>
                            <ListItemIcon>
                                <Avatar />
                            </ListItemIcon>
                            <ListItemText primary={t("profile")} />
                        </ListItemButton>
                    </ListItem>
                </Link>
            </List>
            <Divider />
            <List>
                <Link href="/" style={{ textDecoration: "none" }}>
                    <ListItem disablePadding>
                        <ListItemButton className={styles.menuItem}>
                            <ListItemIcon>
                                <WindowIcon sx={{ color: (theme === "dark") ? "white" : "black" }} />
                            </ListItemIcon>
                            <ListItemText primary={t("home page")} />
                        </ListItemButton>
                    </ListItem>
                </Link>

                <ListItem disablePadding>
                    <label htmlFor='btn-check-darkmode' style={{ flexGrow: 1 }}>
                        <ListItemButton>
                            <ListItemIcon>
                                <CheckButton isOn={theme === "dark" ? "on" : "off"} onChange={toggleTheme} onIcon={<DarkModeIcon sx={{ color: "black" }} />} offIcon={<LightModeIcon sx={{ color: "#fff" }} />} htmlFor="btn-check-darkmode" />
                            </ListItemIcon>
                            <ListItemText primary={t(theme === "dark" ? "light mode" : "dark mode")} />
                        </ListItemButton>
                    </label>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton onClick={onToggleLanguageClick}>
                        <ListItemIcon>
                            <LanguageIcon sx={{ color: (theme === "dark") ? "white" : "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={t(router.locale === "fa" ? "lang-en" : "lang-fa")} />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Logout sx={{ color: (theme === "dark") ? "white" : "black" }} />
                        </ListItemIcon>
                        <ListItemText primary={t("logout")} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div className={styles.container}>
            <Button
                className={styles.menu}
                onClick={toggleDrawer(drawerPosition, true)}
            >
                <MenuIcon />
            </Button>
            <SwipeableDrawer
                anchor={drawerPosition}
                open={state[drawerPosition]}
                onClose={toggleDrawer(drawerPosition, false)}
                onOpen={toggleDrawer(drawerPosition, true)}
            >
                {list(drawerPosition)}
            </SwipeableDrawer>
        </div>
    );
}