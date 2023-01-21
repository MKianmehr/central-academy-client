import React, { useCallback, useState } from 'react'

// Props Import
import { RemainingInputProp } from '../../../models/Props';

// Styles Import
import styles from './styles.module.scss';

const RemainingInput = ({ value, onChange, maxLength, placeHolder, className, errorValue }: RemainingInputProp) => {

    const [initialValue, setInitialValue] = useState(maxLength)
    const [remaing, setRemaing] = useState(initialValue)

    const onChangeText = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setRemaing(initialValue - e.target.value.length)
        onChange(e)
    }, [])

    return (
        <div className={styles.container}>
            <div className={[styles.input, errorValue && styles.input_error].join(" ")}>
                <input
                    value={value}
                    onChange={onChangeText}
                    placeholder={placeHolder}
                    maxLength={maxLength}
                />
                {remaing}
            </div>
            {errorValue && <span className={styles.error}>{errorValue}</span>}
        </div>
    )
}

export default RemainingInput