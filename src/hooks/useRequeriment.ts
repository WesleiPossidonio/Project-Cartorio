import { useContext } from 'react'

import { RequerimentContext } from '../contexts/RequerimentContext'

export const useRequeriment = () => {
  const context = useContext(RequerimentContext)
  return context
}
