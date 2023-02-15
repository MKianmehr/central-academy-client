import React, { useCallback, useState } from 'react'
import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd-multi-backend'
import { HTML5toTouch } from 'rdndmb-html5-to-touch'

// Props imports
import { GlobalProp } from '../models/Props'

// Components Imports
import OnlineProvider from './OnlineProvider'
import DarkModeProvider from './DarkModeProvider'
import useRtl from '../hooks/useRtl'
import useVh from '../hooks/useVh'

// MUI Imports
import { LinearProgress } from '@mui/material';

// Context imports
import { GlobalContext } from '../contexts';

// Services
import UserService from '../services/user.service';
import CourseService from '../services/course.service';

// Style provider
import 'react-toastify/dist/ReactToastify.css';
import LessonService from '../services/lesson.service';

const GlobalProvider: React.FC<GlobalProp> = ({ children }) => {
    const [loading, setLoading] = useState(false)

    useRtl()
    useVh()
    const onLoad = useCallback((loading: boolean) => {
        setLoading(loading)
    }, [])

    const {
        signIn,
        signUp,
        signOut,
        forgetPassword,
        emailPasswordChange,
        becomeInstructor,
        getUserLoading,
    } = UserService(onLoad)

    const {
        createCourse,
        getCourses,
        uploadImage
    } = CourseService(onLoad)

    const {
        addLesson,
        editLesson,
    } = LessonService(onLoad)

    return (
        <GlobalContext.Provider value={
            {
                loading,
                onLoad,
                signIn,
                signUp,
                signOut,
                forgetPassword,
                emailPasswordChange,
                becomeInstructor,
                getUserLoading,
                createCourse,
                getCourses,
                uploadImage,
                addLesson,
                editLesson,
            }}>
            <DndProvider options={HTML5toTouch}>
                <DarkModeProvider>
                    <OnlineProvider>
                        <>
                            {loading && <LinearProgress sx={{ zIndex: 1000 }} />}
                            <ToastContainer position='bottom-right' />
                            {children}
                        </>
                    </OnlineProvider>
                </DarkModeProvider>
            </DndProvider>
        </GlobalContext.Provider>

    )
}

export default GlobalProvider