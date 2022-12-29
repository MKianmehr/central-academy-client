import React from 'react'
import OnlineProvider from './OnlineProvider'
import { GlobalProp } from '../models/Props'
import useRtl from '../hooks/useRtl'
import useVh from '../hooks/useVh'

const GlobalProvider: React.FC<GlobalProp> = ({ children }) => {
    useRtl()
    useVh()
    return (
        <OnlineProvider>
            {children}
        </OnlineProvider>
    )
}

export default GlobalProvider