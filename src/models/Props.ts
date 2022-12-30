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

export interface InputProp {
    icon?: React.ReactNode,
    placeholder: string,
    type?: string,
    value: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
    name: string
}

export interface UseLoginProp {
    email: string;
    password: string;
}