import React from "react"
import type { AppProps } from 'next/app'
import { EmotionCache } from '@emotion/react';

interface children {
    children: React.ReactElement
}

export interface OnLineProp extends children {

}

export interface GlobalProp extends children {

}

export interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
}
