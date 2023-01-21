import Link from 'next/link'
import React from 'react'

// Props Import
import { LinkButtonProp } from '../../../models/Props'

// Styles Import
import styles from './styles.module.scss'


const LinkButton = ({ href, text, className }: LinkButtonProp) => {
    return (
        <Link className={[styles.button, className].join(" ")} href={href}>{text}</Link>
    )
}

export default LinkButton