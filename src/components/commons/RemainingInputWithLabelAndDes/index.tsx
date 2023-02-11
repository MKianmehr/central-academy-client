import React from 'react'
import RemainingInput from '../RemaingInput'

import styles from './styles.module.scss'

interface Props {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength: number;
    placeHolder: string;
    className?: string;
    description?: string;
    title?: string;
}
const RemainingInputWithLabelAndDes: React.FC<Props> = ({ onChange, value, maxLength, placeHolder, className, description, title }) => {
    return (
        <div className={styles.container}>
            {title && <div className={styles.title}>{title}</div>}
            <RemainingInput
                onChange={onChange}
                value={value}
                maxLength={maxLength}
                placeHolder={placeHolder}
                className={className}
            />
            {description && <p className={styles.description}>{description}</p>}
        </div>
    )
}

export default RemainingInputWithLabelAndDes