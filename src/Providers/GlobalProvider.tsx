import React from 'react'
import OnlineProvider from './OnlineProvider'
import DarkModeProvider from './DarkModeProvider'
import { GlobalProp } from '../models/Props'
import useRtl from '../hooks/useRtl'
import useVh from '../hooks/useVh'
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

const GlobalProvider: React.FC<GlobalProp> = ({ children }) => {
    useRtl()
    useVh()
    return (
        <DndProvider options={HTML5toTouch}>
            <DarkModeProvider>
                <OnlineProvider>
                    {children}
                </OnlineProvider>
            </DarkModeProvider>
        </DndProvider>
    )
}

export default GlobalProvider