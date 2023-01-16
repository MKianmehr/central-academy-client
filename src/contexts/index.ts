import { createContext } from "react";
import {
    DarkModeProviderProp,
    SubSectionContextProp,
    SectionContextProp,
    CurriculumContextProp
} from '../models/Props'

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
    subSectionOptions: [{ fa: "", en: "" }],
    index: 0
})

export const CurriculumContext = createContext<CurriculumContextProp>(
    {
        onDragSection: () => { },
        onDragSubSection: () => { },
        sections: [],
        handleAddSection: () => { return false },
        handleEditSection: () => { return false },
        handleDeleteSection: () => { return false },
        handleDeleteSubSection: () => { return false }
    }
)
