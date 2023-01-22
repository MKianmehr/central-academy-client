import { forwardRef, useCallback, useContext, useState } from "react"
import { useTranslation } from 'next-i18next';
import { SectionHeaderProps } from "../../../models/Props";

// component imports
import AlertDialog from "../AlertDialog";

// mui imports
import { IconButton } from "@mui/material";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import StickyNote2OutlinedIcon from '@mui/icons-material/StickyNote2Outlined';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// context import
import { CurriculumContext } from "../../../contexts";

// style import
import styles from './styles.module.scss'


const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
    ({ index, title, handleEditSection, className }, ref) => {

        const { t } = useTranslation("common")
        const { handleDeleteSection } = useContext(CurriculumContext)
        const [isDialogEnable, setIsDialogEnable] = useState(false)

        const onOpenDialog = useCallback(() => {
            setIsDialogEnable(!isDialogEnable)
        }, [isDialogEnable])

        const onConfirmDialog = useCallback(() => {
            handleDeleteSection({ sectionIndex: index - 1 })
        }, [handleDeleteSection, index])

        return (
            <div
                ref={ref && ref}
                className={
                    [
                        styles.header,
                        className && className
                    ].join(" ")
                }
            >
                <span className={styles.title}>{t("Section")}: {index}</span>
                <StickyNote2OutlinedIcon fontSize='small' />
                <span className={styles.name}>{title}</span>
                <span className={styles.icons}>
                    <span>
                        <IconButton onClick={handleEditSection} className={styles.icon}>
                            <EditIcon fontSize='small' />
                        </IconButton>
                        <IconButton onClick={onOpenDialog} className={styles.icon}>
                            <DeleteIcon fontSize='small' />
                            <AlertDialog
                                notificationMessage={t("Please Confirm")}
                                onConfirmDialog={onConfirmDialog}
                                onOpenDialog={onOpenDialog}
                                describtion={t("section delete message")}
                                isOpen={isDialogEnable}
                            />
                        </IconButton>
                    </span>
                    <IconButton >
                        <MenuOutlinedIcon className={styles.menu} />
                    </IconButton>
                </span>
            </div >
        )
    }
)

SectionHeader.displayName = "SectionHeader"

export default SectionHeader