import * as React from 'react';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

// Props Import
import { SelectLabelsProp } from '../../../models/Props';

// Mui Imports
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

// Styles Import
import styles from './styles.module.scss'

export default function SelectLabels(
    { labels, height, minWidth, maxWidth, value, onChange }:
        SelectLabelsProp
) {

    const { t } = useTranslation("common")
    const router = useRouter()
    const locale = router.locale

    return (
        <div className={styles.formcontrol}>
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
                        return <MenuItem className={styles.select} key={label.en} value={locale === "en" ? label.en : label.fa}>{t(`${locale === "en" ? label.en : label.fa}`)}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
}