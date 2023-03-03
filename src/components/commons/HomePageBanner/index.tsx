import React from 'react'
import { useRouter } from 'next/router'

// Components Import
import Carousel from '../Carousel'
import Banner from '../Banner'

// Utils Import
import Locale from '../../../utils/localeEnum'

// Styles Import
import styles from './styles.module.scss'

const banners = [
    {
        imageSrc: "https://c-academy.s3.eu-west-3.amazonaws.com/2a5f5839-c80b-4fbf-bc37-dab9912c8290.png",
        imageAlt: {
            fa: "در بهترین های CA شریک شوید",
            en: "Subscribe to the best of Udemy",
        },
        title: {
            fa: "در بهترین های CA شریک شوید",
            en: "Subscribe to the best of Udemy",
        },
        description: {
            fa: "با برنامه شخصی، به 8000 دوره آموزشی برتر ما در زمینه فناوری، تجارت و موارد دیگر دسترسی خواهید داشت.",
            en: "With Personal Plan, you get access to 8,000 of our top-rated courses in tech, business, and more.",
        },
        buttonText: {
            fa: "رایگان امتحانش کن",
            en: "Try it free",
        },
        href: "#"
    },
    {
        imageSrc: "https://c-academy.s3.eu-west-3.amazonaws.com/2a5f5839-c80b-4fbf-bc37-dab9912c8290.png",
        imageAlt: {
            fa: "در بهترین های CA شریک شوید",
            en: "Subscribe to the best of Udemy",
        },
        title: {
            fa: "در بهترین های CA شریک شوید",
            en: "Subscribe to the best of Udemy",
        },
        description: {
            fa: "با برنامه شخصی، به 8000 دوره آموزشی برتر ما در زمینه فناوری، تجارت و موارد دیگر دسترسی خواهید داشت.",
            en: "With Personal Plan, you get access to 8,000 of our top-rated courses in tech, business, and more.",
        },
        buttonText: {
            fa: "رایگان امتحانش کن",
            en: "Try it free",
        },
        href: "#"
    }
]


const HomePageBanner = () => {
    const locale = useRouter().locale as Locale
    return (
        <div className={styles.banner}>
            <Carousel>
                {banners.map((banner, index) => {
                    return (
                        <Banner
                            key={index}
                            href={banner.href}
                            title={banner.title[locale] ? banner.title[locale] : banner.title["en"]}
                            description={banner.description[locale] ? banner.description[locale] : banner.description["en"]}
                            imageAlt={banner.imageAlt[locale] ? banner.imageAlt[locale] : banner.imageAlt["en"]}
                            imageSrc={banner.imageSrc}
                            buttonText={banner.buttonText[locale] ? banner.buttonText[locale] : banner.buttonText["en"]}
                        />
                    )
                })}
            </Carousel>
        </div>
    )
}

export default HomePageBanner