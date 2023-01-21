import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import Link from 'next/link';

// Props Import
import { MiniDrawerProp } from '../../../models/Props';

// Mui Imports
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import ListItemText from '@mui/material/ListItemText';

// Styles Imports
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import styles from './styles.module.scss'


const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer({ children }: MiniDrawerProp) {
    const router = useRouter();
    const { t } = useTranslation("common")
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawer = () => {
        setOpen(!open);
    };

    const onMouseEnter = () => {
        setOpen(true)
    }

    const onMouseLeave = () => {
        setOpen(false)
    }

    const padding = router.locale === "fa" ? { paddingRight: "56px" } : { paddingLeft: "56px" }


    return (
        <Box sx={{ display: 'flex', zIndex: 0, height: "100%", overflowX: "scroll" }} >
            <Drawer variant="permanent" open={open} anchor={(router.locale === "fa") ? "right" : "left"} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave} style={{ position: "absolute" }}>
                <DrawerHeader />
                <DrawerHeader>
                    <IconButton className={styles.color} onClick={handleDrawer}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <Link href="/instructor/courses" style={{ textDecoration: "none" }}>
                        <ListItem disablePadding sx={{ display: 'block', borderRight: "2px solid rgb(3, 169, 244)", backgroundColor: "rgba(0, 0, 0, 0.04)" }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <OndemandVideoIcon className={styles.color} />

                                </ListItemIcon>
                                <ListItemText className={styles.color} primary={t("courses")} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                    <Link href="/instructor" style={{ textDecoration: "none" }}>
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CreateIcon className={styles.color} />
                                </ListItemIcon>
                                <ListItemText className={styles.color} primary={t("course create")} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                </List>
                <Divider />
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, height: "100%", ...padding }}>
                {children}
            </Box>
        </Box >
    );
}