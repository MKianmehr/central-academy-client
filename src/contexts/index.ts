import { createContext } from "react";
import {
    DarkModeProviderProp,
    SubSectionContextProp,
    SectionContextProp,
    CurriculumContextProp,
    GlobalContextProp,
    CourseInterface,
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
        OnClickContentType: () => { },
        _class: "",
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
        handleAddCurriculumItem: async () => { return false },
        handleEditCurriculumItem: async () => { return false },
        handleDeleteCurriculumItem: () => { return false },
    }
)


export const GlobalContext = createContext<GlobalContextProp>({
    loading: false,
    onLoad: () => { },
    signIn: async () => { },
    signUp: async () => { },
    getUserLoading: true,
    signOut: async () => { },
    forgetPassword: async () => {
        return { success: false, message: "" }
    },
    emailPasswordChange: async () => { return { success: false, message: "" } },
    becomeInstructor: async () => { },
    createCourse: async () => {
        return { success: false, message: "" }
    },
    getCourses: async () => { },
    uploadImage: async () => { return { success: false, message: "" } },
    addLesson: async () => { return { success: false, message: "" } },
    editLesson: async () => { return { success: false, message: "" } },
    updateLessonsOrder: async () => { return { success: false, message: "" } }
})


export const EditCourseContext = createContext<{ course: CourseInterface }>({
    course: { _id: "", name: "", slug: "", description: "", price: 0, image: { Location: "" }, category: "", published: false, paid: false, instructor: "", lessons: [] }
})