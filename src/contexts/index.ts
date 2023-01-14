import { createContext } from "react";
import { DarkModeProviderProp, SubSectionContextProp, SectionContextProp } from '../models/Props'

export const OnLineContext = createContext<boolean>(true);
export const DarkModeContext = createContext<DarkModeProviderProp>({
    theme: "dark",
    toggleTheme: () => { }
})


export const SubSectionContext = createContext<SubSectionContextProp>(
    {
        onContentButtonClick: () => { },
        onResourseButtonClick: () => { },
        subSectionOptions: [{ fa: "", en: "" }]
    }
)


export const SectionContext = createContext<SectionContextProp>({
    subSectionOptions: [{ fa: "", en: "" }]
})
