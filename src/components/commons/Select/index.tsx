import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { SelectLabelsProp } from '../../../models/Props';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useTranslation } from 'next-i18next';

export default function SelectLabels({ labels }: SelectLabelsProp) {
    const { t } = useTranslation("common")

    const [value, setValue] = React.useState(labels[0]);

    const handleChange = (event: SelectChangeEvent) => {
        setValue(event.target.value);
    };

    return (
        <div>
            <FormControl size='small' sx={{ minWidth: 120 }}>
                <Select
                    value={value}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {labels.map((label) => {
                        return <MenuItem value={label}>{t(`${label}`)}</MenuItem>
                    })}
                </Select>
            </FormControl>
        </div>
    );
}