import * as Dialog from '@radix-ui/react-dialog'
import { PlusCircle, X } from 'phosphor-react'
import React, { useEffect, useState } from 'react'

import { CreateUserModal } from '../CreateUserModal'
import { ContainerButton } from '../MenuPage/style'
import { TextRegular } from '../typography'
import { Container } from './styles'

interface MenuProps {
  menuIsVisible: boolean
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const MenuMobile = ({ menuIsVisible, setMenuIsVisible }: MenuProps) => {
  useEffect(() => {
    document.body.style.overflowY = menuIsVisible ? 'hidden' : 'auto'
  }, [menuIsVisible])

  const [menuSelected2, setmenuSelectd2] = useState(false)

  const handleIsSelected2 = () => {
    setMenuIsVisible(false)
    setmenuSelectd2(true)
  }
  return (
    <Container isVisible={menuIsVisible}>
      <X size={32} onClick={() => setMenuIsVisible(false)} />
      <nav>
        <a href="#">Requerimentos</a>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <ContainerButton
              selected={menuSelected2}
              onClick={handleIsSelected2}
            >
              <PlusCircle size={32} />
              <TextRegular size="l">Adicionar Usuários</TextRegular>
            </ContainerButton>
          </Dialog.Trigger>
          <CreateUserModal />
        </Dialog.Root>
      </nav>
    </Container>
  )
}
