import React, { useCallback, useContext, useState } from 'react'
import { useTranslation } from 'next-i18next';

// Props Imports
import { SubContentTypeProp, AddSubSectionContentTypeProp } from '../../../models/Props';

//Components Imports
import VideoInput from '../VideoInput';

// Mui Imports
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Utils Import
import ClassOptions from '../../../utils/curriculumClasses';

// Contexts Imports
import { SubSectionContext } from '../../../contexts';

// Styles Import
import styles from './styles.module.scss'





const ContentTypeIcon = ({ icon, type, onClick }: SubContentTypeProp) => {
    const { t } = useTranslation("common")
    return (
        <button className={styles.typeContainer} onClick={() => onClick(type)}>
            <span className={styles.icon_one}>
                <span>{icon}</span>
            </span>
            <span className={styles.icon_two}>
                <span>{icon}</span>
            </span>
            <span className={styles.type}>{t(type)}</span>
        </button>
    )
}




const ContentType = (
    { handleClickOnTypeIcon, typeOptions }:
        AddSubSectionContentTypeProp
) => {
    const { t } = useTranslation("common")

    const { _class } = useContext(SubSectionContext)

    return (
        <div>
            {!(_class === ClassOptions.Quiz) && (<p>{t("contentType-des")}</p>)}
            <div className={styles.contentTypeOptions}>
                {(_class !== ClassOptions.Quiz) ? (
                    <>
                        <ContentTypeIcon onClick={handleClickOnTypeIcon} icon={<PlayCircleIcon />} type={typeOptions.video} />
                        <ContentTypeIcon onClick={handleClickOnTypeIcon} icon={<OndemandVideoIcon />} type={typeOptions.slide} />
                        <ContentTypeIcon onClick={handleClickOnTypeIcon} icon={<DescriptionOutlinedIcon />} type={typeOptions.article} />
                    </>
                ) : (
                    <ContentTypeIcon onClick={handleClickOnTypeIcon} icon={<HelpOutlineIcon />} type={typeOptions.questions} />
                )
                }
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

const MultipleChoiceQuestionsInput = () => {
    return <div>Multi Questions</div>
}

const typeOptions = { video: "Video", slide: "Video & Slide Mashup", article: "Article", questions: "Multiple Choice" }


const AddSubSectionContent = () => {

    const { OnClickContentType } = useContext(SubSectionContext)
    const { t } = useTranslation("common")

    const [isTypeOptionOpen, setIsTypeOptionOpen] = useState({
        video: false,
        slide: false,
        article: false,
        questions: false,
    })

    const isTypesOpen = isTypeOptionOpen.video || isTypeOptionOpen.slide || isTypeOptionOpen.article || isTypeOptionOpen.questions

    const handleClickOnTypeIcon = useCallback((type: string) => {

        if (type === typeOptions.video) {
            OnClickContentType(t("Add Video"))
            setIsTypeOptionOpen({ video: true, slide: false, article: false, questions: false })
        } else if (type === typeOptions.slide) {
            OnClickContentType(t("Add Video & Slide Mashup"))
            setIsTypeOptionOpen({ video: false, slide: true, article: false, questions: false })
        } else if (type === typeOptions.article) {
            OnClickContentType(t("Add Article"))
            setIsTypeOptionOpen({ video: false, slide: false, article: true, questions: false })
        } else if (type === typeOptions.questions) {
            OnClickContentType(t("Add Multiple Choice"))
            setIsTypeOptionOpen({ video: false, slide: false, article: false, questions: true })
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
                {isTypeOptionOpen.questions && (
                    <MultipleChoiceQuestionsInput />
                )
                }
            </div>
        </div>
    )
}

export default AddSubSectionContent