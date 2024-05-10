//create redux store
import {configureStore} from '@reduxjs/toolkit'
import userAuthorReducer from './slices/userauthorslice'

export const store=configureStore({
    reducer:{
        userAuthorLoginReducer:userAuthorReducer
    }
})