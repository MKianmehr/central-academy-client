import React, { useState, useEffect } from 'react'
import { UseLoginProp } from '../models/Props'

const useLogin = ({ email, password }: UseLoginProp) => {
    const [error, setError] = useState()

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return { onSubmit }
}

export default useLogin