import React, { useState } from 'react'
import styles from './styles.module.scss';

interface RemainingInputProp {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength: number;
    placeHolder: string;
}

const RemainingInput = ({ value, onChange, maxLength, placeHolder }: RemainingInputProp) => {
    const [initialValue, setInitialValue] = useState(maxLength)
    const [remaing, setRemaing] = useState(initialValue)

    const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRemaing(initialValue - e.target.value.length)
        onChange(e)
    }

    return (
        <div className={styles.input}>
            <input
                value={value}
                onChange={onChangeText}
                placeholder={placeHolder}
                maxLength={maxLength}
            />
            {remaing}
        </div>
    )
}

export default RemainingInput