import { configureStore } from '@reduxjs/toolkit'
import createCourseStepReducer from '../slices/createCourseStepSlice'
import userReducer from '../slices/userSlice'
import courseReducer from '../slices/courseSlice'

const store = configureStore({
    reducer: {
        createCourseSteps: createCourseStepReducer,
        user: userReducer,
        courses: courseReducer,
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store