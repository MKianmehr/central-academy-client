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

export interface StepperChildProp {
    onNextClick: () => boolean;
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
    section?: LessonInterface;
    subSections?: LessonInterface[];
}

export interface CourseSubSectionProp {
    content: LessonInterface;
    index: number;
    sectionIndex: number;
}

export interface SubContentTypeProp {
    icon: React.ReactNode;
    type: string;
    onClick: (type: string) => void
}

export interface SubSectionContextProp {
    onContentButtonClick: () => void;
    onResourseButtonClick: () => void;
    subSectionOptions: string[];
    OnClickContentType: (title: string) => void;
    _class?: string;
    content: LessonInterface;
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
    curriculumItems: LessonInterface[];
    handleAddCurriculumItem: ({ data, index }: { data: AddCurriculumItem; index: number; }) => Promise<boolean>;
    handleEditCurriculumItem: ({ data, index }: { data: EditCurriculumItem; index: number; }) => Promise<boolean>;
    handleDeleteCurriculumItem: ({ index }: {
        index: number;
    }) => Promise<boolean>;

    handleUploadVideo: ({ lessonId, videoData, handleProgress }: {
        lessonId: string;
        videoData: File;
        handleProgress: (status: number) => void;
    }) => Promise<{
        success: boolean;
        message: string;
    }>;
}

export interface DragDropSubSection {
    currentSectionIndex: number;
    index: number;
    type: string;
    _id: string;
}

export interface DragDropSection {
    index: number;
    type: string;
    _id: string;
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
    section?: LessonInterface;
    index: number;
}

export interface AddSubSectionContentTypeProp {
    handleClickOnTypeIcon: (type: string) => void; typeOptions: {
        video: string;
        slide: string;
        article: string;
        questions: string;

    }
}

export interface FileInputProp {
    type: string;
    description?: string;
    fileName?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
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

export interface SimpleQuiz {
    _class: _Class;
    type?: _type;
    index: number;
    handleCloseSubSectionOption: () => void;
    content?: LessonInterface;
    closeBeforeSubSection?: () => void;
}

export interface LCAProp {
    _class: _Class;
    type?: _type;
    handleCloseSubSectionOption: () => void;
    content?: LessonInterface;
    index: number;
    closeBeforeSubSection?: () => void;
}

enum Role {
    Subscriber = 'subscriber',
    Instructor = 'instructor',
    Admin = 'admin'
}

export interface User {
    _id: string;
    email: string;
    picture: string;
    role: String[],
    stripe_account_id: string;
}

export interface UserServiceInterface {
    signUp: (email: string, password: string, loading: (loading: boolean) => void) => Promise<void>;
    signIn: (email: string, password: string, loading: (loading: boolean) => void) => Promise<void>;
    signOut: () => void;
    forgetPassword: (email: string, loading: (loading: boolean) => void) => Promise<{
        success: boolean;
        message: string;
    }>;
    emailPasswordChange: (password: string, resetCode: string, loading: (loading: boolean) => void) => Promise<{
        success: boolean;
        message: any;
    }>;
    becomeInstructor: (loading: (loading: boolean) => void) => Promise<void>;
    getUserLoading: boolean;
}

export interface GlobalContextProp {
    loading: boolean;
    onLoad: (loading: boolean) => void;
    signIn: (email: string, password: string, loading: (loading: boolean) => void) => Promise<void>;
    signUp: (email: string, password: string, loading: (loading: boolean) => void) => Promise<void>;
    getUserLoading: boolean;
    signOut: () => void;
    forgetPassword: (email: string, loading: (loading: boolean) => void) => Promise<{
        success: boolean;
        message: string;
    }>;
    emailPasswordChange: (password: string, resetCode: string, loading: (loading: boolean) => void) => Promise<{
        success: boolean;
        message: any;
    }>;
    becomeInstructor: (loading: (loading: boolean) => void) => Promise<void>;

    createCourse: (name: string, category: string, loading: (loading: boolean) => void) => Promise<{
        success: boolean;
        message: string;
    }>;
    getCourses: (loading: (loading: boolean) => void) => Promise<void>;
    uploadImage: (image: string, courseId: string, loading: (loading: boolean) => void) => Promise<{
        success: boolean;
        message: string;
    }>;

    addLesson: ({ loading, ...updatedFields }: AddLessonInterface) => Promise<{
        success: boolean;
        message: string;
        lesson?: LessonInterface;
    }>;

    editLesson: ({ loading, ...updatedFields }: EditLessonInterface) => Promise<{
        success: boolean;
        message: string;
        lesson?: LessonInterface | undefined;
    }>;

    updateLessonsOrder: ({ courseId, lessons, loading }: {
        courseId: string;
        lessons: LessonInterface[];
        loading: (loading: boolean) => void;
    }) => Promise<{
        success: boolean;
        message: string;
    }>;

    deleteLesson: ({ courseId, index, loading }: {
        courseId: string;
        index: number;
        loading: (loading: boolean) => void;
    }) => Promise<{
        success: boolean;
        message: string;
    }>;

    uploadVideo: ({ courseId, lessonId, videoData, handleProgress }: UploadVideoInterface) => Promise<{
        success: boolean;
        message: string;
    }>;
}

export interface CustomEventForCustomSelect {
    target: { value: { [key: string]: string } }
}
export interface CustomSelectProps {
    value: { [key: string]: string };
    values: { [key: string]: string }[];
    onChange: (e: CustomEventForCustomSelect) => void;
    className?: string;
}

export interface KeyValue {
    [key: string]: string
}

export interface CourseServiceInterface {
    createCourse: (name: string, category: string, loading: (loading: boolean) => void) => Promise<{ success: boolean, message: string }>;
    getCourses: (loading: (loading: boolean) => void) => Promise<void>;
    uploadImage: (image: string, courseId: string, loading: (loading: boolean) => void) => Promise<{
        success: boolean;
        message: string;
    }>;
}


export interface AddLessonInterface {
    _class: _Class;
    title: string;
    courseId: string;
    index: number;
    loading: (loading: boolean) => void;
    description?: string;
    type?: _type;
}

export interface EditLessonInterface {
    title?: string;
    description?: string;
    courseId: string;
    lessonId: string;
    loading: (loading: boolean) => void;
}
export interface LessonServiceInterface {
    addLesson: ({ loading, ...updatedFields }: AddLessonInterface) => Promise<{
        success: boolean;
        message: string;
        lesson?: LessonInterface;
    }>;

    editLesson: ({ loading, ...updatedFields }: EditLessonInterface) => Promise<{
        success: boolean;
        message: string;
        lesson?: LessonInterface;
    }>;

    updateLessonsOrder: ({ courseId, lessons, loading }: {
        courseId: string;
        lessons: LessonInterface[];
        loading: (loading: boolean) => void;
    }) => Promise<{
        success: boolean;
        message: string;
    }>;

    deleteLesson: ({ courseId, index, loading }: {
        courseId: string;
        index: number;
        loading: (loading: boolean) => void;
    }) => Promise<{
        success: boolean;
        message: string;
    }>;
}



export enum _Class {
    Chapter = 'chapter',
    Quiz = 'quiz',
    Practice = 'practice',
    Lecture = 'lecture',
    Asset = "asset",
}

export enum _type {
    Quiz = "quiz",
    CodingExercise = "coding-exercise",
}

export enum AssetType {
    Video = "video",
    File = "file",
    Article = "article"
}
export interface AssetInterface {

    _id: string;

    _class: _Class;

    title: string;

    asset_type: AssetType;

    thumbnail_url: {};

    source_url: {};

    content_summary: string;

    time_estimation: number;

    processing_errors: []
}

export interface LessonInterface {

    _id: string;

    _class: _Class;

    title: string;

    type?: _type;

    description: string;

    is_published?: boolean;

    is_draft?: boolean;

    duration?: number;

    pass_percent?: number;

    num_assessments?: number;

    is_downloadable?: boolean;

    is_free?: boolean;

    asset?: Asset;

    supplementary_assets?: Asset[];

    slug?: string;

    content?: {};

    video_link?: {};

    free_preview?: boolean;
}

export interface CourseInterface {

    _id: string;

    name: string;

    slug: string;

    description: string;

    price: number;

    image: {
        Location: string;
    };

    category: string;

    published: boolean;

    paid: boolean;

    instructor: string;

    lessons: LessonInterface[];
}


export interface AddCurriculumItem {

    _class: _Class;

    title: string;

    type?: _type;

    description?: string;

}

export interface EditCurriculumItem {

    title?: string;

    description?: string;

    lessonId: string;

    targetIndex?: number;

}

export interface UploadVideoInterface {
    courseId: string;
    lessonId: string;
    videoData: File;
    handleProgress: (status: number) => void;
}


export interface AssetServiceInterface {
    uploadVideo: ({ courseId, lessonId, videoData, handleProgress }: UploadVideoInterface) => Promise<{
        success: boolean;
        message: string;
    }>;
}