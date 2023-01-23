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
        subSectionOptions: [],
        OnClickContentType: () => { }
    }
)

export const SectionContext = createContext<SectionContextProp>({
    subSectionOptions: [],
    index: 0
})

export const CurriculumContext = createContext<CurriculumContextProp>(
    {
        onDragSection: () => { },
        onDragSubSection: () => { },
        curriculumItems: [],
        handleAddCurriculumItem: () => { return false },
        handleEditCurriculumItem: () => { return false },
        handleDeleteCurriculumItem: () => { return false },
    }
)
