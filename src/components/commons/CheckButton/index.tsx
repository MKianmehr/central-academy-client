import React from 'react'
import { CheckButtonProp } from '../../../models/Props'
import styles from './styles.module.scss'

const CheckButton = ({ onIcon, offIcon, htmlFor, isOn, onChange }: CheckButtonProp) => {
    return (
        <div style={{ cursor: "pointer" }}>
            <input
                value={isOn}
                type="checkbox"
                className={styles.btn_check}
                id={htmlFor}
                autoComplete="off"
                onChange={(e) => {
                    onChange(e)
                }}
            />
            <label htmlFor={htmlFor}>{isOn === "on" ? offIcon : onIcon}</label>
        </div>
    )
}

export default CheckButton
