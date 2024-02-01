import * as Dialog from '@radix-ui/react-dialog'
import { ClipboardText, PlusCircle } from 'phosphor-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../hooks/useUser'
import { CreateUserModal } from '../CreateUserModal'
import { TextRegular } from '../typography'
import { ContainerButton, MenuContainer } from './style'

export const MenuPage = () => {
  const [menuSelected1, setmenuSelectd1] = useState(false)
  const [menuSelected2, setmenuSelectd2] = useState(false)

  const { userDataLogin } = useUser()

  const navigate = useNavigate()

  const handleIsSelected = () => {
    setmenuSelectd1(true)
    setmenuSelectd2(false)

    navigate('/')
  }

  const handleIsSelected2 = () => {
    setmenuSelectd1(false)
    setmenuSelectd2(true)
  }

  return (
    <MenuContainer>
      <ContainerButton selected={menuSelected1} onClick={handleIsSelected}>
        <ClipboardText size={32} />
        <TextRegular size="l">Requerimentos</TextRegular>
      </ContainerButton>
      {userDataLogin.admin && (
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ContainerButton
              selected={menuSelected2}
              onClick={handleIsSelected2}
              isUserAdmin={userDataLogin.admin}
            >
              <PlusCircle size={32} />
              <TextRegular size="l">Adicionar Usuários</TextRegular>
            </ContainerButton>
          </Dialog.Trigger>
          <CreateUserModal />
        </Dialog.Root>
      )}
    </MenuContainer>
  )
}
