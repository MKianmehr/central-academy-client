import * as React from 'react';
import { useRouter } from 'next/router';

// Props Import
import { CustomSelectProps } from '../../../models/Props';

// MUI Imports
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';

// Utils Import
import Locale from '../../../utils/localeEnum';

// Styles Import
import styles from './styles.module.scss'


const CustomSelect: React.FC<CustomSelectProps> = ({ value, values, onChange, className }) => {
    const router = useRouter()
    const locale = router.locale as Locale

    const onChangeValue = React.useCallback((e: SelectChangeEvent<string>) => {
        const find = values.find((value) => {
            return (value[locale] ? value[locale] : value["en"]) === e.target.value
        })
        if (find) {
            onChange({ target: { value: find } })
        }
    }, [values, locale])

    return (
        <FormControl
            sx={{ minWidth: 250 }}
            className={className && className}
            variant="standard"
        >
            <Select
                className={styles.select}
                value={value[locale] ? value[locale] : value["en"]}
                onChange={onChangeValue}
                input={<InputBase className={styles.input} />}
            >
                {values.map((value) => {
                    return <MenuItem key={value.en} className={styles.menu} value={value[locale] ? value[locale] : value["en"]}>{value[locale] ? value[locale] : value["en"]}</MenuItem>
                })}
            </Select>
        </FormControl>
    );
}

export default CustomSelect