import React, { useContext, useState } from 'react'
import BeforeSubSection from './BeforeSubSection'
import SubSectionContent from './SubSectionContent'
import SubSectionResourse from './SubSectionResourse'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useTranslation } from 'next-i18next';
import { CourseSubSectionProp } from '../../../models/Props';
import { SubSectionContext, SectionContext } from '../../../contexts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuIcon from '@mui/icons-material/Menu';
import styles from './styles.module.scss'
import { useRouter } from 'next/router';
import text from '../../../utils/textEnOrFa';
import { Button, IconButton } from '@mui/material';


const CourseSubSection = ({ index, content }: CourseSubSectionProp) => {
    const { t } = useTranslation("common")
    const { subSectionOptions } = useContext(SectionContext)
    const [isContentOpen, setIsContentOpen] = useState(false)
    const [isResourseOpen, setIsResourseOpen] = useState(false)
    const router = useRouter()
    const isEnglish = router.locale === "en"

    // drag handlers
    const handleOnDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log("onDrag", index)
    }

    const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log("OnDragEnd", index)
    }

    const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        console.log("onDrop", index)
    }
    // drag handlers

    // ui handlers
    const onContentButtonClick = () => {
        setIsContentOpen(!isContentOpen)
        setIsResourseOpen(false)
    }

    const onResourseButtonClick = () => {
        setIsResourseOpen(!isResourseOpen)
        setIsContentOpen(false)
    }
    // ui handlers
    return (
        <SubSectionContext.Provider value={{ subSectionOptions, onContentButtonClick, onResourseButtonClick }}>
            <div
                className={styles.container}
            >
                {/* before subsection */}
                <BeforeSubSection />
                {/* before subsection */}

                {/* subsection */}
                <div
                    onDragOver={(e) => { e.preventDefault() }}
                    onDragStart={(e) => handleOnDragStart(e, index)}
                    onDragEnd={(e) => handleOnDragEnd(e, index)}
                    onDrop={(e) => handleOnDrop(e, index)}
                    draggable
                >
                    <div className={styles.subsection}>
                        <div className={styles.left}>
                            <div>
                                <CheckCircleIcon fontSize='small' />
                                <span> {text(content.type, isEnglish)} {index}: </span>
                                <span>{text(content.title, isEnglish)}</span>
                                <span className={styles.icons}>
                                    <IconButton><EditIcon fontSize='small' /></IconButton>
                                    <IconButton><DeleteIcon fontSize='small' /></IconButton>
                                </span>
                            </div>
                            {content.type.en.toLowerCase() === "lecture" && (
                                !isContentOpen && (
                                    <div className={styles.addContentButton}>
                                        <Button onClick={onContentButtonClick}>
                                            <AddIcon />
                                            Content
                                        </Button>
                                    </div>
                                )
                            )}
                        </div>
                        {!isContentOpen && (
                            <IconButton onClick={onResourseButtonClick}>
                                {isResourseOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                            </IconButton>
                        )}
                        <span className={styles.icons}>
                            <MenuIcon />
                        </span>
                    </div>
                    {/* subSection content and resourse */}
                    {isContentOpen && <SubSectionContent />}
                    {isResourseOpen && <SubSectionResourse />}
                    {/* subSection content and resourse */}
                </div>
                {/* subsection */}
            </div>
        </SubSectionContext.Provider>
    )
}

export default CourseSubSection