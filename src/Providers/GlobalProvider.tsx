import React, { useCallback, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

// Props imports
import { GlobalProp } from '../models/Props'

// Components Imports
import OnlineProvider from './OnlineProvider'
import DarkModeProvider from './DarkModeProvider'
import useRtl from '../hooks/useRtl'
import useVh from '../hooks/useVh'

// Context imports
import { GlobalContext } from '../contexts';

// Style provider
import 'react-toastify/dist/ReactToastify.css';

const GlobalProvider: React.FC<GlobalProp> = ({ children }) => {
    const [loading, setLoading] = useState(false)

    useRtl()
    useVh()

    const onLoad = useCallback((loading: boolean) => {
        setLoading(loading)
    }, [])

    return (
        <GlobalContext.Provider value={{ loading, onLoad }}>
            <DndProvider options={HTML5toTouch}>
                <DarkModeProvider>
                    <OnlineProvider>
                        <>
                            <ToastContainer position='bottom-right' />
                            {children}
                        </>
                    </OnlineProvider>
                </DarkModeProvider>
            </DndProvider>
        </GlobalContext.Provider>

    )
}

export default GlobalProvider