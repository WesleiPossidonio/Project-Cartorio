import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React from 'react'

import { FormCreateRequeriment } from './Components/CreateRequeriment'
import { CloseButton, Content, ContentRequeriment, Overlay } from './style'

interface RequerimentProps {
  AssociationId: number
}

export const CreateRequerimentModal = ({ AssociationId }: RequerimentProps) => {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Adicionar Exigências</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <ContentRequeriment>
          <FormCreateRequeriment id={AssociationId} />
        </ContentRequeriment>
      </Content>
    </Dialog.Portal>
  )
}
