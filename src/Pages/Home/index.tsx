import React, { useState } from 'react'

import {
  MenuPage,
  TableAssociation,
  TableRequeriment,
  TableRequerimentCompleted,
} from '../../components'
import { HeaderContent } from './components/HeaderContent'
import { ContainerHome, ContainerMainList, ContentRequeriement } from './style'

export const Home = () => {
  const [formTable, setFormTable] = useState('')

  return (
    <ContainerHome>
      <MenuPage />
      <ContentRequeriement>
        <ContainerMainList>
          <HeaderContent formTable={formTable} setFormTable={setFormTable} />
          {(formTable === 'Listas-Instancias' && <TableAssociation />) ||
            (formTable === '' && <TableAssociation />) ||
            (formTable === 'Listas-Exigências' && <TableRequeriment />) ||
            (formTable === 'Exigências-Concluídas' && (
              <TableRequerimentCompleted />
            ))}
        </ContainerMainList>
      </ContentRequeriement>
    </ContainerHome>
  )
}
