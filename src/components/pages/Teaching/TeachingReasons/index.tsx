import React from 'react'
import styles from './styles.module.scss'
import TeachingReason from '../../../commons/TeachingReason'

const reasons = [
    {
        src: "https://s.udemycdn.com/teaching/value-prop-teach-v3.jpg",
        alt: "",
        title: "Teach your way",
        paragraph: "Publish the course you want, in the way you want, and always have control of your own content.",
    },
    {
        src: "https://s.udemycdn.com/teaching/value-prop-inspire-v3.jpg",
        alt: "",
        title: "Inspire learners",
        paragraph: "Teach what you know and help learners explore their interests, gain new skills, and advance their careers.",
    },
    {
        src: "https://s.udemycdn.com/teaching/value-prop-get-rewarded-v3.jpg",
        alt: "",
        title: "Get rewarded",
        paragraph: "Expand your professional network, build your expertise, and earn money on each paid enrollment.",
    }
]

const TeachingReasons = () => {
    return (
        <div className={styles.reasonsContainer}>
            <h2>So many reasons to start</h2>
            <div className={styles.reasons}>
                {reasons.map((reason, index) => {
                    return <TeachingReason
                        key={index}
                        src={reason.src}
                        alt={reason.alt}
                        title={reason.title}
                        paragraph={reason.paragraph}
                    />
                })}
            </div>
        </div>
    )
}

export default TeachingReasons