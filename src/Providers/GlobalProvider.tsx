import React from 'react'
import OnlineProvider from './OnlineProvider'
import { GlobalProp } from '../models/Props'
import useRtl from '../hooks/useRtl'

const GlobalProvider: React.FC<GlobalProp> = ({ children }) => {
    useRtl()
    return (
        <OnlineProvider>
            {children}
        </OnlineProvider>
    )
}

export default GlobalProvider