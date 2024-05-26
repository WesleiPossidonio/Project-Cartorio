import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React from 'react'

import { FormCreateAssociation } from './components/CreateFormAssociation'
import { CloseButton, Content, Overlay } from './style'

export const CreateAssociationModal = () => {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Iniciar Instancia</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <FormCreateAssociation />
      </Content>
    </Dialog.Portal>
  )
}
