import React, { createContext } from "react";
import { DarkModeProviderProp } from '../models/Props'

export const OnLineContext = createContext<boolean>(true);
export const DarkModeContext = createContext<DarkModeProviderProp>({
    theme: "dark",
    toggleTheme: () => { }
})