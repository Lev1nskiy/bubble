import { ThemeAction } from "./types"

export const setLightThemeAction = (): ThemeAction => ({
    type: 'light'
})

export const setDarkThemeAction = (): ThemeAction => ({
    type: 'dark'
})