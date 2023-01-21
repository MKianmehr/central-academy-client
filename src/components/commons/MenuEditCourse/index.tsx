import React, { useState, CSSProperties, useCallback } from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';

// Props Imports
import { EditCourseMenuProp } from '../../../models/Props';

// Mui Imports
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from '@mui/material';
import RouteIcon from '@mui/icons-material/Route';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

// Utils Import 
import text from '../../../utils/textEnOrFa';

// Styles Import
import styles from './styles.module.scss'

const MenuEditCourse = ({ lists }: { lists: EditCourseMenuProp }) => {

    const [open, setOpen] = useState(false)

    const router = useRouter()
    const isEnglish = router.locale === "en"

    const paddingValue = "20px"
    const padding: CSSProperties = isEnglish ?
        { paddingLeft: paddingValue } : { paddingRight: paddingValue }

    const onOpenButton = useCallback(() => {
        setOpen(!open)
    }, [open])

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

const Lists = (
    { lists }:
        { lists: { link: string; text: { fa: string; en: string; } }[] }
) => {
    const router = useRouter()
    const isEnglish = router.locale === "en"

    const borderValue = "unset"

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