import React, { useEffect, useState } from 'react'

const useVh = () => {
    const [vh, setVh] = useState<number>()
    useEffect(() => {
        setVh(window.innerHeight * 0.01)
        const handleResize = () => {
            setVh(window.innerHeight * 0.01)
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener('resize', handleResize);
        // Then we set the value in the --vh custom property to the root of the document
    }, [(typeof window) === "object" && window.innerHeight])

    useEffect(() => {
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }, [vh])

    return vh
}

export default useVh