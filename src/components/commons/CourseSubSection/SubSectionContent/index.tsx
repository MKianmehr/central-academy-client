import React, { useContext, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useTranslation } from 'next-i18next';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { SubSectionContext } from '../../../../contexts';
import VideoInput from '../../VideoInput';
import { SubContentTypeProp } from '../../../../models/Props';
import styles from './styles.module.scss'
import { IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import text from '../../../../utils/textEnOrFa';

const ContentTypeIcon = ({ icon, type, onClick }: SubContentTypeProp) => {
    const router = useRouter()
    const isEng = router.locale === "en"
    return (
        <button className={styles.typeContainer} onClick={() => onClick(type.en)}>
            <span className={styles.icon_one}>
                <span>{icon}</span>
            </span>
            <span className={styles.icon_two}>
                <span>{icon}</span>
            </span>
            <span className={styles.type}>{text(type, isEng)}</span>
        </button>
    )
}

const ContentType = ({ handleClickOnTypeIcon, typeOptions }: {
    handleClickOnTypeIcon: (type: string) => void; typeOptions: {
        video: {
            fa: string;
            en: string;
        };
        slide: {
            fa: string;
            en: string;
        };
        article: {
            fa: string;
            en: string;
        }
    }
}) => {
    const { t } = useTranslation("common")
    return (
        <div>
            <p>{t("contentType-des")}</p>
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
    const { t } = useTranslation("common")
    const typeOptions = { video: { fa: "ویدیو", en: "Video" }, slide: { fa: "ویدیو و اسلاید", en: "Video & Slide Mashup" }, article: { fa: "مقاله", en: "Article" } }
    const { onContentButtonClick } = useContext(SubSectionContext)
    const isTypesOpen = isTypeOptionOpen.video || isTypeOptionOpen.slide || isTypeOptionOpen.article

    const handleClickOnTypeIcon = (type: string) => {
        if (type === typeOptions.video.en) {
            setIsTypeOptionOpen({ video: true, slide: false, article: false })
        } else if (type === typeOptions.slide.en) {
            setIsTypeOptionOpen({ video: false, slide: true, article: false })
        } else if (type === typeOptions.article.en) {
            setIsTypeOptionOpen({ video: false, slide: false, article: true })
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span>
                    {!isTypesOpen && t("Select content type")}
                    {isTypeOptionOpen.video && t("Add Video")}
                    {isTypeOptionOpen.article && t("Add Article")}
                    {isTypeOptionOpen.slide && t("Add Video & Slide Mashup")}
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