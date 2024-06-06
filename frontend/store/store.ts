import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { ThunkAction, Action } from "@reduxjs/toolkit";
import { themeReducer } from "./Theme/reducer";


const rootReducer = combineReducers({
    theme: themeReducer,
})

const store = configureStore({
    reducer: rootReducer
})

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action<string>
    
>

export {
    store as appStore
}


