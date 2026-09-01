import React from 'react'
import { HeaderContent } from './components/HeaderContent'
import { ContainerHome, ContainerMainList, ContentRequeriement } from './style'
import { MenuPage, TableRequerimentCompleted } from '../../components'

export const CompletedAplicationList = () => {
  return (
    <ContainerHome>
      <MenuPage  />
      <ContentRequeriement>
        <ContainerMainList>
          <HeaderContent />
          <TableRequerimentCompleted />
        </ContainerMainList>
      </ContentRequeriement>
    </ContainerHome>
  )
}
