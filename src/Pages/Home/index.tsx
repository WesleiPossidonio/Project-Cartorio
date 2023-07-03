// import { useRequeriment } from '../../hooks/useRequeriment'
import React from 'react'

import { TableRequeriment } from '../../components/ListRequeriment'
import { MenuPage } from '../../components/MenuPage'
import { HeaderContent } from './components/HeaderContent'
import { ContainerHome, ContainerMainList, ContentRequeriement } from './style'

export const Home = () => {
  return (
    <ContainerHome>
      <MenuPage />
      <ContentRequeriement>
        <ContainerMainList>
          <HeaderContent />
          <TableRequeriment />
        </ContainerMainList>
      </ContentRequeriement>
    </ContainerHome>
  )
}
