import React, { useCallback } from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselContainer } from "react-responsive-carousel";

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// Styles Import
import styles from './styles.module.scss'

interface CarouselProp {
    children: React.ReactChild[];
    onNextClick?: () => void;
    onPrevClick?: () => void;
}
const ArrowIcon = ({ clickHandler, icon, className }: { clickHandler: () => void; icon: React.ReactNode; className: string }) => {
    return (
        <button className={[styles.arrow, className].join(" ")} onClick={clickHandler}>
            {icon}
        </button>
    )
}

const Carousel: React.FC<CarouselProp> = ({ children, onNextClick, onPrevClick }) => {

    const renderArrowNext = useCallback((clickHandler: () => void, hasNext: boolean) => {
        if (hasNext) {
            return <ArrowIcon
                className={styles.next}
                clickHandler={clickHandler}
                icon={<ArrowForwardIosIcon />}
            />
        }
    }, [])

    const renderArrowPrev = useCallback((clickHandler: () => void, hasPrev: boolean) => {
        if (hasPrev) {
            return <ArrowIcon
                className={styles.prev}
                clickHandler={clickHandler}
                icon={<ArrowBackIosIcon />}
            />
        }
    }, [])

    return (
        <CarouselContainer
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            className={styles.container}
            renderArrowNext={renderArrowNext}
            renderArrowPrev={renderArrowPrev}
        >
            {children}
        </CarouselContainer>
    )
}

export default Carousel