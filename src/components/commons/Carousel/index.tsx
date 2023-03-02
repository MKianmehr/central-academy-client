import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel as CarouselContainer } from "react-responsive-carousel";

// Components Import
import Banner from '../Banner';

// Styles Import
import styles from './styles.module.scss'

interface CarouselProp {
    banners: {
        imageSrc: string;
        imageAlt: string;
        title: string;
        description: string;
        buttonText: string;
        onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    }[]

}
const Carousel: React.FC<CarouselProp> = ({ banners }) => {
    return (
        <CarouselContainer
            showStatus={false}
            showThumbs={false}
            showIndicators={false}
            className={styles.container}
        >
            {banners.map((banner, index) => {
                return (
                    <Banner
                        key={index}
                        onClickButton={banner.onClick}
                        title={banner.title}
                        description={banner.description}
                        imageAlt={banner.imageAlt}
                        imageSrc={banner.imageSrc}
                        buttonText={banner.buttonText}
                    />
                )
            })}
        </CarouselContainer>
    )
}

export default Carousel