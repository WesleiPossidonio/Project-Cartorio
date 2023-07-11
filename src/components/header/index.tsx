import { List, User } from 'phosphor-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../assets/Logo-Cartorio.svg'
import { useUser } from '../../hooks/useUser'
import { TextRegular } from '../typography'
import {
  ContainerHeader,
  ContainerUser,
  ContentName,
  DataUserName,
  ImageLogo,
  Line,
} from './style'

interface HeaderProps {
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const Header = ({ setMenuIsVisible }: HeaderProps) => {
  const navigate = useNavigate()

  const { userDataLogin } = useUser()

  const handleGoOut = () => {
    localStorage.removeItem('cartorio:userData1.0')
    navigate('/login')
  }

  console.log(userDataLogin)

  return (
    <ContainerHeader>
      <ImageLogo src={Logo as unknown as string} alt="" />
      <ContainerUser>
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
        <List
          size={32}
          onClick={() => setMenuIsVisible(true)}
          className="mobile"
        />
      </ContainerUser>
    </ContainerHeader>
  )
}
