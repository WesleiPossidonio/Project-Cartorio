import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'phosphor-react'
import React from 'react'

import { FormCreateRequeriment } from './Components/CreateRequeriment'
import { CloseButton, Content, Overlay } from './style'

export const CreateRequerimentModal = () => {
  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Criar Exigências</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <FormCreateRequeriment />
      </Content>
    </Dialog.Portal>
  )
}
