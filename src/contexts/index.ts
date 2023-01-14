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

interface CurriculumContextProp {
    onDragSection: ({ currentIndex, targetIndex }: {
        currentIndex: number;
        targetIndex: number;
    }) => void;
    onDragSubSection: ({ currentPosition, targetPosition }: {
        currentPosition: {
            sectionIndex: number;
            currentIndex: number;
        };
        targetPosition: {
            sectionIndex: number;
            index: number;
        };
    }) => void;
    sections: {
        title: {
            fa: string;
            en: string;
        };
        subSections: {
            title: {
                fa: string;
                en: string;
            };
            type: {
                fa: string;
                en: string;
            };
            _id: number;
        }[];
        _id: number;
    }[]

}

export const CurriculumContext = createContext<CurriculumContextProp>({ onDragSection: () => { }, onDragSubSection: () => { }, sections: [] })
