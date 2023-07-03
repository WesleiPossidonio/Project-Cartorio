import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { ThemeProvider } from 'styled-components'
import 'react-toastify/dist/ReactToastify.css'

import { AppProvider } from './contexts'
import { Router } from './routes/routes'
import { GlobalStyle } from './styles/global'
import { defaultThemes } from './styles/theme/default'

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={defaultThemes}>
        <AppProvider>
          <ToastContainer />
          <Router />
          <GlobalStyle />
        </AppProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
