
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import goalReducer from "../features/goals/goalSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        goals: goalReducer,
    }
})