import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectLabelsProp } from '../../../models/Props';
import Select from '@mui/material/Select';
import { useTranslation } from 'next-i18next';
import styles from './styles.module.scss'
import { useRouter } from 'next/router';

export default function SelectLabels({ labels, height, minWidth, maxWidth, value, onChange }: SelectLabelsProp) {
    const { t } = useTranslation("common")
    const router = useRouter()
    const locale = router.locale

    return (
        <div>
            <FormControl sx={{ minWidth: minWidth ? minWidth : 120, width: "100%", maxWidth: maxWidth ? maxWidth : 100 }}>
                <Select
                    className={styles.form}
                    value={locale === "en" ? value.en : value.fa}
                    onChange={onChange}
                    displayEmpty
                    style={{ height: height ? height : "40px", width: "100%" }}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {labels.map((label) => {
                        return <MenuItem key={label.en} value={locale === "en" ? label.en : label.fa}>{t(`${locale === "en" ? label.en : label.fa}`)}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
}