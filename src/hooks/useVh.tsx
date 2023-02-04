import React, { useEffect, useInsertionEffect, useLayoutEffect, useState } from 'react'


const useVh = () => {
    useInsertionEffect(() => {
        document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    })
    useEffect(() => {
        const handleResize = () => {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
        }
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener('resize', handleResize);
        // Then we set the value in the --vh custom property to the root of the document
    }, [(typeof window) === "object" && window.innerHeight]);
}

export default useVh