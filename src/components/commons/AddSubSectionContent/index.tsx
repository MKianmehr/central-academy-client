import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Props Imports
import { SubContentTypeProp, AddSubSectionContentTypeProp } from '../../../models/Props';

//Components Imports
import VideoInput from '../VideoInput';

// Mui Imports
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';

// Utils Import
import text from '../../../utils/textEnOrFa';

// Contexts Imports
import { SubSectionContext } from '../../../contexts';

// Styles Import
import styles from './styles.module.scss'





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




const ContentType = (
    { handleClickOnTypeIcon, typeOptions }:
        AddSubSectionContentTypeProp
) => {
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

const typeOptions = { video: { fa: "ویدیو", en: "Video" }, slide: { fa: "ویدیو و اسلاید", en: "Video & Slide Mashup" }, article: { fa: "مقاله", en: "Article" } }


const AddSubSectionContent = () => {

    const { OnClickContentType } = useContext(SubSectionContext)
    const { t } = useTranslation("common")

    const [isTypeOptionOpen, setIsTypeOptionOpen] = useState({
        video: false,
        slide: false,
        article: false
    })

    const isTypesOpen = isTypeOptionOpen.video || isTypeOptionOpen.slide || isTypeOptionOpen.article

    const handleClickOnTypeIcon = useCallback((type: string) => {

        if (type === typeOptions.video.en) {
            OnClickContentType(t("Add Video"))
            setIsTypeOptionOpen({ video: true, slide: false, article: false })
        } else if (type === typeOptions.slide.en) {
            OnClickContentType(t("Add Article"))
            setIsTypeOptionOpen({ video: false, slide: true, article: false })
        } else if (type === typeOptions.article.en) {
            OnClickContentType(t("Add Video & Slide Mashup"))
            setIsTypeOptionOpen({ video: false, slide: false, article: true })
        }
    }, [])


    return (
        <div className={styles.container}>
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

export default AddSubSectionContent