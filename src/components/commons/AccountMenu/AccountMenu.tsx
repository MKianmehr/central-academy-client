import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import useTranslation from "next-translate/useTranslation";
import { AccountMenuProp } from '../../../models/Props'

// component imports
import CheckButton from '../CheckButton';


// mui imports
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import LanguageIcon from '@mui/icons-material/Language';
import Logout from '@mui/icons-material/Logout';

// styles import
import styles from './styles.module.scss'

export default function AccountMenu({ toggleTheme, theme }: AccountMenuProp) {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const router = useRouter()
    const { pathname, asPath, query } = router;

    const { t } = useTranslation("common")

    const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }, [])
    const handleClose = useCallback(() => {
        setAnchorEl(null);
    }, [])


    const onToggleLanguageClick = useCallback(() => {
        router.push({ pathname, query }, router.asPath, { locale: (router.locale === "en") ? "fa" : "en" });
    }, [router])

    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', justifyContent: "space-between" }}>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2, mr: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        backgroundColor: (theme === "dark" ? "#1C1C24" : "#fff"),
                        color: (theme === "dark" ? "#fff" : "#000"),
                        fontFamily: "inherit",
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: 1,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            left: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'inherit',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem className={styles.menuItems}>
                    <Avatar /> {t("profile")}
                </MenuItem>
                <MenuItem className={styles.menuItems} onClick={onToggleLanguageClick}>
                    <Avatar>
                        <LanguageIcon />
                    </Avatar>
                    {t(router.locale === "fa" ? "lang-en" : "lang-fa")}
                </MenuItem>
                <label htmlFor='btn-check-darkmode'>
                    <MenuItem className={styles.menuItems}>
                        <Avatar variant="rounded" sx={{ backgroundColor: "#fff", border: "1px solid rgb(30, 73, 118)" }}>
                            <CheckButton isOn={theme === "dark" ? "on" : "off"} onChange={toggleTheme} onIcon={<DarkModeIcon sx={{ color: "black" }} />} offIcon={<LightModeIcon sx={{ color: "#FFB100" }} />} htmlFor="btn-check-darkmode" />
                        </Avatar>
                        {t(theme === "dark" ? "light mode" : "dark mode")}
                    </MenuItem>
                </label>
                <Divider />
                <MenuItem className={styles.menuItems}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ color: (theme === "dark") ? "white" : "black" }} />
                    </ListItemIcon>
                    {t("logout")}
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}