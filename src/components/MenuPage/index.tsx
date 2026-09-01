import * as Dialog from '@radix-ui/react-dialog'
import {
  ClipboardText,
  PlusCircle,
  UserCircle,
  UserCirclePlus,
} from 'phosphor-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../hooks/useUser'
import { CreateAssociationModal } from '../CreateAssociationModal'
import { CreateUserModal } from '../CreateUserModal'
import { TextRegular } from '../typography'
import { UpdateUserModal } from '../UpdateUserDataModal'
import { ContainerButton, MenuContainer } from './style'

interface MenuPageProps {
  setLinkMenuSelected?: React.Dispatch<React.SetStateAction<{ page: string; modal: string }>>
  linkMenuSelected?: { page: string; modal: string }
}

export const MenuPage = ({ setLinkMenuSelected, linkMenuSelected }: MenuPageProps) => {

  const { userDataLogin } = useUser()
  const navigate = useNavigate()
  const handleIsSelected = (data: string) => {
    if (data === 'Home') {
      if (setLinkMenuSelected) {
        setLinkMenuSelected({ page: data, modal: '' })
      }
      navigate('/')
    }

    if (data === 'Usuários') {
      if (setLinkMenuSelected) {
        setLinkMenuSelected({ page: data, modal: '' })
      }
    }

    if (data === 'addUser') {
      if (setLinkMenuSelected) {
        setLinkMenuSelected({ page: 'Home', modal: data })
      }
    }

    if (data === 'addRequeriment') {
      setLinkMenuSelected?.({ page: 'Home', modal: data })
    }

    if (data === 'UpdateDataUser') {
      setLinkMenuSelected?.({ page: 'Home', modal: data })
    }
  }

  return (
    <MenuContainer>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ContainerButton
            selected={linkMenuSelected?.modal === 'UpdateDataUser' && true}
            onClick={() => handleIsSelected('UpdateDataUser')}
          >
            <UserCircle size={32} />
            <TextRegular size="m">Meus Dados</TextRegular>
          </ContainerButton>
        </Dialog.Trigger>
        <UpdateUserModal title='Meus Dados' />
      </Dialog.Root>

      <ContainerButton
        selected={linkMenuSelected?.page === 'Usuários' && true}
        onClick={() => handleIsSelected('Usuários')}
      >
        <ClipboardText size={32} />
        <TextRegular size="m">Usuários</TextRegular>
      </ContainerButton>

      <ContainerButton
        selected={linkMenuSelected?.page === 'Home' && true}
        onClick={() => handleIsSelected('Home')}
      >
        <ClipboardText size={32} />
        <TextRegular size="m">Requerimentos</TextRegular>
      </ContainerButton>

      {userDataLogin.admin && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ContainerButton
              selected={linkMenuSelected?.modal === 'addUser' && true}
              onClick={() => handleIsSelected('addUser')}
              isUserAdmin={userDataLogin.admin}
            >
              <UserCirclePlus size={32} />
              <TextRegular size="m">Adicionar Usuários</TextRegular>
            </ContainerButton>
          </Dialog.Trigger>
          <CreateUserModal />
        </Dialog.Root>
      )}

      <Dialog.Root>
        <Dialog.Trigger asChild>
          <ContainerButton
            selected={linkMenuSelected?.modal === 'addRequeriment' && true}
            onClick={() => handleIsSelected('addRequeriment')}
          >
            <PlusCircle size={32} />
            <TextRegular size="m">Iniciar Exâme</TextRegular>
          </ContainerButton>
        </Dialog.Trigger>
        <CreateAssociationModal />
      </Dialog.Root>
    </MenuContainer>
  )
}
