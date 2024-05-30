import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React from 'react'

import { AssociationProps } from '../../contexts/RequerimentContext'
import { ListRequerimentCompleted } from './components/ListRequerimentCompleted'
import { CloseButton, Content, Overlay } from './style'

interface RequerimentListCompletedModalProps {
  idRequerimentSelected: number
  listCompleted: AssociationProps[]
}

export const RequerimentListCompletedModal = ({
  idRequerimentSelected,
  listCompleted,
}: RequerimentListCompletedModalProps) => {
  const curatedList = listCompleted.find(
    (data) => data.id === idRequerimentSelected
  )

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Informações da Instituição</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <ListRequerimentCompleted RequerimentCompleted={curatedList} />
      </Content>
    </Dialog.Portal>
  )
}
