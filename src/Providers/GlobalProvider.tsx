import React from 'react'
import OnlineProvider from './OnlineProvider'
import { GlobalProp } from '../models/Props'

const GlobalProvider: React.FC<GlobalProp> = ({ children }) => {
    return (
        <OnlineProvider>
            {children}
        </OnlineProvider>
    )
}

export default GlobalProvider