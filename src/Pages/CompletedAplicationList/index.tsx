import React from 'react'

import { MenuPage, TableRequerimentCompleted } from '../../components'
import { HeaderContent } from './components/HeaderContent'
import { ContainerHome, ContainerMainList, ContentRequeriement } from './style'

export const CompletedAplicationList = () => {
  return (
    <ContainerHome>
      <MenuPage />
      <ContentRequeriement>
        <ContainerMainList>
          <HeaderContent />
          <TableRequerimentCompleted />
        </ContainerMainList>
      </ContentRequeriement>
    </ContainerHome>
  )
}
