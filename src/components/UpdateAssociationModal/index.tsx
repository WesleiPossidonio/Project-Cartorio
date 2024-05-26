import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React from 'react'

import { useRequeriment } from '../../hooks/useRequeriment'
import { FormUpdateAssociation } from './Components/UpdateFormAssociation'
import { CloseButton, Content, ContentRequeriment, Overlay } from './style'

interface RequerimentProps {
  AssociationId: number
}

export const UpdateAssociationModal = ({ AssociationId }: RequerimentProps) => {
  const { dataListAssociation } = useRequeriment()

  const associationSelected = dataListAssociation.find(
    (list) => list.id === AssociationId
  )

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Atualizar Instância</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <ContentRequeriment>
          <FormUpdateAssociation dataAssociation={associationSelected} />
        </ContentRequeriment>
      </Content>
    </Dialog.Portal>
  )
}
