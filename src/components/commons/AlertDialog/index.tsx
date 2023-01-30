import React, { useCallback } from 'react';
import useTranslation from "next-translate/useTranslation";

// mui imports
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// styles import
import styles from './styles.module.scss'

export default function AlertDialog({
    describtion,
    isOpen,
    onOpenDialog,
    onConfirmDialog,
    notificationMessage
}: {
    describtion: string;
    notificationMessage: string;
    isOpen: boolean;
    onOpenDialog: () => void;
    onConfirmDialog: () => void
}) {

    const { t } = useTranslation("common")

    const handleClose = useCallback(() => {
        onOpenDialog()
    }, [onOpenDialog])

    const onConfirmClick = useCallback(() => {
        onConfirmDialog()
        handleClose()
    }, [onConfirmDialog, handleClose])

    return (
        <Dialog
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className={styles.container}
        >
            <DialogTitle id="alert-dialog-title" className={styles.title}>
                {notificationMessage}
            </DialogTitle>
            <DialogContent>
                <DialogContentText className={styles.description} id="alert-dialog-description">
                    {describtion}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button className={styles.cancel} onClick={handleClose}>{t("Cancel")}</Button>
                <Button className={styles.confirm} onClick={onConfirmClick} autoFocus>
                    {t("ok")}
                </Button>
            </DialogActions>
        </Dialog>
    );
}