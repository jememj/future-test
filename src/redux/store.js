import { combineReducers, configureStore } from '@reduxjs/toolkit'
import bookSlice from "./bookSlice";

const rootReducer = combineReducers({
    bookSlice: bookSlice
})

const store = configureStore({
    reducer: rootReducer
})

export default store;