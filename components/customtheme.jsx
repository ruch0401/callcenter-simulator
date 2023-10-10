import React from 'react'

import {createTheme, ThemeProvider} from '@mui/material/styles'

import useAppStore from '../stores/appstore'

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
    }
})

const lightTheme = createTheme({
    palette: {
        mode: 'light',
    }
})

export default function CustomTheme({children}) {

    const isDarkMode = useAppStore((state) => state.darkMode)

    return (
        <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
            {children}
        </ThemeProvider>
    )
}