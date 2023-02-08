import React from 'react'

// Components Import
import StepperHeader from './Header'
import StepperFooter from './Footer'

// Styles Import
import styles from './styles.module.scss'


interface StepperInterface {
    currentIndex: number;
    lastIndex: number;
    onNextClick: () => void;
    onPreviousClick: () => void;
    children: React.ReactNode;
    onExitClick: () => void;
    loading: boolean;
}

const Stepper: React.FC<StepperInterface> = ({ onNextClick, onPreviousClick, currentIndex, lastIndex, children, onExitClick, loading }) => {
    return (
        <div className={styles.container}>
            <StepperHeader currentIndex={currentIndex} lastIndex={lastIndex} onExitClick={onExitClick} />
            {children}
            <StepperFooter
                onNextClick={onNextClick}
                onPreviousClick={onPreviousClick}
                currentIndex={currentIndex}
                loading={loading}
            />
        </div>
    )
}

export default Stepper