import React, { useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { SubSectionContext } from '../../../../contexts';
import VideoInput from '../../VideoInput';
import { SubContentTypeProp } from '../../../../models/Props';
import styles from './styles.module.scss'
import { IconButton } from '@mui/material';

const ContentTypeIcon = ({ icon, type, onClick }: SubContentTypeProp) => {

    return (
        <button className={styles.typeContainer} onClick={() => onClick(type)}>
            <span className={styles.icon_one}>
                <span>{icon}</span>
            </span>
            <span className={styles.icon_two}>
                <span>{icon}</span>
            </span>
            <span className={styles.type}>{type}</span>
        </button>
    )
}

const ContentType = ({ handleClickOnTypeIcon, typeOptions }: {
    handleClickOnTypeIcon: (type: string) => void; typeOptions: {
        video: string;
        slide: string;
        article: string;
    }
}) => {
    return (
        <div>
            <p>Select the main type of content. Files and links can be added as resources.</p>
            <div className={styles.contentTypeOptions}>
                <ContentTypeIcon onClick={handleClickOnTypeIcon} icon={<PlayCircleIcon />} type={typeOptions.video} />
                <ContentTypeIcon onClick={handleClickOnTypeIcon} icon={<OndemandVideoIcon />} type={typeOptions.slide} />
                <ContentTypeIcon onClick={handleClickOnTypeIcon} icon={<DescriptionOutlinedIcon />} type={typeOptions.article} />
            </div>
        </div>
    )
}


const SlideInput = () => {
    return <div>Slide</div>
}

const ArticleInput = () => {
    return <div>Article</div>
}

const SubSectionContent = () => {
    const [isTypeOptionOpen, setIsTypeOptionOpen] = useState({ video: false, slide: false, article: false })
    const typeOptions = { video: "Video", slide: "Video & Slide Mashup", article: "Article" }
    const { onContentButtonClick } = useContext(SubSectionContext)
    const isTypesOpen = isTypeOptionOpen.video || isTypeOptionOpen.slide || isTypeOptionOpen.article

    const handleClickOnTypeIcon = (type: string) => {
        if (type === typeOptions.video) {
            setIsTypeOptionOpen({ video: true, slide: false, article: false })
        } else if (type === typeOptions.slide) {
            setIsTypeOptionOpen({ video: false, slide: true, article: false })
        } else if (type === typeOptions.article) {
            setIsTypeOptionOpen({ video: false, slide: false, article: true })
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span>
                    {!isTypesOpen && "Select content type"}
                    {isTypeOptionOpen.video && "Add Video"}
                    {isTypeOptionOpen.article && "Add Article"}
                    {isTypeOptionOpen.slide && "Add Video & Slide Mashup"}
                </span>
                <div>
                    <IconButton onClick={onContentButtonClick} className={styles.closeIcon}>
                        <AddIcon />
                    </IconButton>
                </div>
            </div>
            <div className={styles.content}>
                {!(isTypesOpen) && (
                    <ContentType handleClickOnTypeIcon={handleClickOnTypeIcon} typeOptions={typeOptions} />
                )}
                {isTypeOptionOpen.video && (
                    <VideoInput />
                )}
                {isTypeOptionOpen.slide && (
                    <SlideInput />
                )}
                {isTypeOptionOpen.article && (
                    <ArticleInput />
                )
                }
            </div>
        </div>
    )
}

export default SubSectionContent