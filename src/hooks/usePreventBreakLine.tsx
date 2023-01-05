import React, { useEffect, RefObject } from 'react'


const usePreventBreakLine = (ref: RefObject<HTMLTextAreaElement>) => {
    useEffect(() => {

        function handleKeyDown(event: globalThis.KeyboardEvent) {
            if (event.key === 'Enter') {
                event.preventDefault();
            }
        }
        if (ref.current) {
            ref.current.addEventListener('keydown', handleKeyDown);
            return () => {
                ref.current && ref.current.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [])
}

export default usePreventBreakLine