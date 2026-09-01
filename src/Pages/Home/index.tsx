import React, { useState } from 'react'

import {
  ListUsers,
  MenuPage,
  TableAssociation,
  TableRequeriment,
  TableRequerimentCompleted,
} from '../../components'
import { HeaderContent } from './components/HeaderContent'
import { ContainerHome, ContainerMainList, Content } from './style'

export const Home = () => {
  const [formTable, setFormTable] = useState('')
  const [linkMenuSelected, setLinkMenuSelected] = useState({
    page: 'Home',
    modal: ''
  })

  return (
    <ContainerHome>
      <MenuPage linkMenuSelected={linkMenuSelected} setLinkMenuSelected={setLinkMenuSelected} />
    {
      linkMenuSelected.page === 'Usuários' && (
           <Content>
            <ContainerMainList>
              <HeaderContent formTable={formTable} setFormTable={setFormTable} title="Lista de Usuários" page="Usuários" />
              <ListUsers />
            </ContainerMainList>
           </Content>
      ) ||  linkMenuSelected.page === 'Home' && (
          <Content>
            <ContainerMainList>
              <HeaderContent formTable={formTable} setFormTable={setFormTable} title="Lista de Requerimentos" page="Requeriments" />
              {(formTable === 'Listas-Instancias' && <TableAssociation />) ||
                (formTable === '' && <TableAssociation />) ||
                (formTable === 'Listas-Exigências' && <TableRequeriment />) ||
                (formTable === 'Exigências-Concluídas' && (
                  <TableRequerimentCompleted />
                ))}
            </ContainerMainList>
          </Content>
      )
    }
    </ContainerHome>
  )
}
