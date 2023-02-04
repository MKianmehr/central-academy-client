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
import UserService from '../services/user.service';

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

    const {
        signIn,
        signUp,
        signOut,
        forgetPassword,
        emailPasswordChange,
        getUserLoading,
    } = UserService(onLoad)

    return (
        <GlobalContext.Provider value={
            {
                loading,
                onLoad,
                signIn,
                signUp,
                signOut,
                forgetPassword,
                emailPasswordChange,
                getUserLoading,
            }}>
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