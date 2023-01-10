import React, { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.scss'
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import RouteIcon from '@mui/icons-material/Route';
import text from '../../../utils/textEnOrFa';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { EditCourseMenuProp } from '../../../models/Props';
import Link from 'next/link';

const MenuEditCourse = ({ lists }: { lists: EditCourseMenuProp }) => {
    const router = useRouter()
    const isEnglish = router.locale === "en"
    const paddingValue = "20px"
    const padding = isEnglish ? { paddingLeft: paddingValue } : { paddingRight: paddingValue }
    const [open, setOpen] = useState(false)
    const onOpenButton = () => {
        setOpen(!open)
    }

    return (
        <div className={styles.container}>
            <div>
                <IconButton className={styles.menuIcon} onClick={onOpenButton}>
                    <MenuIcon fontSize='large' />
                </IconButton>
            </div>
            <div className={
                [styles.menu, open ?
                    styles.menu_open :
                    styles.menu_close]
                    .join(" ")}
            >
                {lists.map((list) => {
                    return (
                        <div key={list.header.en}>
                            <div className={styles.header}>
                                <RouteIcon />
                                <h5>{text(list.header, isEnglish)}</h5>
                            </div>
                            <div style={padding}>
                                <Lists lists={list.sublists} />
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}

const Lists = ({ lists }: { lists: { link: string; text: { fa: string; en: string; } }[] }) => {
    const router = useRouter()
    const borderValue = "unset"
    const isEnglish = router.locale === "en"
    const currentRoute = router.pathname.replace("[step]", "") + router.query.step

    return (
        <>
            {lists.map((list) => {
                const border = currentRoute === list.link ? (isEnglish ? { borderRight: borderValue } : { borderLeft: borderValue }) : {}
                return (
                    <Link key={list.text.en} href={list.link} className={[styles.list, currentRoute === list.link ? styles.active : ""].join(" ")} style={border}>
                        <RadioButtonUncheckedIcon />
                        <span>
                            {text(list.text, isEnglish)}
                        </span>
                    </Link>

                )
            })}
        </>
    )
}

export default MenuEditCourse