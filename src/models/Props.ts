import React from "react"
import type { AppProps } from 'next/app'
import { EmotionCache } from '@emotion/react';
import { SelectChangeEvent } from '@mui/material/Select';

interface children {
    children: React.ReactElement
}

export interface OnLineProp extends children {

}

export interface GlobalProp extends children {

}

export interface DarkModeProp extends children { }

export interface MiniDrawerProp extends children { }

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

export interface CheckButtonProp {
    onIcon: React.ReactElement;
    offIcon: React.ReactElement;
    htmlFor: string;
    isOn: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface DarkModeProviderProp {
    theme: string | null | undefined;
    toggleTheme: React.ChangeEventHandler<HTMLInputElement>;
}

export interface AccountMenuProp {
    theme: string | null | undefined;
    toggleTheme: React.ChangeEventHandler<HTMLInputElement>;
}

export interface SelectLabelsProp {
    value: { fa: string; en: string; };
    labels: { fa: string; en: string; }[];
    height?: string;
    minWidth?: number;
    maxWidth?: number;
    onChange?: ((event: SelectChangeEvent<any>, child: React.ReactNode) => void) | undefined;
}

export interface LinkButtonProp {
    href: string;
    text: string;
    className?: string;
}

export interface SearchInputProp {
    placeHolder: string;
    value: string;
    className?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface InstructorCourseCardProp {
    title: { fa: string, en: string };
    src: string;
    rate: number;
    numberOfRate: number;
    numberOfStudent: number;
}

export interface StepperProp extends children { }

export interface StepOneProp extends children { }

export interface StepTwoProp extends children { }

export interface StepThreeProp extends children { }


export interface StepOneOptionCardProp {
    icon: React.ReactNode;
    type: string;
    description: string;
    isActive: boolean;
    index: number;
    onClick: (index: number) => void
}