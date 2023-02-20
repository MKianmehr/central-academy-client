import React from 'react'
import useTranslation from "next-translate/useTranslation";
import LinearProgress from '../LinearProgress'
import CloseIcon from '@mui/icons-material/Close';
import styles from './styles.module.scss'
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const UploadProgressTable = ({ fileName, type, status, onCancel, error }: { fileName: string; type: string; status: number; onCancel: () => void; error?: { reason: string } }) => {

    const { t } = useTranslation("common")

    const date = new Date();
    const dateString = date.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });

    return (
        <table className={styles.table__container}>
            <thead>
                <tr className={styles.table__header}>
                    <th>{t("FileName")}</th>
                    <th>{t("Type")}</th>
                    <th>{t("Status")}</th>
                    <th>{t("Date")}</th>
                </tr>
            </thead>
            <tbody>
                <tr className={styles.trBody}>
                    <td className={styles.fileName}>{fileName}</td>
                    <td>{type}</td>
                    <td className={styles.progressTd}>
                        {!error ? (
                            <div className={styles.progress}>
                                <div className={styles.progressContainer}>
                                    <LinearProgress borderRadius='8px' value={status} height='8px' />
                                </div>
                                {status}%
                            </div>
                        ) : t("Faild")}
                    </td>
                    <td>{dateString}</td>
                    <td>
                        <IconButton onClick={onCancel}>
                            {error ? <DeleteIcon /> : <CloseIcon />}
                        </IconButton>
                    </td>
                </tr>
                {error && (
                    <tr>
                        <td>
                            {error.reason}
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}

export default UploadProgressTable