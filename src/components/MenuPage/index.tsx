import * as Dialog from '@radix-ui/react-dialog'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../hooks/useUser'
import { CreateRequerimentModal } from '../CreateRequerimentModal'
import { CreateUserModal } from '../CreateUserModal'
import { TextRegular } from '../typography'
import { ContainerButton, MenuContainer } from './style'

export const MenuPage = () => {
  const [linkMenuSelected, setLinkMenuSelected] = useState('')

  const { userDataLogin } = useUser()

  const navigate = useNavigate()

  const handleIsSelected = (data: string) => {
    if (data === 'Home') {
      setLinkMenuSelected(data)
      navigate('/')
    }
    if (data === 'addUser') {
      setLinkMenuSelected(data)
    }
    if (data === 'addRequeriment') {
      setLinkMenuSelected(data)
    }
  }

  return (
    <MenuContainer>
      <ContainerButton
        selected={linkMenuSelected === 'Home' && true}
        onClick={() => handleIsSelected('Home')}
      >
        <ClipboardText size={32} />
        <TextRegular size="m">Requerimentos</TextRegular>
      </ContainerButton>
      {userDataLogin.admin && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ContainerButton
              selected={linkMenuSelected === 'addUser' && true}
              onClick={() => handleIsSelected('addUser')}
              isUserAdmin={userDataLogin.admin}
            >
              <PlusCircle size={32} />
              <TextRegular size="m">Adicionar Usuários</TextRegular>
            </ContainerButton>
          </Dialog.Trigger>
          <CreateUserModal />
        </Dialog.Root>
      )}

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ContainerButton
            selected={linkMenuSelected === 'addRequeriment' && true}
            onClick={() => handleIsSelected('addRequeriment')}
          >
            <PlusCircle size={32} />
            <TextRegular size="m">Adicionar Exigência</TextRegular>
          </ContainerButton>
        </Dialog.Trigger>
        <CreateRequerimentModal />
      </Dialog.Root>
    </MenuContainer>
  )
}
