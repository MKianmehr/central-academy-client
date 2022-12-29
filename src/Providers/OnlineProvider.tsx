import React, { useState, useEffect, createContext } from 'react'
import { OnLineProp } from '../models/Props'
import { OnLineContext } from '../contexts'


const OnlineProvider: React.FC<OnLineProp> = ({ children }) => {
    const [isOnline, setIsOnline] = useState<boolean>(true)

    useEffect(() => {
        // Update network status
        const handleStatusChange = (): void => {
            setIsOnline(navigator.onLine);
        };
        // Listen to the online status
        window.addEventListener('online', handleStatusChange);

        // Listen to the offline status
        window.addEventListener('offline', handleStatusChange);

        // Specify how to clean up after this effect for performance improvment
        return () => {
            window.removeEventListener('online', handleStatusChange);
            window.removeEventListener('offline', handleStatusChange);
        };
    }, [isOnline])
    return (
        <OnLineContext.Provider value={isOnline}>
            {children}
        </OnLineContext.Provider>
    )
}

export default OnlineProvider