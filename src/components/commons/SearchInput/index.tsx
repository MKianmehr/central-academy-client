import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import styles from './styles.module.scss'
import { IconButton } from '@mui/material';
import { SearchInputProp } from '../../../models/Props';

const SearchInput = ({ value, onChange, placeHolder, className }: SearchInputProp) => {
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }
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