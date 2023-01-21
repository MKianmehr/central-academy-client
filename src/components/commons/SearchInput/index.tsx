import React, { useCallback } from 'react'

// Props Import
import { SearchInputProp } from '../../../models/Props';

// Mui Imports
import SearchIcon from '@mui/icons-material/Search';
import { IconButton } from '@mui/material';

// Styles Import
import styles from './styles.module.scss'

const SearchInput = (
    { value, onChange, placeHolder, className }:
        SearchInputProp
) => {

    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }, [])

    return (
        <form className={styles.container} onSubmit={onSubmit}>
            <IconButton type='submit'>
                <SearchIcon className={styles.icon} />
            </IconButton>
            <input value={value} onChange={onChange} className={[styles.input, className].join(" ")} placeholder={placeHolder} />
        </form>
    )
}

export default SearchInput