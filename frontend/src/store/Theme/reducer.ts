import { ThemeState, ThemeAction } from "./types"

const themeInitState: ThemeState = {
    theme: 'dark'
}

export const themeReducer = (state = themeInitState, action: ThemeAction): ThemeState => {
    switch(action.type){
        case 'light':
            return{
                theme: 'light'
            }
        case 'dark':
            return{
                theme: 'dark'
            }
        default:
            return state    
    }
}