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
    title: string;
    src: string;
    rate: number;
    numberOfRate: number;
    numberOfStudent: number;
}

export interface StepperProp extends children { }

export interface StepperChildProp {
    onNextButtonClick: () => boolean;
    title?: string;
    isOkay?: string;
}
export interface StepOneOptionCardProp {
    icon: React.ReactNode;
    type: string;
    description: string;
    isActive: boolean;
    index: number;
    onClick: (index: number) => void
}

export type EditCourseMenuProp = {
    header: {
        fa: string;
        en: string;
    };
    sublists: {
        link: string;
        text: {
            fa: string;
            en: string;
        };
    }[];
}[]

export interface CourseSectionProp {
    index: number;
    indexToShow: number;
    section?: CurriculumItem;
    subSections?: CurriculumItem[];
}

export interface CourseSubSectionProp {
    content: CurriculumItem;
    index: number;
    sectionIndex: number;
}

export interface SubContentTypeProp {
    icon: React.ReactNode;
    type: {
        fa: string;
        en: string;
    };
    onClick: (type: string) => void
}

export interface SubSectionContextProp {
    onContentButtonClick: () => void;
    onResourseButtonClick: () => void;
    subSectionOptions: string[];
    OnClickContentType: (title: string) => void;
}

export interface SectionContextProp {
    subSectionOptions: string[];
    index: number;
}

export interface CurriculumContextProp {
    onDragSection: ({ currentIndex, targetIndex }: {
        currentIndex: number;
        targetIndex: number;
    }) => void;
    onDragSubSection: ({ currentIndex, targetIndex }: {
        currentIndex: number;
        targetIndex: number;
        SubToSub: boolean;
        targetSectionIndex: number;
        currentSectionIndex: number;
    }) => void;
    curriculumItems: CurriculumItem[];
    handleAddCurriculumItem: ({ data, index }: { data: AddCurriculumItem; index: number }) => boolean;
    handleEditCurriculumItem: ({ data, index }: { data: CurriculumItem; index: number }) => boolean;
    handleDeleteCurriculumItem: ({ index }: { index: number }) => boolean;
}

export interface DragDropSubSection {
    currentSectionIndex: number;
    index: number;
    type: string;
    _id: number;
}

export interface DragDropSection {
    index: number;
    type: string;
    _id: number;
}

export interface SectionHeaderProps {
    index: number;
    indexToShow: number;
    title: string;
    handleEditSection: () => void;
    className?: string;
}

export interface AddSectionProp {
    onClick: () => void;
    title?: string;
    goal?: string;
    index: number;
}

export interface AddSubSectionContentTypeProp {
    handleClickOnTypeIcon: (type: string) => void; typeOptions: {
        video: {
            fa: string;
            en: string;
        };
        slide: {
            fa: string;
            en: string;
        };
        article: {
            fa: string;
            en: string;
        }
    }
}

export interface FileInputProp {
    type: {
        fa: string;
        en: string;
    };
    description: string;
}

export interface RemainingInputProp {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    maxLength: number;
    placeHolder: string;
    className?: string;
    errorValue?: string;
}

interface Asset {
    _class: string;
    _id: number;
    asset_type: string;
    title: string;
    created: string;
    status: number;
    body: string;
    thumbnail_url: string;
    source_url: string;
    content_summary: string;
    processing_errors: any[];
    time_estimation: number;
}



export interface CurriculumItem {
    _class?: string;
    _id?: number;
    title: string;
    description?: string;
    object_index?: number;
    type?: string;
    is_published?: boolean;
    is_draft?: boolean;
    duration?: number;
    pass_percent?: number;
    num_assessments?: number;
    requires_draft?: boolean;
    is_randomized?: boolean;
    is_downloadable?: boolean;
    is_free?: boolean;
    asset?: Asset;
    supplementary_assets?: Asset[];
}

export interface AddCurriculumItem extends CurriculumItem {
    _class: string;
}

export interface SimpleQuiz {
    type: string;
    index: number;
    handleCloseSubSectionOption: () => void;
    content?: CurriculumItem;
    closeBeforeSubSection: () => void;
}

export interface LCAProp {
    type: string;
    handleCloseSubSectionOption: () => void;
    content?: CurriculumItem;
    index: number;
    closeBeforeSubSection: () => void;
}
