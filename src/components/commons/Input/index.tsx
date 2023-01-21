import React, { forwardRef } from 'react'

// Import Props
import { InputProp } from '../../../models/Props'

// Import Styles
import styles from './styles.module.scss'

const Input = forwardRef<HTMLInputElement, InputProp>(
    ({ icon, placeholder, type = 'text', value, onChange, error, name }, ref) => {
        return (
            <div>
                <div className={styles.inputContainer}>
                    {icon}
                    <input
                        ref={ref}
                        name={name}
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        type={type}
                        className={styles.input}
                    />
                </div>
                {error && <p className={styles.error}>{error}</p>}
            </div>
        )
    }
)

Input.displayName = "Input"

export default Input
