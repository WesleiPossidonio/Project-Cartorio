import React, { ReactNode } from 'react'

import { RequerimentContextProvider } from './RequerimentContext'
import { UserContextProvider } from './UserContext'

interface AppProviderProps {
  children: ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <UserContextProvider>
      <RequerimentContextProvider>{children}</RequerimentContextProvider>
    </UserContextProvider>
  )
}
