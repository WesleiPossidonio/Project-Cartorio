import * as Dialog from '@radix-ui/react-dialog'
import { PlusCircle, User, X } from 'phosphor-react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useUser } from '../../hooks/useUser'
import { CreateUserModal } from '../CreateUserModal'
import { TextRegular } from '../typography'
import {
  ButtonMobile,
  Container,
  ContainerButton,
  ContentName,
  ContentUser,
  DataUserName,
  Line,
} from './styles'

interface MenuProps {
  menuIsVisible: boolean
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuMobile = ({ menuIsVisible, setMenuIsVisible }: MenuProps) => {
  const navigate = useNavigate()

  const { userDataLogin } = useUser()

  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto'
  }, [menuIsVisible])

  const [menuSelected2, setmenuSelectd2] = useState(false)

  const handleIsSelected2 = () => {
    setMenuIsVisible(false)
    setmenuSelectd2(true)
  }

  const handleGoOut = () => {
    localStorage.removeItem('cartorio:userData1.0')
    navigate('/login')
  }
  return (
    <Container isVisible={menuIsVisible}>
      <X size={32} onClick={() => setMenuIsVisible(false)} />
      <nav>
        <ContentUser>
          <User fontSize={32} />
          <Line></Line>
          <DataUserName>
            <ContentName>
              <TextRegular>Olá,</TextRegular>
              <TextRegular weight={700} onClick={handleGoOut}>
                Sair
              </TextRegular>
            </ContentName>
            <TextRegular size="l">Dr. {userDataLogin?.name}</TextRegular>
          </DataUserName>
        </ContentUser>

        <ButtonMobile href="#">
          <PlusCircle size={32} />
          Requerimentos
        </ButtonMobile>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ContainerButton
              selected={menuSelected2}
              onClick={handleIsSelected2}
            >
              <PlusCircle size={32} />
              <TextRegular size="l" weight={700}>
                Adicionar Usuários
              </TextRegular>
            </ContainerButton>
          </Dialog.Trigger>
          <CreateUserModal />
        </Dialog.Root>
      </nav>
    </Container>
  )
}
